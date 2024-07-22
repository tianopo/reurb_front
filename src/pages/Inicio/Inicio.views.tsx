import { Button } from "src/components/Buttons/Button";
import { CardContainer } from "src/components/Layout/CardContainer";
import "./Inicio.css";

export const Inicio = () => {
  return (
    <>
      <CardContainer>
        <h5 className="subtitulo">Estatísticas</h5>
        <div className="flex w-full flex-wrap justify-between gap-2 text-center">
          <h5 className="descritivo">Projetos a Receber: R$200.000,00</h5>
          <h5 className="descritivo">Projetos Recebidos: R$54.580,00</h5>
          <h5 className="descritivo">Total dos Projetos: R$200.000,00</h5>
          <h5 className="descritivo">Projetos Custo: R$200.000,00</h5>
          <h5 className="descritivo">Projetos em Processo: 10</h5>
          <h5 className="descritivo">Projetos Concluídos: 20</h5>
        </div>
      </CardContainer>
      <CardContainer>
        <h5 className="subtitulo">Tarefas</h5>
        <img
          src="images/task.png"
          alt="sem tarefa registrada"
          className="object-none"
          width={293.51}
          height={293.51}
        />
        <h6 className="descritivo-tarefa">
          Centralize suas tarefas e defina as prioridades do dia em um só lugar
        </h6>
        <h6 className="descritivo-tarefa">
          Organize, priorize e conclua suas listas de tarefas para ter uma rotina mais produtiva e
          dinâmica
        </h6>
        <Button>adicionar tarefa</Button>
      </CardContainer>
    </>
  );
};
