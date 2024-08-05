import { IdentificationCard } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { TextAreaX } from "src/components/Form/Textarea";
import { Modal } from "src/components/Modal/Modal";
import { IEmployeeDto, ITaskDto } from "src/interfaces/models";
import { formatDateHour, formatDateToISO, formatISOToDateAndTime } from "src/utils/formats";
import { useGetEmployees } from "../hooks/useGetEmployees";
import { useUpdateTask } from "../hooks/useUpdateTask";
import "../Schedule.css";

interface IModalTaskUpdate {
  onClose: () => void;
  task?: ITaskDto | null;
}

export const ModalTaskUpdate = ({ onClose, task }: IModalTaskUpdate) => {
  const dataToIso = formatISOToDateAndTime(task?.data || "");
  const dateTime = dataToIso.date + " " + dataToIso.time;
  const [date, setDate] = useState(dateTime);
  const [funcionarios, setFuncionarios] = useState<string[]>([]);
  const [funcionarioInput, setFuncionarioInput] = useState("");

  const { mutate, isPending, context } = useUpdateTask(task?.id || "", onClose);
  const {
    formState: { errors },
    setValue,
    watch,
  } = context;
  watch("data");
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

  const onSubmit = (data: ITaskDto) => {
    const formattedDataIso = formatDateToISO(date);
    mutate({
      ...data,
      data: formattedDataIso,
      funcionarios: funcionarios,
    });
  };

  const { data, isLoading, error } = useGetEmployees();

  const employeeNames = data?.map((employee: IEmployeeDto) => employee.nome) || [];

  useEffect(() => {
    if (data) {
      setValue("descricao", data.descricao || "");
      setValue("data", data.data || "");
      setValue("prioridade", data.prioridade || "");
      setValue("projeto", data.projeto || "");
      setValue("status", data.status || "");
      setValue("funcionarios", data.funcionarios || "");
    }
  }, [data, setValue]);

  return (
    <Modal onClose={onClose}>
      <div className="flex">
        <h5>Atualizar Tarefa</h5>
      </div>
      <FormProvider {...context}>
        <FormX onSubmit={onSubmit}>
          <TextAreaX
            title="Descrição"
            placeholder="Digite a descrição da tarefa"
            value={task?.descricao}
            required
          />
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
              value={task?.prioridade}
              required
            />
          </div>
          <div className="div-inputs">
            <InputX title="Projeto" placeholder="ainda à fazer" value={task?.projeto} />
            <Select
              title="Status"
              placeholder="Feitos"
              value={task?.status}
              options={["à Fazer", "Atrasados", "Feitos"]}
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
          <Button disabled={isPending || Object.keys(errors).length > 0}>Adicionar Tarefa</Button>
        </FormX>
      </FormProvider>
    </Modal>
  );
};
