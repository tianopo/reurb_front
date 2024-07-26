import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";
import { EstadoCivil, TipoDeContrato } from "./interfaces";

export interface ICreateClientDto {
  nome: string;
  email: string;
  tiposDeContrato: TipoDeContrato;
  cpf: string;
  profissao: string;
  telefone: string;
  rg: string;
  estadoCivil: EstadoCivil;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
  estado: string;
  loteAtual: string;
  loteNovo: string;
  quadraAtual: string;
  quadraNova: string;
  totalRendaFamiliar: string;
  nomeConjuge?: string;
  rgConjuge?: string;
  cpfConjuge?: string;
  profissaoConjuge?: string;
  telefoneConjuge?: string;
  emailConjuge?: string;
}

export const useCreateClient = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Cliente criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      navigate(app.management);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).max(255).label("Nome"),
    email: Yup.string().required().email().max(255).label("E-mail"),
    tiposDeContrato: Yup.string()
      .required()
      .oneOf(["Procuração", "Contrato", "Requerimento Reurb", "Memorando"])
      .max(20)
      .label("Tipos de Contrato"),
    cpf: Yup.string().required().matches(Regex.cpf_mask, "CPF inválido").label("CPF"),
    profissao: Yup.string().required().max(100).label("Profissão"),
    telefone: Yup.string().required().label("Telefone"),
    rg: Yup.string().required().matches(Regex.rg_mask, "RG inválido").label("RG"),
    estadoCivil: Yup.string()
      .required()
      .oneOf(["Solteiro", "Casado", "União Estável", "Separado", "Divorciado", "Viúvo"])
      .max(25)
      .label("Estado Civil"),
    cep: Yup.string().required().matches(Regex.cep_mask, "CEP inválido").label("CEP"),
    rua: Yup.string().required().max(255).label("Rua"),
    numero: Yup.string().required().max(25).label("Número"),
    bairro: Yup.string().required().max(100).label("Bairro"),
    complemento: Yup.string().optional().max(100).label("Complemento"),
    estado: Yup.string().required().label("Estado"),
    loteAtual: Yup.string().required().max(50).label("Lote Atual"),
    loteNovo: Yup.string().required().max(50).label("Lote Novo"),
    quadraAtual: Yup.string().required().max(50).label("Quadra Atual"),
    quadraNova: Yup.string().required().max(50).label("Quadra Nova"),
    totalRendaFamiliar: Yup.string().required().max(50).label("Total Renda Familiar"),
    nomeConjuge: Yup.string()
      .max(255)
      .optional()
      .when("estadoCivil", {
        is: (value: EstadoCivil) => ["Casado", "União Estável"].includes(value),
        then: (schema) => schema.required().label("Nome Cônjuge"),
        otherwise: (schema) => schema.optional().label("Nome Cônjuge"),
      }),
    rgConjuge: Yup.string()
      .optional()
      .when("estadoCivil", {
        is: (value: EstadoCivil) => ["Casado", "União Estável"].includes(value),
        then: (schema) =>
          schema.required().matches(Regex.rg_mask, "RG inválido").label("RG Cônjuge"),
        otherwise: (schema) => schema.optional().label("RG Cônjuge"),
      }),
    cpfConjuge: Yup.string()
      .optional()
      .when("estadoCivil", {
        is: (value: EstadoCivil) => ["Casado", "União Estável"].includes(value),
        then: (schema) =>
          schema.required().matches(Regex.cpf_mask, "CPF inválido").label("CPF Cônjuge"),
        otherwise: (schema) => schema.optional().label("CPF Cônjuge"),
      }),
    profissaoConjuge: Yup.string()
      .max(100)
      .optional()
      .when("estadoCivil", {
        is: (value: EstadoCivil) => ["Casado", "União Estável"].includes(value),
        then: (schema) => schema.required().label("Profissão Cônjuge"),
        otherwise: (schema) => schema.optional().label("Profissão Cônjuge"),
      }),
    telefoneConjuge: Yup.string()
      .optional()
      .when("estadoCivil", {
        is: (value: EstadoCivil) => ["Casado", "União Estável"].includes(value),
        then: (schema) => schema.required().label("Telefone Cônjuge"),
        otherwise: (schema) => schema.optional().label("Telefone Cônjuge"),
      }),
    emailConjuge: Yup.string()
      .max(255)
      .optional()
      .email()
      .when("estadoCivil", {
        is: (value: EstadoCivil) => ["Casado", "União Estável"].includes(value),
        then: (schema) => schema.required().label("E-mail Cônjuge"),
        otherwise: (schema) => schema.optional().label("E-mail Cônjuge"),
      }),
  });

  const context = useForm<ICreateClientDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: Yup.InferType<typeof schema>): Promise<ICreateClientDto> {
    const result = await api().post(apiRoute.client, data);
    return result.data;
  }

  return { mutate, isPending, context };
};
