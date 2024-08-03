import { Files, ProjectorScreen, X } from "@phosphor-icons/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
import { useGetIdUser } from "../hooks/useGetIdUser";
import { useUpdateClient } from "../hooks/useUpdateClient";
import { IClientDto } from "src/interfaces/models";

interface IFormClient {
  MainDiv: () => JSX.Element;
  setUser: Dispatch<SetStateAction<string>>;
  setIdExcluir: Dispatch<SetStateAction<string>>;
  edit: boolean;
}

export const FormUpdateClient = ({ MainDiv, setUser, setIdExcluir, edit }: IFormClient) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetIdUser(id || "");
  const { mutate, isPending, context } = useUpdateClient(id || "");
  const {
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = context;
  const onSubmit = (data: IClientDto) => {
    mutate(data);
  };

  const [valueRG, setValueRG] = useState(data?.rg);
  const [valueCPF, setValueCPF] = useState(data?.cpf);
  const [valueCEP, setValueCEP] = useState(data?.cep);
  const [valueState, setValueState] = useState(data?.estado);
  const [valuePhone, setValuePhone] = useState(data?.telefone);
  const [valueCurrency, setValueCurrency] = useState(data?.totalRendaFamiliar);
  const [valueRGConjuge, setValueRGConjuge] = useState(data?.rgConjuge);
  const [valueCPFConjuge, setValueCPFConjuge] = useState(data?.cpf);
  const [valuePhoneConjuge, setValuePhoneConjuge] = useState(data?.telefoneConjuge);

  const [valueStreet, setValueStreet] = useState(data?.rua);
  const [valueBairro, setValueBairro] = useState(data?.bairro);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [maritalStatus, setMaritalStatus] = useState(data?.estadoCivil);

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
        setValue("status", data.status || false);
      }
    }
  };

  const handleMaritalStatusChange = (e: { target: { value: string } }) => {
    setMaritalStatus(e.target.value);
  };

  const handleNameChange = () => {
    const name = watch("nome");
    const formattedName = name.split(" ")[0];
    setUser(formattedName);
  };

  useEffect(() => {
    if (data) {
      setValue("nome", data.nome || "");
      setValue("rg", data.rg || "");
      setValue("cpf", data.cpf || "");
      setValue("profissao", data.profissao || "");
      setValue("estadoCivil", data.estadoCivil || "");
      setValue("cep", formatCep(data.cep || ""));
      setValue("rua", data.rua || "");
      setValue("numero", data.numero || "");
      setValue("bairro", data.bairro || "");
      setValue("complemento", data.complemento || "");
      setValue("estado", formatState(data.estado || ""));
      setValue("telefone", formatPhone(data.telefone || ""));
      setValue("email", data.email || "");
      setValue("tiposDeContrato", data.tiposDeContrato || "");
      setValue("loteAtual", data.loteAtual || "");
      setValue("loteNovo", data.loteNovo || "");
      setValue("quadraAtual", data.quadraAtual || "");
      setValue("quadraNova", data.quadraNova || "");
      setValue("totalRendaFamiliar", data.totalRendaFamiliar || "");

      if (["Casado", "União Estável"].includes(data.estadoCivil)) {
        setValue("nomeConjuge", data.nomeConjuge || "");
        setValue("rgConjuge", data.rgConjuge || "");
        setValue("cpfConjuge", data.cpfConjuge || "");
        setValue("profissaoConjuge", data.profissaoConjuge || "");
        setValue("telefoneConjuge", formatPhone(data.telefoneConjuge || ""));
        setValue("emailConjuge", data.emailConjuge || "");
      }
      setIdExcluir(data.id);
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
              onChange={handleNameChange}
              disabled={!edit}
              required
            />
            <InputX
              title="RG"
              placeholder="XX.XXX.XXX-X"
              onChange={handleRGFormat}
              value={valueRG}
              disabled={!edit}
              required
            />
            <InputX
              title="CPF"
              placeholder="XXX.XXX.XXX-XX"
              onChange={handleCPFFormat}
              value={valueCPF}
              disabled={!edit}
              required
            />
            <Select
              title="Status"
              options={["Ativado", "Desativado"]}
              value={data && data.status ? "Ativado" : "Desativado"}
              disabled={!edit}
              required
            />
          </div>
          <div className="container-user">
            <InputX title="Profissão" placeholder="Carpinteiro" disabled={!edit} required />
            <Select
              title="Estado Civil"
              placeholder="Solteiro"
              options={["Solteiro", "Casado", "União Estável", "Separado", "Divorciado", "Viúvo"]}
              onChange={handleMaritalStatusChange}
              value={maritalStatus}
              disabled={!edit}
              required
            />
            <InputX
              title="CEP"
              placeholder="XX.XXX-XXX"
              onChange={handleCepChange}
              value={valueCEP}
              disabled={!edit}
              required
            />
          </div>
          <div className="container-user">
            <InputX
              title="Rua"
              placeholder="Rua Salvador"
              value={valueStreet}
              onChange={(e) => setValueStreet(e.target.value)}
              disabled={!edit}
              required
            />
            <div className="md:w-1/2">
              <InputX title="Número" placeholder="100" disabled={!edit} required />
            </div>
            <InputX
              title="Bairro"
              placeholder="Jardim Colinas"
              value={valueBairro}
              onChange={(e) => setValueBairro(e.target.value)}
              disabled={!edit}
              required
            />
            <div className="md:w-1/8">
              <InputX title="Complemento" placeholder="BL 8 apto 805" disabled={!edit} />
            </div>
            <div className="md:w-1/2">
              <InputX
                title="Estado"
                placeholder="SP"
                value={valueState}
                onChange={handleStateFormat}
                disabled={!edit}
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
              disabled={!edit}
              required
            />
            <InputX title="E-mail" placeholder="adoleta@hotmail.com.br" disabled={!edit} required />
            <Select
              title="Tipos de Contrato"
              placeholder="Procuração"
              options={["Procuração", "Contrato", "Requerimento Reurb", "Memorando"]}
              value={data?.tiposDeContrato}
              disabled={!edit}
              required
            />
          </div>
          <div className="container-user">
            <InputX title="Lote Atual" placeholder="15" required disabled={!edit} />
            <InputX title="Lote Novo" placeholder="17" required disabled={!edit} />
            <InputX title="Quadra Atual" placeholder="A" required disabled={!edit} />
            <InputX title="Quadra Nova" placeholder="B" required disabled={!edit} />
          </div>
          <ModalUserProjects isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
          <Button
            disabled={!edit}
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            adicionar projeto
          </Button>
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
              disabled={!edit}
              required
            />
            <Button disabled={!edit}>anexar documentos</Button>
          </div>
          <div className="container-user flex-wrap items-end">
            <div className="flex items-center gap-2 text-write-secundary">
              <span>Nome do arquivo</span>
              <Files width={22} height={22} weight="duotone" />
              <X width={12} height={12} weight="bold" className="cursor-pointer" />
            </div>
          </div>
          {["Casado", "União Estável"].includes(data?.estadoCivil) && (
            <>
              <p className="w-full text-start font-bold text-write-primary">Cônjuge</p>
              <div className="container-user">
                <InputX
                  title="Nome Cônjuge"
                  placeholder="Renata Siqueira"
                  value={data?.nomeConjuge}
                  disabled={!edit}
                  required
                />
                <InputX
                  title="RG Cônjuge"
                  placeholder="XX.XXX.XXX-X"
                  onChange={handleRGConjugeFormat}
                  value={valueRGConjuge}
                  disabled={!edit}
                  required
                />
                <InputX
                  title="CPF Cônjuge"
                  placeholder="XXX.XXX.XXX-XX"
                  onChange={handleCPFConjugeFormat}
                  value={valueCPFConjuge}
                  disabled={!edit}
                  required
                />
                <InputX
                  title="Profissão Cônjuge"
                  placeholder="Carpinteiro"
                  value={data?.profissaoConjuge}
                  disabled={!edit}
                  required
                />
              </div>
              <div className="container-user">
                <InputX
                  title="Telefone Cônjuge"
                  placeholder="(12) 98243-5638"
                  onChange={handlePhoneConjugeFormat}
                  value={valuePhoneConjuge}
                  disabled={!edit}
                  required
                />
                <InputX
                  title="E-mail Cônjuge"
                  placeholder="adoleta@hotmail.com.br"
                  value={data?.emailConjuge}
                  disabled={!edit}
                  required
                />
              </div>
            </>
          )}
          <div className="container-user md:justify-between">
            <Button disabled={isPending || Object.keys(errors).length > 0 || !edit}>
              {!isPending ? "salvar" : "loading..."}
            </Button>
            <Button onClick={() => navigate(app.management)}>Voltar</Button>
          </div>
          <Button disabled={!edit}>gerar documento</Button>
        </CardContainer>
      </FormX>
    </FormProvider>
  );
};
