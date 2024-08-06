import { useEffect, useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { CardContainer } from "src/components/Layout/CardContainer";
import { ITaskDto, ITaskUpdateDto } from "src/interfaces/models";
import { Calendar } from "./components/Calendar";
import { ModalTaskCreate } from "./components/ModalTaskCreate";
import { ModalTaskUpdate } from "./components/ModalTaskUpdate";
import { TaskSection } from "./components/TaskSection";
import { useListTask } from "./hooks/useListTask";

export const Schedule = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { data: tasks, error, isLoading } = useListTask();
  const [taskToEdit, setTaskToEdit] = useState<ITaskUpdateDto | null>(null);

  const [tarefasHoje, setTarefasHoje] = useState<ITaskDto[]>([]);
  const [tasksByDay, setTasksByDay] = useState<Record<string, ITaskDto[]>>({});

  const tarefasAFazer = tarefasHoje?.filter((task: ITaskDto) => task.status === "à Fazer") || [];
  const tarefasAtrasados =
    tarefasHoje?.filter((task: ITaskDto) => task.status === "Atrasados") || [];
  const tarefasFeitos = tarefasHoje?.filter((task: ITaskDto) => task.status === "Feitos") || [];

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

  const startOfDay = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = (date: Date) => new Date(date.setHours(23, 59, 59, 999));

  useEffect(() => {
    if (tasks) {
      const today = new Date();
      const formatTodayDate = today.toISOString().split("T")[0];
      const todayTasks = tasks.filter((task: ITaskDto) => {
        const taskDate = new Date(task.data).toISOString().split("T")[0];
        return taskDate === formatTodayDate;
      });
      setTarefasHoje(todayTasks);

      const startOfWeekDate = startOfDay(new Date(startOfWeek));
      const endOfWeekDate = endOfDay(new Date(endOfWeek));

      const updatedTasksByDay = tasks.reduce((acc: any, task: ITaskDto) => {
        const taskDate = startOfDay(new Date(task.data));

        if (taskDate >= startOfWeekDate && taskDate <= endOfWeekDate) {
          const day = getDayOfWeek(task.data);
          if (!acc[day]) acc[day] = [];
          acc[day].push(task);
        }
        return acc;
      }, {});

      setTasksByDay(updatedTasksByDay);
    }
  }, [tasks, startOfWeek, endOfWeek]);

  const handleDateClick = (date: Date) => {
    setStartOfWeek(getStartOfWeek(date));
    setEndOfWeek(getEndOfWeek(date));
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  const formattedStartOfWeek = formatDate(startOfWeek);
  const formattedEndOfWeek = formatDate(endOfWeek);

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
          <TaskSection
            key={index}
            title={section.title}
            tasks={section.tasks}
            setTask={setTaskToEdit}
            setOpenEditModal={setOpenEditModal}
          />
        ))}
        <Button onClick={() => setOpenModal(!openModal)}>Adicionar tarefa</Button>
        {openModal && <ModalTaskCreate onClose={() => setOpenModal(false)} />}
        {openEditModal && (
          <ModalTaskUpdate onClose={() => setOpenEditModal(false)} task={taskToEdit} />
        )}
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
          <TaskSection
            key={day}
            title={day}
            tasks={tasksByDay[day] || []}
            setTask={setTaskToEdit}
            setOpenEditModal={setOpenEditModal}
          />
        ))}
      </CardContainer>
    </>
  );
};
