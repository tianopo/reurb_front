import { IdentificationCard } from "@phosphor-icons/react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { TextAreaX } from "src/components/Form/Textarea";
import { Modal } from "src/components/Modal/Modal";
import { IEmployeeDto, IProjectDto, ITaskDto } from "src/interfaces/models";
import { formatDateHour, formatDateHourToISO } from "src/utils/formats";
import { useListProject } from "../../Projects/hooks/useListProject";
import { useCreateTask } from "../hooks/useCreateTask";
import { useGetEmployees } from "../hooks/useGetEmployees";
import "../Schedule.css";

interface IModalTaskCreate {
  onClose: () => void;
}

export const ModalTaskCreate = ({ onClose }: IModalTaskCreate) => {
  const [date, setDate] = useState("");
  const [funcionarios, setFuncionarios] = useState<string[]>([]);
  const [funcionarioInput, setFuncionarioInput] = useState("");
  const [projeto, setProjeto] = useState<string>("");
  const [projetoInput, setProjetoInput] = useState("");
  const [projetoNome, setProjetoNome] = useState("");

  const { mutate, isPending, context } = useCreateTask(onClose);
  const {
    formState: { errors },
    setValue,
  } = context;

  const handleDataFormat = (e: { target: { value: string } }) => {
    const formattedData = formatDateHour(e.target.value);
    setDate(formattedData);
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

  const handleProjetoAdd = () => {
    const selectedProjeto = projetos.find(
      (projetoBack: IProjectDto) =>
        projetoBack.nome === projetoInput.trim() && projetoBack.id !== projeto,
    );

    if (selectedProjeto) {
      setProjeto(selectedProjeto.id);
      setProjetoNome(selectedProjeto.nome);
      setProjetoInput("");
    }
  };

  const handleProjetoRemove = () => {
    setProjeto("");
    setProjetoNome("");
    setValue("projetoId", "");
  };

  const onSubmit = (data: ITaskDto) => {
    const formattedDataIso = formatDateHourToISO(date);
    setValue("projetoId", projeto);

    mutate({
      ...data,
      data: formattedDataIso,
      funcionarios: funcionarios,
    });
  };

  const { data, isLoading, error } = useGetEmployees();
  const employeeNames = data?.map((employee: IEmployeeDto) => employee.nome) || [];

  const { data: projetos, isLoading: isLoadingProjetos, error: errorProjetos } = useListProject();

  return (
    <Modal onClose={onClose}>
      <div className="flex">
        <h5>Adicionar Tarefa</h5>
      </div>
      <FormProvider {...context}>
        <FormX onSubmit={onSubmit} className="flex flex-col gap-1">
          <TextAreaX title="Descrição" placeholder="Digite a descrição da tarefa" required />
          <div className="div-inputs">
            <InputX
              title="Data"
              placeholder="DD/MM/YYYY HH:MM (apenas números)"
              onChange={handleDataFormat}
              value={date}
              required
            />
            <Select
              title="Prioridade"
              options={["Baixa", "Media", "Alta"]}
              placeholder="Baixa"
              required
            />
          </div>
          <Select
            title="Status"
            placeholder="Feitos"
            options={["à Fazer", "Atrasados", "Feitos"]}
            required
          />
          <div className="div-inputs items-end">
            <InputX
              title="Projeto"
              placeholder="Digite o nome do funcionário"
              value={projetoInput}
              onChange={(e) => setProjetoInput(e.target.value)}
              busca
              options={projetos
                ?.filter(
                  (projetoBack: IProjectDto) =>
                    projetoBack.nome.toLowerCase().includes(projetoInput.toLowerCase()) &&
                    projetoBack.id !== projeto,
                )
                .map((projeto: IProjectDto) => projeto.nome)}
            />
            <Button type="button" disabled={isLoadingProjetos} onClick={handleProjetoAdd}>
              Adicionar Projeto
            </Button>
          </div>
          {isLoadingProjetos && <h6 className="text-center text-write-primary">Carregando...</h6>}
          {errorProjetos && (
            <>
              <h6 className="text-center text-write-primary">
                Ocorreu um erro ao carregar os dados.
              </h6>
              <p className="text-center text-red-500">{errorProjetos?.message}</p>
            </>
          )}
          <div className="flex flex-wrap gap-2 text-write-secundary">
            {projeto && (
              <div key={projeto} className="flex items-center gap-1">
                <IdentificationCard />
                <p>{projetoNome}</p>
                <button type="button" onClick={handleProjetoRemove}>
                  ✖
                </button>
              </div>
            )}
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
          <Button disabled={isPending || Object.keys(errors).length > 0}>Adicionar Tarefa</Button>
        </FormX>
      </FormProvider>
    </Modal>
  );
};
