import { InputSearch } from "src/components/Form/Input/InputSearch";

export const TabAcessos = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <h6 className="text-center text-write-primary">Acesso</h6>
      <InputSearch placeholder="Encontre um usuário" title="Encontre um Usuário" />
    </div>
  );
};
