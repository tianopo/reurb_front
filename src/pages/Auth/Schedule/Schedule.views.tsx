import { useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { CardContainer } from "src/components/Layout/CardContainer";
import { ITaskDto } from "src/interfaces/models";
import { Calendar } from "./components/Calendar";
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

  const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(new Date()));
  const [endOfWeek, setEndOfWeek] = useState(getEndOfWeek(new Date()));

  const handleDateClick = (date: Date) => {
    setStartOfWeek(getStartOfWeek(date));
    setEndOfWeek(getEndOfWeek(date));
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  const formattedStartOfWeek = formatDate(startOfWeek);
  const formattedEndOfWeek = formatDate(endOfWeek);

  const tasksByDay = (tasks || []).reduce((acc: any, task: ITaskDto) => {
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
          <h6 className="text-center text-write-primary">
            Ocorreu um erro ao carregar os dados. {error.message}
          </h6>
        )}
        {taskSections.map((section, index) => (
          <TaskSection key={index} title={section.title} tasks={section.tasks} />
        ))}
        <Button onClick={() => setOpenModal(!openModal)}>Adicionar tarefa</Button>
        {openModal && <ModalTaskCreate onClose={() => setOpenModal(false)} />}
      </CardContainer>

      <CardContainer>
        <div className="flex w-full flex-col items-center gap-1 md:flex-row md:justify-between md:gap-0">
          <h5 className="text-start">Agenda</h5>
          <h4 className="text-write-primary">{`${formattedStartOfWeek} - ${formattedEndOfWeek}`}</h4>
          <Calendar
            startOfWeek={formattedStartOfWeek}
            endOfWeek={formattedEndOfWeek}
            onDateClick={handleDateClick}
          />
        </div>
        {daysOfWeek.map((day) => (
          <TaskSection key={day} title={day} tasks={tasksByDay[day] || []} />
        ))}
      </CardContainer>
    </>
  );
};
