import { Button } from "src/components/Buttons/Button";
import { CardContainer } from "src/components/Layout/CardContainer";
import "./Projects.css";

export const Projects = () => {
  return (
    <CardContainer>
      <h5 className="subtitulo">Projetos</h5>
      <img
        src="images/project.png"
        alt="sem projeto registrado"
        className="object-none"
        width={293.51}
        height={293.51}
      />
      <h6 className="descritivo-tarefa">
        Centralize seus projetos e defina as prioridade em um só lugar
      </h6>
      <Button>adicionar projetos</Button>
    </CardContainer>
  );
};
