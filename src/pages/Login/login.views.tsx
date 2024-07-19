import { Button } from "src/components/Buttons/Button";
import { InputX } from "src/components/Form/InputX";

export const Login = () => {
  return (
    <section className="flex w-full flex-col items-center gap-5 p-2.5 md:w-fit">
      <img src="logo/logo-blue.png" alt="logo azul da Reurb" height={227.6} width={366} />
      <InputX title="E-mail" placeholder="Adriana" required />
      <InputX title="Senha" placeholder="**************" required typ="password" />
      <Button>entrar</Button>
      <h6 className="cursor-pointer font-bold uppercase text-primary hover:text-terciary">
        esqueceu sua senha
      </h6>
      <span className="h-auto text-center text-secundary">
        Ao entrar você concorda com os Termos de Uso e a Política de Privacidade do Astrea
      </span>
    </section>
  );
};
