import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { InputX } from "src/components/Form/Input/InputX";

export const RecoverPassword = () => {
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col items-center gap-5 p-2.5 md:w-fit">
      <img
        src="logo/logo-blue.png"
        alt="logo azul da Reurb"
        height={227.6}
        width={366}
        className="block md:hidden"
      />
      <InputX
        title="Senha"
        placeholder="Senha deve ter 6 ou mais caracteres"
        required
        typ="password"
      />
      <InputX title="Confirmar Senha" placeholder="A mesma senha acima" required />
      <Button>entrar</Button>
      <h6
        className="cursor-pointer font-bold uppercase text-primary hover:text-terciary"
        onClick={() => navigate("/login")}
      >
        fazer login novamente
      </h6>
      <span className="h-auto text-center text-secundary">
        Ao entrar você concorda com os Termos de Uso e a Política de Privacidade do Astrea
      </span>
    </section>
  );
};
