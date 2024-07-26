import { useNavigate } from "react-router-dom";
import { InputSearch } from "src/components/Form/Input/InputSearch";
import { Table } from "src/components/Table/Table";
import { app } from "src/routes/app";
import { useListUser } from "./hooks/useListUser";

export const TabAcessos = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useListUser();

  const headers = [
    { title: "Nome/Email", width: "32" },
    { title: "Acessos", width: "14" },
    { title: "Status", width: "12" },
  ];

  const transformedData =
    data?.map((user: any) => ({
      one: `${user.nome} / ${user.email}`,
      two: user.profissao,
      three: user.acesso,
    })) || [];

  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <h6 className="text-center text-write-primary">Acesso</h6>
      <InputSearch placeholder="Encontre um usuário" title="Encontre um Usuário" />
      {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
      {error && (
        <>
          <h6 className="text-center text-write-primary">Ocorreu um erro ao carregar os dados.</h6>
          <p className="text-center text-red-500">{error.message}</p>
        </>
      )}
      {!isLoading && !error && (
        <Table headers={headers} data={transformedData} onClick={() => navigate(app.user)} />
      )}
    </div>
  );
};
