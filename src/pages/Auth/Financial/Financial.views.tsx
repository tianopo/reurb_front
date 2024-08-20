import { useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { InputSearch } from "src/components/Form/Input/InputSearch";
import { CardContainer } from "src/components/Layout/CardContainer";
import { Tabs } from "src/components/Tabs/Tabs";
import { IFinancialUpdateDto } from "src/interfaces/models";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import { ModalFinancialCreate } from "./components/ModalFinancialCreate";
import { ModalFinancialUpdate } from "./components/ModalFinancialUpdate";
import { TableFinancial } from "./components/TableFinancial";
import "./Financial.css";
import { useListFinancial } from "./hooks/useListFinancial";

export const Financial = () => {
  const titles = ["Lançamentos", "Em Processo", "Concluidos"];
  const { data, isLoading, error } = useListFinancial();
  const [filter, setFilter] = useState<any>("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [financialToEdit, setFinancialToEdit] = useState<IFinancialUpdateDto | undefined>();
  const [activeTab, setActiveTab] = useState<string>(titles[0]);
  const { acesso } = useAccessControl();

  const headers = [
    { title: "Nome" },
    { title: "Valor" },
    { title: "Pagamento" },
    { title: "Tipo" },
  ];

  const getFilteredDataByStatus = (status: string) =>
    data
      ?.filter((financial: any) => financial.status === status)
      .map((financial: any) => ({
        id: financial.id,
        one: financial.nome,
        two: financial.valor,
        three: financial.pagamento,
        four: financial.tipo,
      }))
      .filter((financial: any) => {
        const filterText = filter.toLowerCase();
        return (
          financial.one.toLowerCase().includes(filterText) ||
          financial.two.toLowerCase().includes(filterText) ||
          financial.two.toLowerCase().includes(filterText)
        );
      }) || [];

  const handleRowClick = (id: string) => {
    const selectedFinancial = data?.find((financial: IFinancialUpdateDto) => financial.id === id);
    if (selectedFinancial) {
      setFinancialToEdit(selectedFinancial);
      setOpenEditModal(true);
    }
  };

  return (
    <CardContainer>
      <h5 className="subtitulo">Financeiro</h5>
      <Tabs titles={titles} activeTab={activeTab} setActiveTab={setActiveTab} />
      {data && data.length > 0 ? (
        <>
          <InputSearch
            placeholder="Encontre um Financeiro"
            title="Encontre um Financeiro"
            onChange={(e) => setFilter(e.target.value)}
          />
          {(() => {
            switch (activeTab) {
              case "Lançamentos":
                return (
                  <>
                    {[Role.Gestor, Role.Admin, null].includes(acesso) && (
                      <Button onClick={() => setOpenModal(!openModal)}>adicionar</Button>
                    )}
                    <TableFinancial
                      headers={headers}
                      data={getFilteredDataByStatus("Lançamentos")}
                      onClick={handleRowClick}
                    />
                  </>
                );
              case "Em Processo":
                return (
                  <TableFinancial
                    headers={headers}
                    data={getFilteredDataByStatus("Em Processo")}
                    onClick={handleRowClick}
                  />
                );
              case "Concluidos":
                return (
                  <TableFinancial
                    headers={headers}
                    data={getFilteredDataByStatus("Concluidos")}
                    onClick={handleRowClick}
                  />
                );
              default:
                return (
                  <TableFinancial
                    headers={headers}
                    data={getFilteredDataByStatus("Lançamentos")}
                    onClick={handleRowClick}
                  />
                );
            }
          })()}
        </>
      ) : (
        <>
          <img
            src="images/project.png"
            alt="sem finanças nesse status"
            className="object-none"
            width={293.51}
            height={293.51}
          />
          {[Role.Gestor, Role.Admin, null].includes(acesso) && (
            <Button onClick={() => setOpenModal(!openModal)}>adicionar</Button>
          )}
          <h6 className="descritivo-tarefa">
            Centralize suas finanças e defina as prioridade em um só lugar
          </h6>
        </>
      )}
      {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
      {error && (
        <>
          <h6 className="text-center text-write-primary">Ocorreu um erro ao carregar os dados.</h6>
          <p className="text-center text-red-500">{error.message}</p>
        </>
      )}
      {openModal && <ModalFinancialCreate onClose={() => setOpenModal(false)} />}
      {openEditModal && (
        <ModalFinancialUpdate financial={financialToEdit} onClose={() => setOpenEditModal(false)} />
      )}
    </CardContainer>
  );
};
