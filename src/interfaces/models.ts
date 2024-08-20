import { Role } from "src/routes/context/AccessControl";

export interface IGeneralModel {
  id?: string;
  createdIn?: Date;
  updated?: Date;
}

export interface IAuthModel extends IGeneralModel {
  email: string;
  token: string;
}

export type TipoDeContrato = "Procuração" | "Contrato" | "Requerimento Reurb" | "Memorando";
export type EstadoCivil =
  | "Solteiro"
  | "Casado"
  | "União Estável"
  | "Separado"
  | "Divorciado"
  | "Viúvo";
type StatusType = "Ativado" | "Desativado";

export interface IClientDto extends IGeneralModel {
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
  acesso?: Role;
  projetosCli?: Partial<Pick<IProjectDto, "id" | "nome">>[];
}

export interface IEmployeeDto extends IGeneralModel {
  nome: string;
  email: string;
  cpf: string;
  profissao: string;
  telefone: string;
  status?: StatusType;
  acesso?: Role;
}

export interface IUserDto extends IEmployeeDto, IClientDto {}

type PrioridadeType = "Alta" | "Media" | "Baixa";
type StatusTaskType = "à Fazer" | "Atrasados" | "Feitos";

export interface ITaskDto {
  descricao: string;
  data: string;
  prioridade: PrioridadeType;
  projetoId?: string;
  status: StatusTaskType;
  funcionarios?: string[];
}

export interface ITaskUpdateDto extends IGeneralModel {
  descricao: string;
  data: string;
  prioridade: PrioridadeType;
  projeto?: Partial<Pick<IProjectUpdateDto, "id" | "nome">>;
  status: StatusTaskType;
  funcionarios?: {
    id: string;
    nome: string;
    email: string;
  }[];
}

export interface IContributionDto {
  valor: string;
  entrada: string;
  parcelas: string;
  valorParcela: string;
  userId: string;
}

export type StatusProjectType = "Aberto" | "Progresso" | "Concluido";

export interface IUpdateProject {
  id: string;
  nome: string;
}

export interface IProjectDto extends IGeneralModel {
  nome: string;
  descricao: string;
  valorTotal: string;
  valorAcumulado: string;
  dataInicio: string;
  status: StatusProjectType;
  funcionarios?: string[];
  clientes?: string[];
  contributions?: IContributionDto[];
}

export interface IProjectUpdateDto extends IGeneralModel {
  nome: string;
  descricao: string;
  valorTotal: string;
  valorAcumulado: string;
  dataInicio: string;
  status: StatusProjectType;
  funcionarios?: IUpdateProject[];
  clientes?: IUpdateProject[];
  contributions?: IContributionDto[];
}

type TypeTipo = "Entrada" | "Saída";
type TypeFinancialStatus = "Lançamentos" | "Em processo" | "Concluidos";
type TypePagamento = "Crédito" | "Débito" | "Boleto" | "Dinheiro" | "Pix" | "Outros";
type TypeVencimento = "10" | "20" | "30";

interface IUpdateFinancial {
  id: string;
  nome: string;
}

export interface IFinancialDto extends IGeneralModel {
  nome: string;
  tipo: TypeTipo;
  valor: string;
  status: TypeFinancialStatus;
  pagamento: TypePagamento;
  vencimento: TypeVencimento;
  contributionId?: string;
  clienteId?: string;
}

export interface IFinancialUpdateDto extends IGeneralModel {
  nome: string;
  tipo: TypeTipo;
  valor: string;
  status: TypeFinancialStatus;
  pagamento: TypePagamento;
  vencimento: TypeVencimento;
  contribution?: IUpdateFinancial;
  cliente?: IUpdateFinancial;
}
