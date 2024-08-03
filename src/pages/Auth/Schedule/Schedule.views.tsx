import { useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { CardContainer } from "src/components/Layout/CardContainer";
import { ITaskDto } from "src/interfaces/models";
import { ModalTaskCreate } from "./components/ModalTask";
import { TaskSection } from "./components/TaskSection";
import { useListTask } from "./hooks/useListTask";

export const Schedule = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data: tasks, error, isLoading } = useListTask();

  const tarefasAFazer = tasks?.filter((task: ITaskDto) => task.status === "à Fazer") || [];
  const tarefasAtrasados = tasks?.filter((task: ITaskDto) => task.status === "Atrasados") || [];
  const tarefasFeitos = tasks?.filter((task: ITaskDto) => task.status === "Feitos") || [];

  const taskSections = [
    { title: "a Fazer", tasks: tarefasAFazer },
    { title: "Atrasados", tasks: tarefasAtrasados },
    { title: "Feitos", tasks: tarefasFeitos },
  ];

  const getDayOfWeek = (date: string) => {
    const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
  };

  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    start.setDate(start.getDate() + diff);
    return start;
  };

  const getEndOfWeek = (date: Date) => {
    const end = new Date(date);
    const day = end.getDay();
    const diff = day === 0 ? 0 : 7 - day;
    end.setDate(end.getDate() + diff);
    return end;
  };

  const today = new Date();
  const startOfWeek = getStartOfWeek(today);
  const endOfWeek = getEndOfWeek(today);

  const tasksByDay = (tasks || []).reduce((acc: any, task: any) => {
    const taskDate = new Date(task.data);
    if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
      const day = getDayOfWeek(task.data);
      if (!acc[day]) acc[day] = [];
      acc[day].push(task);
    }
    return acc;
  }, {});

  const daysOfWeek = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  return (
    <>
      <CardContainer>
        <h5 className="subtitulo">Tarefas de hoje</h5>
        {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
        {error && (
          <>
            <h6 className="text-center text-write-primary">
              Ocorreu um erro ao carregar os dados.
            </h6>
            <p className="text-center text-red-500">{error.message}</p>
          </>
        )}
        {taskSections.map((section, index) => (
          <TaskSection key={index} title={section.title} tasks={section.tasks} />
        ))}
        <Button onClick={() => setOpenModal(!openModal)}>Adicionar tarefa</Button>
        {openModal && <ModalTaskCreate onClose={() => setOpenModal(false)} />}
      </CardContainer>

      <CardContainer>
        <h5 className="subtitulo">Agenda</h5>
        {daysOfWeek.map((day) => (
          <TaskSection key={day} title={day} tasks={tasksByDay[day] || []} />
        ))}
      </CardContainer>
    </>
  );
};
