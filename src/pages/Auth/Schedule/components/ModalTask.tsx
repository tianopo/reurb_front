import { IdentificationCard } from "@phosphor-icons/react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { TextAreaX } from "src/components/Form/Textarea";
import { Modal } from "src/components/Modal/Modal";
import { formatDateHour } from "src/utils/formats";
import { ITaskDto, useCreateTask } from "../hooks/useCreateTask";
import { useGetEmployees } from "../hooks/useGetEmployees";

interface IModalTaskCreate {
  onClose: () => void;
}

export const ModalTaskCreate = ({ onClose }: IModalTaskCreate) => {
  const [date, setDate] = useState("");
  const [funcionarios, setFuncionarios] = useState<string[]>([]);
  const [funcionarioInput, setFuncionarioInput] = useState("");

  const { mutate, isPending, context } = useCreateTask();
  const {
    formState: { errors },
    setValue,
    watch,
  } = context;

  const handleDataFormat = (e: { target: { value: string } }) => {
    const formattedData = formatDateHour(e.target.value);
    setValue("data", formattedData);
    setDate(formattedData);
  };

  const handleFuncionarioAdd = () => {
    if (funcionarioInput.trim() && !funcionarios.includes(funcionarioInput.trim())) {
      setFuncionarios([...funcionarios, funcionarioInput]);
      setValue("funcionarios", funcionarios);
      console.log(watch("funcionarios"));
      setFuncionarioInput("");
    }
  };

  const handleFuncionarioRemove = (funcionario: string) => {
    setFuncionarios(funcionarios.filter((f) => f !== funcionario));
  };

  const onSubmit = (data: ITaskDto) => {
    mutate({
      ...data,
      funcionarios,
    });
  };
  const { data, isLoading, error } = useGetEmployees();

  return (
    <Modal onClose={onClose}>
      <div className="flex">
        <h5>Adicionar Tarefa</h5>
      </div>
      <FormProvider {...context}>
        <FormX onSubmit={onSubmit}>
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
          <div className="div-inputs">
            <InputX title="Projeto" placeholder="ainda à fazer" />
            <Select
              title="Status"
              placeholder="Feitos"
              options={["à Fazer", "Atrasados", "Feitos"]}
              required
            />
          </div>
          <div className="div-inputs items-end py-1">
            <InputX
              title="Funcionário"
              placeholder="Digite o nome do funcionário"
              value={funcionarioInput}
              onChange={(e) => setFuncionarioInput(e.target.value)}
              busca
              options={["oi", "aqui", "aq", "odfd dfdf df  df"].filter(
                (option) => !funcionarios.includes(option),
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
            {funcionarios.map((funcionario) => (
              <div key={funcionario} className="flex items-center gap-1">
                <IdentificationCard />
                <p>{funcionario}</p>
                <button type="button" onClick={() => handleFuncionarioRemove(funcionario)}>
                  ✖
                </button>
              </div>
            ))}
          </div>
          <Button disabled={isPending || Object.keys(errors).length > 0}>Adicionar Tarefa</Button>
        </FormX>
      </FormProvider>
    </Modal>
  );
};
