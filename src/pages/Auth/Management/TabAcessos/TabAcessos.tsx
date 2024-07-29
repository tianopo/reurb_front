import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { InputSearch } from "src/components/Form/Input/InputSearch";
import { Table } from "src/components/Table/Table";
import { app } from "src/routes/app";
import { useListUser } from "./hooks/useListUser";

export const TabAcessos = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useListUser();
  const [filter, setFilter] = useState("");

  const headers = [
    { title: "Nome/Email", width: "32" },
    { title: "Acessos", width: "14" },
    { title: "Status", width: "12" },
  ];

  const transformedData =
    data?.map((user: any) => ({
      id: user.id,
      one: `${user.nome} / ${user.email}`,
      two: user.acesso,
      three: user.status ? "ativado" : "desativado",
    })) || [];

  const filteredData = transformedData.filter((user: any) => {
    const filterText = filter.toLowerCase();
    return (
      user.one.toLowerCase().includes(filterText) || user.two.toLowerCase().includes(filterText)
    );
  });

  const handleRowClick = (id: string, access: string) => {
    navigate(app.userUpdate(id), { state: { access } });
  };

  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <h6 className="text-center text-write-primary">Acesso</h6>
      <Button onClick={() => navigate(app.user)}>adicionar usuário</Button>
      <InputSearch
        placeholder="Encontre um usuário"
        title="Encontre um Usuário"
        onChange={(e) => setFilter(e.target.value)}
      />
      {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
      {error && (
        <>
          <h6 className="text-center text-write-primary">Ocorreu um erro ao carregar os dados.</h6>
          <p className="text-center text-red-500">{error.message}</p>
        </>
      )}
      {!isLoading && !error && (
        <Table headers={headers} data={filteredData} onClick={handleRowClick} />
      )}
    </div>
  );
};
