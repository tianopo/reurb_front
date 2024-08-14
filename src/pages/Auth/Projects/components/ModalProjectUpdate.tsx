import { Gear, IdentificationCard, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { TextAreaX } from "src/components/Form/Textarea";
import { IconX } from "src/components/Icons/IconX";
import { Modal } from "src/components/Modal/Modal";
import {
  IClientDto,
  IContributionDto,
  IEmployeeDto,
  IProjectDto,
  IProjectUpdateDto,
  IUpdateProject,
  StatusProjectType,
} from "src/interfaces/models";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import {
  formatCurrency,
  formatDate,
  formatDateToISO,
  formatISOToDateAndTime,
  parseCurrency,
  parseToFormatCurrency,
} from "src/utils/formats";
import "../Projects.css";
import { useDelProject } from "../hooks/useDelProject";
import { useGetClientsAndEmployees } from "../hooks/useGetClientsAndEmployees";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { SelectProject } from "./SelectProject";

interface IModalProjectUpdate {
  onClose: () => void;
  project?: IProjectUpdateDto;
}

export const ModalProjectUpdate = ({ onClose, project }: IModalProjectUpdate) => {
  const dataToIso = formatISOToDateAndTime(project?.dataInicio || "");
  const [date, setDate] = useState(dataToIso.date);
  const [funcionarios, setFuncionarios] = useState<IUpdateProject[]>(project?.funcionarios || []);
  const [funcionarioInput, setFuncionarioInput] = useState("");
  const [clientes, setClientes] = useState<IUpdateProject[]>(project?.clientes || []);
  const [clienteInput, setClienteInput] = useState("");
  const [totalValue, setTotalValue] = useState(project?.valorTotal || "");
  const [contributions, setContributions] = useState<IContributionDto[]>(
    project?.contributions || [],
  );
  const [valorAcumulado, setValorAcumulado] = useState(project?.valorAcumulado || "");
  const [status, setStatus] = useState<StatusProjectType>(project?.status || "Aberto");
  const [edit, setEdit] = useState(false);
  const { acesso } = useAccessControl();

  const { mutate, isPending, context } = useUpdateProject(project?.id || "", onClose);
  const {
    formState: { errors },
    setValue,
  } = context;

  const { mutate: mutateDel } = useDelProject(project?.id || "", onClose);
  useEffect(() => {
    if (project) {
      setValue("nome", project.nome || "");
      setValue("descricao", project.descricao || "");
      setValue("dataInicio", date);
      setValue("valorTotal", totalValue);
      setValue("valorAcumulado", valorAcumulado);
      setValue("status", status);
      setValue("funcionarios", funcionarios || []);
      setValue("clientes", clientes || []);
      setValue("contributions", contributions || []);
    }
  }, [project, setValue]);

  useEffect(() => {
    return setValue("status", status);
  }, [setStatus]);

  const handleDataFormat = (e: { target: { value: string } }) => {
    const formattedData = formatDate(e.target.value);
    setDate(formattedData);
    setValue("dataInicio", formattedData);
  };

  const handleTotalValueFormat = (e: { target: { value: string } }) => {
    const formattedTotalValue = formatCurrency(e.target.value);
    setTotalValue(formattedTotalValue);
    setValue("valorTotal", formattedTotalValue);
  };

  const handleFuncionarioAdd = () => {
    const selectedEmployee = data.find(
      (employee: IEmployeeDto) => employee.nome === funcionarioInput.trim(),
    );
    if (selectedEmployee && !funcionarios.some((f) => f.id === selectedEmployee.id)) {
      const updatedFuncionarios = [...funcionarios, selectedEmployee];
      setFuncionarios(updatedFuncionarios);
      setValue("funcionarios", updatedFuncionarios);
      setFuncionarioInput("");
    }
  };

  const handleFuncionarioRemove = (id: string) => {
    const updatedFuncionarios = funcionarios.filter((f) => f.id !== id);
    setFuncionarios(updatedFuncionarios);
    setValue("funcionarios", updatedFuncionarios);
  };

  const handleClienteAdd = () => {
    const selectedClient = data.find((client: IClientDto) => client.nome === clienteInput.trim());
    if (selectedClient && !clientes.some((f) => f.id === selectedClient.id)) {
      const updatedClientes = [...clientes, selectedClient];
      setClientes(updatedClientes);
      setValue("clientes", updatedClientes);
      setClienteInput("");
    }
  };

  const handleClienteRemove = (id: string) => {
    const updatedClientes = clientes.filter((f) => f.id !== id);
    const updatedContributions = contributions.filter((contrib) => contrib.userId !== id);

    setClientes(updatedClientes);
    setValue("clientes", updatedClientes);
    setContributions(updatedContributions);
  };

  const handleContributionChange = (id: string, valor: string) => {
    const updatedContributions = contributions.map((contrib) =>
      contrib.userId === id ? { ...contrib, valor: formatCurrency(valor) } : contrib,
    );

    if (!updatedContributions.some((contrib) => contrib.userId === id)) {
      updatedContributions.push({ userId: id, valor: formatCurrency(valor) });
    }

    setContributions(updatedContributions);
    setValue("contributions", updatedContributions);
  };

  const calculateTotalContributions = () => {
    const total = contributions.reduce((acc, contrib) => {
      return acc + parseCurrency(contrib?.valor || "");
    }, 0);

    const formatTotal: string = parseToFormatCurrency(total);

    setValorAcumulado(formatTotal);
    setValue("valorAcumulado", formatTotal);
  };

  useEffect(() => {
    calculateTotalContributions();
  }, [contributions]);

  const onSubmit = (data: IProjectDto) => {
    const formattedDataIso = formatDateToISO(data.dataInicio);
    mutate({
      ...data,
      dataInicio: formattedDataIso,
      funcionarios: funcionarios,
      clientes: clientes,
      contributions: contributions,
    });
  };
  const { data, isLoading, error } = useGetClientsAndEmployees();

  const employeeNames =
    data
      ?.filter((employee: IEmployeeDto) => employee.acesso === Role.Funcionario)
      .map((employee: IEmployeeDto) => employee.nome) || [];

  const clientNames =
    data
      ?.filter((client: IClientDto) => client.acesso === Role.Cliente)
      .map((client: IClientDto) => client.nome) || [];

  const handleProjectTypeSelect = (option: StatusProjectType) => {
    setStatus(option);
    setValue("status", option);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex w-full flex-col justify-between md:flex-row">
        <h5>Atualizar Projeto</h5>
        <div className="flex gap-1">
          <SelectProject setStatus={handleProjectTypeSelect} disabled={!edit} status={status} />
          {acesso !== Role.Cliente && (
            <div className="flex gap-1">
              <IconX
                name="Excluir"
                icon={
                  <Trash
                    className="cursor-pointer rounded-6 text-variation-error hover:bg-secundary hover:text-write-primary"
                    width={19.45}
                    height={20}
                    weight="regular"
                    onClick={() => mutateDel()}
                  />
                }
              />
              <IconX
                name="Editar"
                icon={
                  <Gear
                    className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
                    width={19.45}
                    height={20}
                    weight="fill"
                    onClick={() => setEdit(!edit)}
                  />
                }
              />
            </div>
          )}
        </div>
      </div>
      <FormProvider {...context}>
        <FormX onSubmit={onSubmit} className="flex flex-col gap-1">
          <InputX title="Nome" placeholder="Ciclano Silva" disabled={!edit} required />
          <TextAreaX
            title="Descrição"
            placeholder="Digite a descrição do projeto"
            disabled={!edit}
            required
          />
          <div className="div-inputs">
            <InputX
              title="Data Inicio"
              placeholder="DD/MM/YYYY (apenas números)"
              onChange={handleDataFormat}
              value={date}
              disabled={!edit}
              required
            />
            <InputX
              title="Valor Total"
              placeholder="Baixa"
              onChange={handleTotalValueFormat}
              value={totalValue}
              disabled={!edit}
              required
            />
          </div>
          <div className="div-inputs items-end">
            <InputX
              title="Cliente"
              placeholder="Digite o nome do funcionário"
              value={clienteInput}
              onChange={(e) => setClienteInput(e.target.value)}
              disabled={!edit}
              busca
              options={clientNames.filter(
                (option: string) => !clientes.some((f) => f.nome === option),
              )}
            />
            {![Role.Cliente, Role.Funcionario, null].includes(acesso) && (
              <Button type="button" onClick={handleClienteAdd} disabled={isPending || !edit}>
                Adicionar Cliente
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-write-secundary">
            {clientes.map((cliente) => {
              const contribution = contributions.find((contrib) => contrib.userId === cliente.id);
              console.log(cliente, "here", funcionarios);
              return (
                <div key={cliente.id} className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <IdentificationCard />
                    <p>{cliente.nome}</p>
                    <button
                      type="button"
                      onClick={() => handleClienteRemove(cliente.id)}
                      disabled={isPending || !edit}
                    >
                      ✖
                    </button>
                  </div>
                  <InputX
                    index={cliente.id}
                    title="Valor"
                    placeholder="apenas números"
                    value={contribution?.valor}
                    disabled={!edit}
                    onChange={(e) => handleContributionChange(cliente.id, e.target.value)}
                    required
                  />
                </div>
              );
            })}
          </div>
          <div className="div-inputs">
            <InputX
              title="Valor Acumulado"
              placeholder="R$ X.XXX,XX, apenas números"
              value={valorAcumulado}
              disabled
              readOnly
              required
            />
          </div>
          <div className="div-inputs items-end">
            <InputX
              title="Funcionário"
              placeholder="Digite o nome do funcionário"
              value={funcionarioInput}
              onChange={(e) => setFuncionarioInput(e.target.value)}
              disabled={!edit}
              busca
              options={employeeNames.filter(
                (option: string) => !funcionarios.some((f) => f.nome === option),
              )}
            />
            {![Role.Cliente, Role.Funcionario, null].includes(acesso) && (
              <Button
                type="button"
                onClick={handleFuncionarioAdd}
                disabled={isPending || Object.keys(errors).length > 0 || !edit}
              >
                Adicionar Funcionário
              </Button>
            )}
          </div>
          {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
          {error && (
            <>
              <h6 className="text-center text-write-primary">
                Ocorreu um erro ao carregar os dados.
              </h6>
              <p className="text-center text-red-500">{error.message}</p>
            </>
          )}
          <div className="flex flex-wrap gap-2 text-write-secundary">
            {funcionarios.map((funcionario) => (
              <div key={funcionario.id} className="flex items-center gap-1">
                <IdentificationCard />
                <p>{funcionario.nome}</p>
                <button
                  type="button"
                  disabled={!edit}
                  onClick={() => handleFuncionarioRemove(funcionario.id)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
          <Button disabled={isPending || Object.keys(errors).length > 0 || !edit}>
            Atualizar Projeto
          </Button>
        </FormX>
      </FormProvider>
    </Modal>
  );
};
