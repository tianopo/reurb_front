import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { CardContainer } from "src/components/Layout/CardContainer";
import { app } from "src/routes/app";
import { formatCPF, formatPhone } from "src/utils/formats";
import "../../Management.css";
import { IEmployeeDto } from "../hooks/interfaces";
import { useGetIdUser } from "../hooks/useGetIdUser";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";

interface IFormEmployee {
  MainDiv: () => JSX.Element;
  setUser: Dispatch<SetStateAction<string>>;
}

export const FormUpdateEmployee = ({ MainDiv, setUser }: IFormEmployee) => {
  const [valueCPF, setValueCPF] = useState("");
  const [valuePhone, setValuePhone] = useState("");

  const handleCPFFormat = (e: { target: { value: string } }) => {
    const formattedCPF = formatCPF(e.target.value);
    setValue("cpf", formattedCPF);
    setValueCPF(formattedCPF);
  };

  const handlePhoneFormat = (e: { target: { value: string } }) => {
    const formattedPhone = formatPhone(e.target.value);
    setValue("telefone", formattedPhone);
    setValuePhone(formattedPhone);
  };

  const handleNameChange = () => {
    const name = watch("nome");
    const formattedName = name.split(" ")[0];
    setUser(formattedName);
  };

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetIdUser(id || "");

  const { mutate, isPending, context } = useUpdateEmployee(id || "");
  const {
    formState: { errors },
    setValue,
    watch,
  } = context;
  const onSubmit = (data: IEmployeeDto) => {
    mutate(data);
  };

  useEffect(() => {
    if (data) {
      setValue("nome", data.nome || "");
      setValue("cpf", data.cpf || "");
      setValue("profissao", data.profissao || "");
      setValue("telefone", data.telefone || "");
      setValue("email", data.email || "");
    }
  }, [data, setValue]);

  return (
    <FormProvider {...context}>
      <FormX onSubmit={onSubmit} className="flex flex-col gap-1.5">
        <CardContainer>
          <MainDiv />
          {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
          {error && (
            <>
              <h6 className="text-center text-variation-error">
                Ocorreu um erro ao carregar os dados.
              </h6>
              <p className="text-center text-red-500">{error.message}</p>
            </>
          )}
          <div className="container-user pt-2.5">
            <InputX
              title="Nome"
              placeholder="Ciclano Fonseca"
              required
              onChange={handleNameChange}
            />
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
