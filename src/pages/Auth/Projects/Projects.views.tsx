import { useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { InputSearch } from "src/components/Form/Input/InputSearch";
import { CardContainer } from "src/components/Layout/CardContainer";
import { Table } from "src/components/Table/Table";
import { IProjectUpdateDto } from "src/interfaces/models";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import { ModalProjectCreate } from "./components/ModalProjectCreate";
import { ModalProjectUpdate } from "./components/ModalProjectUpdate";
import { useListProject } from "./hooks/useListProject";
import "./Projects.css";

export const Projects = () => {
  const { data, isLoading, error } = useListProject();
  const [filter, setFilter] = useState<any>("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<IProjectUpdateDto | undefined>();
  const { acesso } = useAccessControl();

  const headers = [
    { title: "Nome" },
    { title: "Valor" },
    { title: "Acumulado" },
    { title: "Status" },
  ];

  const transformedData =
    data?.map((project: any) => ({
      id: project.id,
      one: `${project.nome}`,
      two: project.valorTotal,
      three: project.valorAcumulado,
      four: project.status,
    })) || [];

  const filteredData = transformedData.filter((project: any) => {
    const filterText = filter.toLowerCase();
    return (
      project.one.toLowerCase().includes(filterText) ||
      project.two.toLowerCase().includes(filterText) ||
      project.three.toLowerCase().includes(filterText)
    );
  });

  const handleRowClick = (id: string) => {
    const selectedProject = data?.find((project: IProjectUpdateDto) => project.id === id);
    if (selectedProject) {
      setProjectToEdit(selectedProject);
      setOpenEditModal(true);
    }
  };

  return (
    <CardContainer>
      <h5 className="subtitulo">Projetos</h5>
      {data && data.length ? (
        <>
          <InputSearch
            placeholder="Encontre um projeto"
            title="Encontre um Projeto"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Table headers={headers} data={filteredData} onClick={handleRowClick} />
        </>
      ) : (
        <>
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
          {[Role.Gestor, Role.Admin, null].includes(acesso) && (
            <Button onClick={() => setOpenModal(!openModal)}>adicionar</Button>
          )}
        </>
      )}
      {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
      {error && (
        <>
          <h6 className="text-center text-write-primary">Ocorreu um erro ao carregar os dados.</h6>
          <p className="text-center text-red-500">{error.message}</p>
        </>
      )}
      {openModal && <ModalProjectCreate onClose={() => setOpenModal(false)} />}
      {openEditModal && (
        <ModalProjectUpdate project={projectToEdit} onClose={() => setOpenEditModal(false)} />
      )}
    </CardContainer>
  );
};
