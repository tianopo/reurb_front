import { Files, ProjectorScreen, X } from "@phosphor-icons/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { CardContainer } from "src/components/Layout/CardContainer";
import { useAddressByCep } from "src/hooks/API/AddressByCep";
import { app } from "src/routes/app";
import {
  formatCep,
  formatCPF,
  formatCurrency,
  formatPhone,
  formatRG,
  formatState,
} from "src/utils/formats";
import "../../Management.css";
import { ModalUserProjects } from "../components/ModalUserProjects";
import { IClientDto } from "../hooks/interfaces";
import { useCreateClient } from "../hooks/useCreateClient";

interface IFormClient {
  MainDiv: () => JSX.Element;
  setUser: Dispatch<SetStateAction<string>>;
}

export const FormCreateClient = ({ MainDiv, setUser }: IFormClient) => {
  const [valueRG, setValueRG] = useState("");
  const [valueCPF, setValueCPF] = useState("");
  const [valueCEP, setValueCEP] = useState("");
  const [valueState, setValueState] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [valueCurrency, setValueCurrency] = useState("");
  const [valueRGConjuge, setValueRGConjuge] = useState("");
  const [valueCPFConjuge, setValueCPFConjuge] = useState("");
  const [valuePhoneConjuge, setValuePhoneConjuge] = useState("");

  const [valueStreet, setValueStreet] = useState("");
  const [valueBairro, setValueBairro] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [maritalStatus, setMaritalStatus] = useState("");

  const handleRGFormat = (e: { target: { value: string } }) => {
    const formattedRG = formatRG(e.target.value);
    setValue("rg", formattedRG);
    setValueRG(formattedRG);
  };

  const handleCPFFormat = (e: { target: { value: string } }) => {
    const formattedCPF = formatCPF(e.target.value);
    setValue("cpf", formattedCPF);
    setValueCPF(formattedCPF);
  };

  const handleStateFormat = (e: { target: { value: string } }) => {
    const formattedState = formatState(e.target.value);
    setValue("estado", formattedState);
    setValueState(formattedState);
  };

  const handlePhoneFormat = (e: { target: { value: string } }) => {
    const formattedPhone = formatPhone(e.target.value);
    setValue("telefone", formattedPhone);
    setValuePhone(formattedPhone);
  };

  const handleCurrencyFormat = (e: { target: { value: string } }) => {
    const formattedCurrency = formatCurrency(e.target.value);
    setValueCurrency(formattedCurrency);
  };

  const handleRGConjugeFormat = (e: { target: { value: string } }) => {
    const formattedRGConjuge = formatRG(e.target.value);
    setValue("rgConjuge", formattedRGConjuge);
    setValueRGConjuge(formattedRGConjuge);
  };

  const handleCPFConjugeFormat = (e: { target: { value: string } }) => {
    const formattedCPFConjuge = formatCPF(e.target.value);
    setValue("cpfConjuge", formattedCPFConjuge);
    setValueCPFConjuge(formattedCPFConjuge);
  };

  const handlePhoneConjugeFormat = (e: { target: { value: string } }) => {
    const formattedPhoneConjuge = formatPhone(e.target.value);
    setValue("telefoneConjuge", formattedPhoneConjuge);
    setValuePhoneConjuge(formattedPhoneConjuge);
  };

  const handleCepChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value;

    const formattedCEP = formatCep(cepValue);
    setValue("cep", formattedCEP);
    setValueCEP(formattedCEP);
    const cleanCep = cepValue.replace(/\D/g, "");

    if (cleanCep.length === 8) {
      const addressData = await useAddressByCep(cleanCep);
      if (addressData && addressData.erro !== "true") {
        clearErrors();
        const { logradouro, bairro, uf } = addressData;
        setValueStreet(logradouro);
        setValue("rua", logradouro);
        setValueBairro(bairro);
        setValue("bairro", bairro);
        setValueState(formatState(uf));
        setValue("estado", formatState(uf));
      }
    }
  };

  const handleNameChange = () => {
    const name = watch("nome");
    const formattedName = name.split(" ")[0];
    setUser(formattedName);
  };

  const handleMaritalStatusChange = (e: { target: { value: string } }) => {
    setMaritalStatus(e.target.value);
  };

  const navigate = useNavigate();

  const { mutate, isPending, context } = useCreateClient();
  const {
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = context;
  const onSubmit = (data: IClientDto) => {
    mutate(data);
  };
  console.log(watch("rg"));

  return (
    <FormProvider {...context}>
      <FormX onSubmit={onSubmit} className="flex flex-col gap-1.5">
        <CardContainer>
          <MainDiv />
          <div className="container-user pt-2.5">
            <InputX
              title="Nome"
              placeholder="Ciclano Fonseca"
              required
              onChange={handleNameChange}
            />
            <InputX
              title="RG"
              placeholder="XX.XXX.XXX-X"
              onChange={handleRGFormat}
              value={valueRG}
              required
            />
            <InputX
              title="CPF"
              placeholder="XXX.XXX.XXX-XX"
              onChange={handleCPFFormat}
              value={valueCPF}
              required
            />
          </div>
          <div className="container-user">
            <InputX title="Profissão" placeholder="Carpinteiro" required />
            <Select
              title="Estado Civil"
              placeholder="Solteiro"
              options={["Solteiro", "Casado", "União Estável", "Separado", "Divorciado", "Viúvo"]}
              onChange={handleMaritalStatusChange}
              required
            />
            <InputX
              title="CEP"
              placeholder="XX.XXX-XXX"
              onChange={handleCepChange}
              value={valueCEP}
              required
            />
          </div>
          <div className="container-user">
            <InputX
              title="Rua"
              placeholder="Rua Salvador"
              value={valueStreet}
              onChange={(e) => setValueStreet(e.target.value)}
              required
            />
            <div className="md:w-1/2">
              <InputX title="Número" placeholder="100" required />
            </div>
            <InputX
              title="Bairro"
              placeholder="Jardim Colinas"
              value={valueBairro}
              onChange={(e) => setValueBairro(e.target.value)}
              required
            />
            <div className="md:w-1/8">
              <InputX title="Complemento" placeholder="BL 8 apto 805" />
            </div>
            <div className="md:w-1/2">
              <InputX
                title="Estado"
                placeholder="SP"
                value={valueState}
                onChange={handleStateFormat}
                required
              />
            </div>
          </div>
          <div className="container-user">
            <InputX
              title="Telefone"
              placeholder="(12) 98243-5638"
              onChange={handlePhoneFormat}
              value={valuePhone}
              required
            />
            <InputX title="E-mail" placeholder="adoleta@hotmail.com.br" required />
            <Select
              title="Tipos de Contrato"
              placeholder="Procuração"
              options={["Procuração", "Contrato", "Requerimento Reurb", "Memorando"]}
              required
            />
          </div>
          <div className="container-user">
            <InputX title="Lote Atual" placeholder="15" required />
            <InputX title="Lote Novo" placeholder="17" required />
            <InputX title="Quadra Atual" placeholder="A" required />
            <InputX title="Quadra Nova" placeholder="B" required />
          </div>
          <ModalUserProjects isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
          <Button onClick={() => setIsModalVisible(true)}>adicionar projeto</Button>
          <div className="container-user flex-wrap items-end">
            <div className="flex items-center gap-2 text-write-secundary">
              <span>Nome do arquivo</span>
              <ProjectorScreen width={22} height={22} weight="duotone" />
              <X width={12} height={12} weight="bold" className="cursor-pointer" />
            </div>
          </div>
        </CardContainer>
        <CardContainer>
          <h4 className="text-write-primary">Renda</h4>
          <div className="container-user items-end">
            <InputX
              title="Total Renda Familiar"
              placeholder="R$12.000,00"
              onChange={handleCurrencyFormat}
              value={valueCurrency}
              required
            />
            <Button>anexar documentos</Button>
          </div>
          <div className="container-user flex-wrap items-end">
            <div className="flex items-center gap-2 text-write-secundary">
              <span>Nome do arquivo</span>
              <Files width={22} height={22} weight="duotone" />
              <X width={12} height={12} weight="bold" className="cursor-pointer" />
            </div>
          </div>
          {["Casado", "União Estável"].includes(maritalStatus) && (
            <>
              <p className="w-full text-start font-bold text-write-primary">Cônjuge</p>
              <div className="container-user">
                <InputX title="Nome Cônjuge" placeholder="Renata Siqueira" required />
                <InputX
                  title="RG Cônjuge"
                  placeholder="XX.XXX.XXX-X"
                  onChange={handleRGConjugeFormat}
                  value={valueRGConjuge}
                  required
                />
                <InputX
                  title="CPF Cônjuge"
                  placeholder="XXX.XXX.XXX-XX"
                  onChange={handleCPFConjugeFormat}
                  value={valueCPFConjuge}
                  required
                />
                <InputX title="Profissão Cônjuge" placeholder="Carpinteiro" required />
              </div>
              <div className="container-user">
                <InputX
                  title="Telefone Cônjuge"
                  placeholder="(12) 98243-5638"
                  onChange={handlePhoneConjugeFormat}
                  value={valuePhoneConjuge}
                  required
                />
                <InputX title="E-mail Cônjuge" placeholder="adoleta@hotmail.com.br" required />
              </div>
            </>
          )}
          <div className="container-user md:justify-between">
            <Button disabled={isPending || Object.keys(errors).length > 0}>
              {!isPending ? "salvar" : "loading..."}
            </Button>
            <Button onClick={() => navigate(app.management)}>Voltar</Button>
          </div>
          <Button>gerar documento</Button>
        </CardContainer>
      </FormX>
    </FormProvider>
  );
};
