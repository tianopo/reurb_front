import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { app } from "src/routes/app";
import { useCheckTokenRecover } from "./useCheckTokenRecover";
import { IRecoverPasswordDto, useRecoverPassword } from "./useRecoverPassword";

export const RecoverPassword = () => {
  const navigate = useNavigate();
  const { mutate, isPending, context } = useRecoverPassword();
  const {
    formState: { errors },
  } = context;
  const onSubmit = (data: IRecoverPasswordDto) => {
    mutate(data);
  };

  const { data, error, isLoading } = useCheckTokenRecover();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!data || error) {
    return <div>Token inválido ou expirado.</div>;
  }

  return (
    <section className="flex w-full flex-col items-center gap-5 p-2.5 md:w-fit">
      <img
        src="logo/logo-blue.png"
        alt="logo azul da Reurb"
        height={227.6}
        width={366}
        className="block md:hidden"
      />
      <FormProvider {...context}>
        <FormX onSubmit={onSubmit} className="flex w-full flex-col items-center gap-5">
          <InputX title="E-mail" placeholder="Seu e-mail cadastrado" required />
          <InputX
            title="Senha"
            placeholder="Senha deve ter 6 ou mais caracteres"
            required
            typ="password"
          />
          <InputX title="Confirmar Senha" placeholder="A mesma senha acima" required />
          <Button disabled={isPending || Object.keys(errors).length > 0}>entrar</Button>
        </FormX>
      </FormProvider>
      <h6
        className="cursor-pointer font-bold uppercase text-primary hover:text-terciary"
        onClick={() => navigate(app.login)}
      >
        fazer login novamente
      </h6>
      <span className="h-auto text-center text-secundary">
        Ao entrar você concorda com os Termos de Uso e a Política de Privacidade do Astrea
      </span>
    </section>
  );
};
