import { Gear, IdentificationCard, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { TextAreaX } from "src/components/Form/Textarea";
import { IconX } from "src/components/Icons/IconX";
import { Modal } from "src/components/Modal/Modal";
import { IEmployeeDto, IProjectUpdateDto, ITaskDto, ITaskUpdateDto } from "src/interfaces/models";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import { formatDateHour, formatDateHourToISO, formatISOToDateAndTime } from "src/utils/formats";
import { useListProject } from "../../Projects/hooks/useListProject";
import { useDelTask } from "../hooks/useDelTask";
import { useGetEmployees } from "../hooks/useGetEmployees";
import { useUpdateTask } from "../hooks/useUpdateTask";
import "../Schedule.css";
import { ConfirmationModal } from "src/components/Modal/ConfirmationModal";

interface IModalTaskUpdate {
  onClose: () => void;
  task?: ITaskUpdateDto | null;
}

export const ModalTaskUpdate = ({ onClose, task }: IModalTaskUpdate) => {
  const dataToIso = formatISOToDateAndTime(task?.data || "");
  const dateTime = dataToIso.date + " " + dataToIso.time;
  const [date, setDate] = useState(dateTime);
  const [funcionarios, setFuncionarios] = useState<
    {
      id: string;
      nome: string;
      email: string;
    }[]
  >(task?.funcionarios || []);
  const [funcionarioInput, setFuncionarioInput] = useState("");
  const [edit, setEdit] = useState(false);
  const { mutate, isPending, context } = useUpdateTask(task?.id || "", onClose);
  const {
    formState: { errors },
    setValue,
  } = context;
  const { acesso } = useAccessControl();
  const [projeto, setProjeto] = useState<ITaskUpdateDto["projeto"]>(task?.projeto || undefined);
  const [projetoInput, setProjetoInput] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDataFormat = (e: { target: { value: string } }) => {
    const formattedData = formatDateHour(e.target.value);
    setDate(formattedData);
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

  const handleProjetoAdd = () => {
    const selectedProjeto = projetos.find(
      (projetoBack: IProjectUpdateDto) =>
        projetoBack.nome === projetoInput.trim() && projetoBack.id !== projeto,
    );

    if (selectedProjeto) {
      setProjeto(selectedProjeto);
      setProjetoInput("");
    }
  };

  const handleProjetoRemove = () => {
    setProjeto(undefined);
    setValue("projeto", undefined);
  };

  const onSubmit = (data: ITaskDto) => {
    const formattedDataIso = formatDateHourToISO(date);
    setValue("projeto", projeto);
    mutate({
      ...data,
      data: formattedDataIso,
      funcionarios: funcionarios,
    });
  };
  const { data, isLoading, error } = useGetEmployees();
  const employeeNames = data?.map((employee: IEmployeeDto) => employee.nome) || [];

  const { data: projetos, isLoading: isLoadingProjetos, error: errorProjetos } = useListProject();
  useEffect(() => {
    if (task) {
      setValue("descricao", task.descricao || "");
      setValue("data", dateTime);
      setValue("prioridade", task.prioridade || "");
      setValue("status", task.status || "");
      setValue("funcionarios", funcionarios || []);
    }
  }, [task, setValue]);
  const { mutate: mutateDel } = useDelTask(task?.id || "", onClose);

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
      <div className="flex justify-between">
        <h5>Atualizar Tarefa</h5>
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
          </div>
        )}
      </div>
      <FormProvider {...context}>
        <FormX onSubmit={onSubmit} className="flex flex-col gap-1">
          <TextAreaX
            title="Descrição"
            placeholder="Digite a descrição da tarefa"
            disabled={!edit}
            required
          />
          <div className="div-inputs">
            <InputX
              title="Data"
              placeholder="DD/MM/YYYY HH:MM (apenas números)"
              onChange={handleDataFormat}
              value={date}
              disabled={!edit}
              required
            />
            <Select
              title="Prioridade"
              options={["Baixa", "Media", "Alta"]}
              placeholder="Baixa"
              value={task?.prioridade}
              disabled={!edit}
              required
            />
          </div>
          <Select
            title="Status"
            placeholder="Feitos"
            value={task?.status}
            options={["à Fazer", "Atrasados", "Feitos"]}
            disabled={!edit}
            required
          />
          <div className="div-inputs items-end">
            <InputX
              title="Projeto"
              placeholder="Digite o nome do funcionário"
              value={projetoInput}
              disabled={!edit}
              onChange={(e) => setProjetoInput(e.target.value)}
              busca
              options={projetos
                ?.filter(
                  (projetoBack: IProjectUpdateDto) =>
                    projetoBack.nome.toLowerCase().includes(projetoInput.toLowerCase()) &&
                    projetoBack.id !== projeto?.id,
                )
                .map((projeto: IProjectUpdateDto) => projeto.nome)}
            />
            <Button type="button" disabled={isLoadingProjetos || !edit} onClick={handleProjetoAdd}>
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
              <div key={projeto.id} className="flex items-center gap-1">
                <IdentificationCard />
                <p>{projeto.nome}</p>
                <button
                  type="button"
                  disabled={isLoadingProjetos || !edit}
                  onClick={handleProjetoRemove}
                >
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
                <button type="button" onClick={() => handleFuncionarioRemove(funcionario.id)}>
                  ✖
                </button>
              </div>
            ))}
          </div>
          <Button disabled={isPending || Object.keys(errors).length > 0 || !edit}>
            Atualizar Tarefa
          </Button>
        </FormX>
      </FormProvider>
      {isConfirming && (
        <ConfirmationModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </Modal>
  );
};
