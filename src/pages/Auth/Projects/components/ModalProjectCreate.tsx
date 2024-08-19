import { IdentificationCard } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { TextAreaX } from "src/components/Form/Textarea";
import { Modal } from "src/components/Modal/Modal";
import {
  IClientDto,
  IContributionDto,
  IEmployeeDto,
  IProjectDto,
  StatusProjectType,
} from "src/interfaces/models";
import { Role } from "src/routes/context/AccessControl";
import {
  formatCurrency,
  formatDate,
  formatDateToISO,
  parseCurrency,
  parseToFormatCurrency,
} from "src/utils/formats";
import "../Projects.css";
import { useCreateProject } from "../hooks/useCreateProject";
import { useGetClientsAndEmployees } from "../hooks/useGetClientsAndEmployees";
import { SelectProject } from "./SelectProject";

interface IModalProjectCreate {
  onClose: () => void;
}

export const ModalProjectCreate = ({ onClose }: IModalProjectCreate) => {
  const [date, setDate] = useState("");
  const [funcionarios, setFuncionarios] = useState<string[]>([]);
  const [funcionarioInput, setFuncionarioInput] = useState("");
  const [clientes, setClientes] = useState<string[]>([]);
  const [clienteInput, setClienteInput] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [contributions, setContributions] = useState<IContributionDto[]>([]);
  const [valorAcumulado, setValorAcumulado] = useState("");
  const [status, setStatus] = useState<StatusProjectType>("Aberto");

  const { mutate, isPending, context } = useCreateProject(onClose);
  const {
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = context;

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
    if (selectedEmployee && !funcionarios.includes(selectedEmployee.id)) {
      const updatedFuncionarios = [...funcionarios, selectedEmployee.id];
      setFuncionarios(updatedFuncionarios);
      setValue("funcionarios", updatedFuncionarios);
      setFuncionarioInput("");
    }
  };

  const handleFuncionarioRemove = (id: string) => {
    const updatedFuncionarios = funcionarios.filter((f) => f !== id);
    setFuncionarios(updatedFuncionarios);
    setValue("funcionarios", updatedFuncionarios);
  };

  const handleClienteAdd = () => {
    const selectedClient = data.find((client: IClientDto) => client.nome === clienteInput.trim());
    if (selectedClient && !clientes.includes(selectedClient.id)) {
      const updatedClientes = [...clientes, selectedClient.id];
      setClientes(updatedClientes);
      setValue("clientes", updatedClientes);
      setClienteInput("");
    }
  };

  const handleClienteRemove = (id: string) => {
    const updatedClientes = clientes.filter((f) => f !== id);
    const updatedContributions = contributions.filter((contrib) => contrib.userId !== id);

    setClientes(updatedClientes);
    setValue("clientes", updatedClientes);
    setContributions(updatedContributions);
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
      contributions,
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
        <h5>Adicionar Projeto</h5>
        <SelectProject setStatus={handleProjectTypeSelect} status={status} />
      </div>
      <FormProvider {...context}>
        <FormX onSubmit={onSubmit} className="flex flex-col gap-1">
          <InputX title="Nome" placeholder="Ciclano Silva" required />
          <TextAreaX title="Descrição" placeholder="Digite a descrição do projeto" required />
          <div className="div-inputs">
            <InputX
              title="Data Inicio"
              placeholder="DD/MM/YYYY (apenas números)"
              onChange={handleDataFormat}
              value={date}
              required
            />
            <InputX
              title="Valor Total"
              placeholder="Baixa"
              onChange={handleTotalValueFormat}
              value={totalValue}
              required
            />
          </div>
          <div className="div-inputs items-end">
            <InputX
              title="Cliente"
              placeholder="Digite o nome do cliente"
              value={clienteInput}
              onChange={(e) => setClienteInput(e.target.value)}
              busca
              options={clientNames.filter(
                (option: string) =>
                  !clientes.some(
                    (id) => data.find((client: IClientDto) => client.nome === option)?.id === id,
                  ),
              )}
            />
            <Button type="button" onClick={handleClienteAdd}>
              Adicionar Cliente
            </Button>
          </div>
          <div className="cliente-data">
            {clientes.map((id, index) => {
              const cliente = data.find((emp: any) => emp.id === id);
              const contributionErrors = errors.contributions && errors.contributions[index];
              return cliente ? (
                <div key={cliente.id} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <IdentificationCard />
                    <p>{cliente.nome}</p>
                    <button type="button" onClick={() => handleClienteRemove(cliente.id)}>
                      ✖
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 md:flex-row">
                    <InputX
                      index={cliente.id}
                      title="Valor"
                      placeholder="apenas números"
                      value={contributions.find((contrib) => contrib.userId === id)?.valor || ""}
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
                      value={contributions.find((contrib) => contrib.userId === id)?.entrada || ""}
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
                      value={contributions.find((contrib) => contrib.userId === id)?.parcelas || ""}
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
                      value={
                        contributions.find((contrib) => contrib.userId === id)?.valorParcela || ""
                      }
                      onChange={(e) =>
                        handleContributionChange(cliente.id, "valorParcela", e.target.value)
                      }
                      error={contributionErrors?.valorParcela?.message}
                      required
                    />
                  </div>
                </div>
              ) : null;
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
              busca
              options={employeeNames.filter(
                (option: string) =>
                  !funcionarios.some(
                    (id) =>
                      data.find((employee: IEmployeeDto) => employee.nome === option)?.id === id,
                  ),
              )}
            />
            <Button type="button" onClick={handleFuncionarioAdd}>
              Adicionar Funcionário
            </Button>
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
            {funcionarios.map((id) => {
              const funcionario = data.find((emp: any) => emp.id === id);
              return funcionario ? (
                <div key={funcionario.id} className="flex items-center gap-1">
                  <IdentificationCard />
                  <p>{funcionario.nome}</p>
                  <button type="button" onClick={() => handleFuncionarioRemove(funcionario.id)}>
                    ✖
                  </button>
                </div>
              ) : null;
            })}
          </div>
          <Button disabled={isPending || Object.keys(errors).length > 0}>Adicionar Projeto</Button>
        </FormX>
      </FormProvider>
    </Modal>
  );
};
