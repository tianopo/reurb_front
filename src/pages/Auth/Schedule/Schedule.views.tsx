import { useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { CardContainer } from "src/components/Layout/CardContainer";
import { ModalTaskCreate } from "./components/ModalTask";
import "./Schedule.css";

export const Schedule = () => {
  const [openModal, setOpenModal] = useState(false);
  const testeCard = [
    { color: "green", name: "Nome do Projeto", hora: "15:00" },
    { color: "green", name: "Nome do Projeto", hora: "15:00" },
    { color: "green", name: "Nome do Projeto", hora: "15:00" },
  ];
  return (
    <>
      <CardContainer>
        <h5 className="subtitulo">Tarefas de hoje</h5>
        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="container-descritivo">
            <h4 className="descritivo">a Fazer</h4>
          </div>
          {testeCard.map((card, index) => (
            <div
              key={index}
              className="flex h-12 w-fit items-center gap-0.5 rounded-6 px-2.5 md:w-56 md:justify-between"
              style={{ backgroundColor: card.color }}
            >
              <h6 className="truncate text-white">{card.name}</h6>
              <h6 className="w-fit text-white">{card.hora}</h6>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="container-descritivo">
            <h4 className="descritivo">Atrasados</h4>
          </div>
          {testeCard.map((card, index) => (
            <div
              key={index}
              className="flex h-12 w-fit items-center gap-0.5 rounded-6 px-2.5 md:w-56 md:justify-between"
              style={{ backgroundColor: card.color }}
            >
              <h6 className="truncate text-white">{card.name}</h6>
              <h6 className="w-fit text-white">{card.hora}</h6>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="container-descritivo">
            <h4 className="descritivo">Feitos</h4>
          </div>
          {testeCard.map((card, index) => (
            <div
              key={index}
              className="flex h-12 w-fit items-center gap-0.5 rounded-6 px-2.5 md:w-56 md:justify-between"
              style={{ backgroundColor: card.color }}
            >
              <h6 className="truncate text-white">{card.name}</h6>
              <h6 className="w-fit text-white">{card.hora}</h6>
            </div>
          ))}
        </div>
        <Button onClick={() => setOpenModal(!openModal)}>adicionar tarefa</Button>
        {openModal && <ModalTaskCreate onClose={() => setOpenModal(false)} />}
      </CardContainer>
      <CardContainer>
        <h5 className="subtitulo">Agenda</h5>
        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="container-descritivo">
            <h4 className="descritivo">DOM</h4>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="container-descritivo">
            <h4 className="descritivo">DOM</h4>
          </div>
        </div>
      </CardContainer>
    </>
  );
};
