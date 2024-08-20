import { useState } from "react";
import { IFinancialUpdateDto } from "src/interfaces/models";
import { useAccessControl } from "src/routes/context/AccessControl";
import { useListFinancial } from "../hooks/useListFinancial";

export const TabLançamentos = () => {
  const { data, isLoading, error } = useListFinancial();
  const [filter, setFilter] = useState<any>("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<IFinancialUpdateDto | undefined>();
  const { acesso } = useAccessControl();

  const headers = [
    { title: "Nome", width: "20" },
    { title: "Valor", width: "20" },
    { title: "Status", width: "20" },
  ];

  const transformedData =
    data?.map((project: any) => ({
      id: project.id,
      one: `${project.nome}`,
      two: project.valorTotal,
      three: project.tipo,
    })) || [];

  const filteredData = transformedData.filter((project: any) => {
    const filterText = filter.toLowerCase();
    return (
      project.one.toLowerCase().includes(filterText) ||
      project.two.toLowerCase().includes(filterText)
    );
  });

  const handleRowClick = (id: string) => {
    const selectedProject = data?.find((project: IFinancialUpdateDto) => project.id === id);
    if (selectedProject) {
      setProjectToEdit(selectedProject);
      setOpenEditModal(true);
    }
  };

  return (
    <></> // <TableFinancial />
  );
};
