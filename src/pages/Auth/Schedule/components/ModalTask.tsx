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

interface IModalTaskCreate {
  onClose: () => void;
}

export const ModalTaskCreate = ({ onClose }: IModalTaskCreate) => {
  const [data, setData] = useState("");
  const { mutate, isPending, context } = useCreateTask();
  const {
    formState: { errors },
    setValue,
  } = context;

  const handleDataFormat = (e: { target: { value: string } }) => {
    const formattedData = formatDateHour(e.target.value);
    setValue("data", formattedData);
    setData(formattedData);
  };

  const onSubmit = (data: ITaskDto) => {
    mutate(data);
  };

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
              value={data}
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
          <div className="div-inputs py-1">
            <InputX title="Funcionários" placeholder="Funcionários envolvidos" busca />
          </div>
          <Button disabled={isPending || Object.keys(errors).length > 0}>adicionar tarefa</Button>
        </FormX>
      </FormProvider>
    </Modal>
  );
};
