import { FilePdf, Gear, IdentificationCard, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { TextAreaX } from "src/components/Form/Textarea";
import { IconX } from "src/components/Icons/IconX";
import { ConfirmationModal } from "src/components/Modal/ConfirmationModal";
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
import { generatePdfReport } from "./generatePdfReport";

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
  const [isConfirming, setIsConfirming] = useState(false);

  const { mutate, isPending, context } = useUpdateProject(project?.id || "", onClose);
  const {
    formState: { errors },
    setValue,
    clearErrors,
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
    setValue("contributions", updatedContributions);
  };

  const handleContributionChange = (id: string, field: keyof IContributionDto, value: string) => {
    const updatedContributions = contributions.map((contrib) =>
      contrib.userId === id
        ? { ...contrib, [field]: field === "parcelas" ? value : formatCurrency(value) }
        : contrib,
    );

    if (!updatedContributions.some((contrib) => contrib.userId === id)) {
      updatedContributions.push({
        userId: id,
        valor: field === "valor" ? formatCurrency(value) : "",
        entrada: field === "entrada" ? formatCurrency(value) : "",
        parcelas: field === "parcelas" ? value : "",
        valorParcela: field === "valorParcela" ? formatCurrency(value) : "",
      });
    }
    clearErrors("contributions");
    const updatedContribution = updatedContributions.find((contrib) => contrib.userId === id);

    if (updatedContribution) {
      const entrada = parseCurrency(updatedContribution.entrada || "0");
      const parcelas = Number(updatedContribution.parcelas || "1");
      const valorParcela = parseCurrency(updatedContribution.valorParcela || "0");

      const valorTotal = entrada + parcelas * valorParcela;
      updatedContribution.valor = parseToFormatCurrency(valorTotal);
    }

    updatedContributions.forEach((contrib, index) => {
      setValue(`contributions.${index}.valor`, contrib.valor, { shouldValidate: true });
      setValue(`contributions.${index}.entrada`, contrib.entrada, { shouldValidate: true });
      setValue(`contributions.${index}.parcelas`, contrib.parcelas, { shouldValidate: true });
      setValue(`contributions.${index}.valorParcela`, contrib.valorParcela, {
        shouldValidate: true,
      });
    });

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

  const handleDelete = () => {
    setIsConfirming(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirming(false);
    mutateDel();
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex w-full flex-col justify-between md:flex-row">
        <h5>Atualizar Projeto</h5>
        <div className="flex gap-1">
          <SelectProject setStatus={handleProjectTypeSelect} disabled={!edit} status={status} />
          {[Role.Gestor, Role.Admin, null].includes(acesso) && (
            <div className="flex gap-1">
              <IconX
                name="Excluir"
                icon={
                  <Trash
                    className="cursor-pointer rounded-6 text-variation-error hover:bg-secundary hover:text-write-primary"
                    width={19.45}
                    height={20}
                    weight="regular"
                    onClick={handleDelete}
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
              {project && (
                <IconX
                  name="Relatório"
                  icon={
                    <FilePdf
                      className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
                      width={19.45}
                      height={20}
                      weight="fill"
                      onClick={() => generatePdfReport(project)}
                    />
                  }
                />
              )}
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
          <div className="cliente-data">
            {clientes.map((cliente: IUpdateProject, index) => {
              const contribution = contributions.find((contrib) => contrib.userId === cliente.id);
              const contributionErrors = errors.contributions && errors.contributions[index];
              return (
                <div key={cliente.id} className="flex flex-col">
                  <div className="flex items-center gap-2">
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
                  <div className="flex flex-col gap-1 md:flex-row">
                    <InputX
                      index={cliente.id}
                      title="Valor"
                      placeholder="apenas números"
                      value={contribution?.valor}
                      onChange={(e) =>
                        handleContributionChange(cliente.id, "valor", e.target.value)
                      }
                      error={contributionErrors?.valor?.message}
                      disabled
                      readOnly
                      required
                    />
                    <InputX
                      index={cliente.id}
                      title="Entrada"
                      placeholder="apenas números"
                      value={contribution?.entrada}
                      disabled={!edit}
                      onChange={(e) =>
                        handleContributionChange(cliente.id, "entrada", e.target.value)
                      }
                      error={contributionErrors?.entrada?.message}
                      required
                    />
                    <InputX
                      index={cliente.id}
                      title="Parcelas"
                      placeholder="apenas números"
                      value={contribution?.parcelas}
                      disabled={!edit}
                      onChange={(e) =>
                        handleContributionChange(cliente.id, "parcelas", e.target.value)
                      }
                      error={contributionErrors?.parcelas?.message}
                      required
                    />
                    <InputX
                      index={cliente.id}
                      title="Valor Parcela"
                      placeholder="apenas números"
                      value={contribution?.valorParcela}
                      disabled={!edit}
                      onChange={(e) =>
                        handleContributionChange(cliente.id, "valorParcela", e.target.value)
                      }
                      error={contributionErrors?.valorParcela?.message}
                      required
                    />
                  </div>
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
      {isConfirming && (
        <ConfirmationModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </Modal>
  );
};
