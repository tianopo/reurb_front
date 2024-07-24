import { Files, Gear, ProjectorScreen, X } from "@phosphor-icons/react";
import { ChangeEvent, useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { IconX } from "src/components/Icons/IconX";
import { CardContainer } from "src/components/Layout/CardContainer";
import { useAddressByCep } from "src/hooks/API/AddressByCep";
import {
  formatCep,
  formatCPF,
  formatCurrency,
  formatPhone,
  formatRG,
  formatState,
} from "src/utils/formats";
import "../Management.css";
import { ModalUserProjects } from "./components/ModalUserProjects";
import { SelectUser } from "./components/SelectUser";

export const User = () => {
  const [valueRG, setValueRG] = useState("");
  const [valueCPF, setValueCPF] = useState("");
  const [valueCEP, setValueCEP] = useState("");
  const [valueState, setValueState] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [valueCurrency, setValueCurrency] = useState("");
  const [valueRGConjuge, setValueRGConjuge] = useState("");
  const [valueCPFConjuge, setValueCPFConjuge] = useState("");
  const [valuePhoneConjuge, setValuePhoneConjuge] = useState("");

  const [cep, setCep] = useState("");
  const [valueStreet, setValueStreet] = useState("");
  const [valueBairro, setValueBairro] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const acesso = "funcionário"

  const handleRGFormat = (e: { target: { value: string } }) => {
    const formattedRG = formatRG(e.target.value);
    setValueRG(formattedRG);
  };

  const handleCPFFormat = (e: { target: { value: string } }) => {
    const formattedCPF = formatCPF(e.target.value);
    setValueCPF(formattedCPF);
  };

  const handleStateFormat = (e: { target: { value: string } }) => {
    const formattedState = formatState(e.target.value);
    setValueState(formattedState);
  };

  const handlePhoneFormat = (e: { target: { value: string } }) => {
    const formattedPhone = formatPhone(e.target.value);
    setValuePhone(formattedPhone);
  };

  const handleCurrencyFormat = (e: { target: { value: string } }) => {
    const formattedCurrency = formatCurrency(e.target.value);
    setValueCurrency(formattedCurrency);
  };

  const handleRGConjugeFormat = (e: { target: { value: string } }) => {
    const formattedRGConjuge = formatRG(e.target.value);
    setValueRGConjuge(formattedRGConjuge);
  };

  const handleCPFConjugeFormat = (e: { target: { value: string } }) => {
    const formattedCPFConjuge = formatCPF(e.target.value);
    setValueCPFConjuge(formattedCPFConjuge);
  };

  const handlePhoneConjugeFormat = (e: { target: { value: string } }) => {
    const formattedPhoneConjuge = formatPhone(e.target.value);
    setValuePhoneConjuge(formattedPhoneConjuge);
  };

  const handleCepChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value;
    setCep(cepValue);

    const formattedCEP = formatCep(cepValue);
    setValueCEP(formattedCEP);
    const cleanCep = cepValue.replace(/\D/g, "");

    if (cleanCep.length === 8) {
      const addressData = await useAddressByCep(cleanCep);

      if (addressData) {
        const { logradouro, bairro, uf } = addressData;
        setValueStreet(logradouro);
        setValueBairro(bairro);
        setValueState(formatState(uf));
      }
    }
  };

  return (
    <>
      <CardContainer>
        <div className="flex w-full items-start justify-between">
          <h4 className="text-start text-write-primary">Usuário Adriana</h4>
          <div className="flex gap-1">
            <SelectUser />
            <IconX
              name="Editar"
              icon={
                <Gear
                  className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
                  width={19.45}
                  height={20}
                  weight="fill"
                />
              }
            />
          </div>
        </div>
        <div className="container-user pt-2.5">
          <InputX title="Nome" placeholder="Ciclano Fonseca" required />
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
          <Select
            title="Estado Civil"
            options={["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"]}
            required
          />
          <InputX title="Profissão" placeholder="Carpinteiro" required />
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
            title="Tipos de Contato"
            options={["Procuração", "Contrato", "Requerimento Reurb", "Memorando"]}
            required
          />
        </div>
        <div className="container-user">
          <InputX title="Lote Atual" placeholder="15" />
          <InputX title="Lote Novo" placeholder="17" />
          <InputX title="Quadra Atual" placeholder="A" />
          <InputX title="Quadra Nova" placeholder="B" />
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
        <p className="w-full text-start font-bold text-write-primary">Cônjuge</p>
        <div className="container-user">
          <InputX title="Nome Conjuge" placeholder="Renata Siqueira" required />
          <InputX
            title="RG Conjuge"
            placeholder="XX.XXX.XXX-X"
            onChange={handleRGConjugeFormat}
            value={valueRGConjuge}
            required
          />
          <InputX
            title="CPF Conjuge"
            placeholder="XXX.XXX.XXX-XX"
            onChange={handleCPFConjugeFormat}
            value={valueCPFConjuge}
            required
          />
          <InputX title="Profissão Conjuge" placeholder="Carpinteiro" required />
        </div>
        <div className="container-user">
          <InputX
            title="Telefone Conjuge"
            placeholder="(12) 98243-5638"
            onChange={handlePhoneConjugeFormat}
            value={valuePhoneConjuge}
            required
          />
          <InputX title="E-mail Conjuge" placeholder="adoleta@hotmail.com.br" required />
        </div>
        <div className="container-user md:justify-between">
          <Button>adicionar usuário</Button>
          <Button>gerar documento</Button>
        </div>
      </CardContainer>
    </>
  );
};
