export type TipoDeContrato = "Procuração" | "Contrato" | "Requerimento Reurb" | "Memorando";
export type EstadoCivil =
  | "Solteiro"
  | "Casado"
  | "União Estável"
  | "Separado"
  | "Divorciado"
  | "Viúvo";
type StatusType = "Ativado" | "Desativado";

export interface IClientDto {
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
  status?: StatusType;
  nomeConjuge?: string;
  rgConjuge?: string;
  cpfConjuge?: string;
  profissaoConjuge?: string;
  telefoneConjuge?: string;
  emailConjuge?: string;
}

export interface IEmployeeDto {
  nome: string;
  email: string;
  cpf: string;
  profissao: string;
  telefone: string;
  status?: StatusType;
}
