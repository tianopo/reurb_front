import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { app } from "src/routes/app";
import { IRegisterDto, useRegister } from "./useRegister";

export const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending, context } = useRegister();
  const {
    formState: { errors },
  } = context;
  const onSubmit = (data: IRegisterDto) => {
    mutate(data);
  };

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
        <FormX onSubmit={onSubmit} className="flex w-full flex-col gap-5">
          <InputX title="Nome" placeholder="Fulano Silva" required />
          <InputX title="E-mail" placeholder="seuemail@gmail.com" required />
          <InputX
            title="Senha"
            placeholder="Senha deve ter 6 ou mais caracteres"
            required
            typ="password"
          />
          <InputX
            title="Confirmar Senha"
            placeholder="A mesma senha acima"
            required
            typ="password"
          />
          <Button disabled={isPending || Object.keys(errors).length > 0}>
            {!isPending ? "cadastrar" : "loading..."}
          </Button>
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
