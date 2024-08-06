import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputSearch } from "src/components/Form/Input/InputSearch";
import { InputX } from "src/components/Form/Input/InputX";
import { Table } from "src/components/Table/Table";
import { app } from "src/routes/app";
import { useAccessControl } from "src/routes/context/AccessControl";
import { IGetMembershipDto, useGetMembership } from "./hooks/useGetMembership";
import { useListUser } from "./hooks/useListUser";

export const TabAcessos = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useListUser();
  const [filter, setFilter] = useState<any>("");
  const [isFormVisible, setFormVisible] = useState(false);
  const { acesso } = useAccessControl();

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

  const { mutate, isPending, context } = useGetMembership();
  const {
    formState: { errors },
    reset,
  } = context;
  const onSubmit = (data: IGetMembershipDto) => {
    mutate(data);
    reset();
    setFormVisible(false);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <h6 className="text-center text-write-primary">Acesso</h6>
      {acesso === "Master" && (
        <>
          <div
            className={`w-full transition-transform duration-500 ease-in-out ${isFormVisible ? "translate-y-0 opacity-100" : "hidden translate-y-10 opacity-0"}`}
          >
            <FormProvider {...context}>
              <FormX onSubmit={onSubmit} className="flex w-full flex-col items-start gap-2.5">
                <InputX title="Nome" placeholder="Ciclanod e Tal" required />
                <InputX title="E-mail" placeholder="m@hotmail.com" required />
                <Button disabled={isPending || Object.keys(errors).length > 0}>Enviar</Button>
              </FormX>
            </FormProvider>
          </div>
          <Button onClick={() => setFormVisible(!isFormVisible)}>Formulário Adesão</Button>
        </>
      )}
      {!["Cliente", "Funcionário", null].includes(acesso) && (
        <Button onClick={() => navigate(app.user)}>adicionar usuário</Button>
      )}
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
