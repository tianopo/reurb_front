import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { InputX } from "src/components/Form/Input/InputX";
import { app } from "src/routes/app";
import { formatCep, formatPhone } from "src/utils/formats";

export const Membership = () => {
  const navigate = useNavigate();
  const [valuePhone, setValuePhone] = useState("");
  const [valueCep, setValueCep] = useState("");

  const handlePhoneChange = (e: { target: { value: string } }) => {
    const formattedPhone = formatPhone(e.target.value);
    setValuePhone(formattedPhone);
  };

  const handleCepChange = (e: { target: { value: string } }) => {
    const formattedCep = formatCep(e.target.value);
    setValueCep(formattedCep);
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
      <InputX title="Nome do Morador" placeholder="Adriana" required />
      <InputX title="E-mail" placeholder="fulano@hotmail.com" required />
      <InputX
        title="Telefone"
        placeholder="(12) 3952-7565"
        required
        typ="tel"
        onChange={handlePhoneChange}
        value={valuePhone}
      />
      <InputX
        title="CEP"
        placeholder="XX.XXX-XXX"
        required
        onChange={handleCepChange}
        value={valueCep}
      />
      <Button>entrar</Button>
      <h6
        className="cursor-pointer font-bold uppercase text-primary hover:text-terciary"
        onClick={() => navigate(app.login)}
      >
        fazer login novamente
      </h6>
      <h6
        className="hidden cursor-pointer text-center font-bold text-primary hover:text-terciary"
        onClick={() => navigate("/")}
      >
        Agradecemos o seu registro aguarde o contato de um representante
      </h6>
      <span className="h-auto text-center text-secundary">
        Ao entrar você concorda com os Termos de Uso e a Política de Privacidade do Astrea
      </span>
    </section>
  );
};
