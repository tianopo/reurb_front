import { InputSearch } from "src/components/Form/Input/InputSearch";
import { Table } from "src/components/Table/Table";

export const TabAcessos = () => {
  const headers = [
    { title: "Nome/Email", width: "32" },
    { title: "Acessos", width: "14" },
    { title: "Status", width: "12" },
  ];

  const data = [
    { one: "John Doe / john.doe@example.com", two: "Funcionário", three: "Ativado" },
    { one: "John Doe / john.doe@example.com", two: "Funcionário", three: "Ativado" },
    { one: "John Doe / john.doe@example.com", two: "Funcionário", three: "Ativado" },
  ];

  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <h6 className="text-center text-write-primary">Acesso</h6>
      <InputSearch placeholder="Encontre um usuário" title="Encontre um Usuário" />
      <Table headers={headers} data={data} />
    </div>
  );
};
