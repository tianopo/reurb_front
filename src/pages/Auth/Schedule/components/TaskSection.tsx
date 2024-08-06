import { Dispatch, SetStateAction } from "react";
import { ITaskUpdateDto } from "src/interfaces/models";
import { formatISOToDateAndTime } from "src/utils/formats";

interface ITaskSection {
  title: string;
  tasks: any[];
  setTask: Dispatch<SetStateAction<ITaskUpdateDto | null>>;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
}

const getColorByPriority = (priority: "Alta" | "Media" | "Baixa") => {
  switch (priority) {
    case "Alta":
      return "bg-variation-error";
    case "Media":
      return "bg-variation-warning";
    case "Baixa":
      return "bg-variation-confirmation";
    default:
      return "gray";
  }
};

export const TaskSection = ({ title, tasks, setTask, setOpenEditModal }: ITaskSection) => (
  <div className="flex w-full flex-wrap items-center gap-2">
    <h4 className="flex h-12 w-32 items-center text-start">{title}</h4>
    {tasks.map((task, index) => {
      const { time } = formatISOToDateAndTime(task.data);
      const bgColor = getColorByPriority(task.prioridade);
      return (
        <div
          key={index}
          className={`flex h-12 w-fit cursor-pointer items-center gap-0.5 rounded-6 px-2.5 md:w-56 md:justify-between ${bgColor}`}
          onClick={() => {
            setTask(task);
            setOpenEditModal(true);
          }}
        >
          <h6 className="truncate text-white">{task.descricao}</h6>
          <h6 className="w-fit text-white">{time}</h6>
        </div>
      );
    })}
  </div>
);
