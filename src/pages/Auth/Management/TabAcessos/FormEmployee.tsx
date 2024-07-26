import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { CardContainer } from "src/components/Layout/CardContainer";
import { app } from "src/routes/app";
import { formatCPF, formatPhone } from "src/utils/formats";
import "../Management.css";
import { ICreateEmployeeDto, useCreateEmployee } from "./hooks/useCreateEmployee";

interface IFormEmployee {
  MainDiv: () => JSX.Element;
}

export const FormEmployee = ({ MainDiv }: IFormEmployee) => {
  const [valueCPF, setValueCPF] = useState("");
  const [valuePhone, setValuePhone] = useState("");

  const handleCPFFormat = (e: { target: { value: string } }) => {
    const formattedCPF = formatCPF(e.target.value);
    setValueCPF(formattedCPF);
  };

  const handlePhoneFormat = (e: { target: { value: string } }) => {
    const formattedPhone = formatPhone(e.target.value);
    setValuePhone(formattedPhone);
  };

  const navigate = useNavigate();

  const { mutate, isPending, context } = useCreateEmployee();
  const {
    formState: { errors },
  } = context;
  const onSubmit = (data: ICreateEmployeeDto) => {
    mutate(data);
  };

  return (
    <FormProvider {...context}>
      <FormX onSubmit={onSubmit} className="flex flex-col gap-1.5">
        <CardContainer>
          <MainDiv />
          <div className="container-user pt-2.5">
            <InputX title="Nome" placeholder="Ciclano Fonseca" required />
            <InputX
              title="CPF"
              placeholder="XXX.XXX.XXX-XX"
              onChange={handleCPFFormat}
              value={valueCPF}
              required
            />
          </div>
          <InputX
            title="Telefone"
            placeholder="(12) 98243-5638"
            onChange={handlePhoneFormat}
            value={valuePhone}
            required
          />
          <InputX title="Profissão" placeholder="Carpinteiro" required />
          <div className="container-user">
            <InputX title="E-mail" placeholder="adoleta@hotmail.com.br" required />
          </div>
          <div className="container-user md:justify-between">
            <Button disabled={isPending || Object.keys(errors).length > 0}>
              {!isPending ? "salvar" : "loading..."}
            </Button>
            <Button onClick={() => navigate(app.management)}>Voltar</Button>
          </div>
        </CardContainer>
      </FormX>
    </FormProvider>
  );
};
