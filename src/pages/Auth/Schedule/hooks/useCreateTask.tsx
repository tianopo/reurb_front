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

type PrioridadeType = "Alta" | "Media" | "Baixa";
type StatusType = "à Fazer" | "Atrasados" | "Feitos";

export interface ITaskDto {
  descricao: string;
  data: string;
  prioridade: PrioridadeType;
  projeto: string;
  status: StatusType;
  funcionarios: string[];
}

export const useCreateTask = () => {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    descricao: Yup.string()
      .required()
      .min(1, "Descrição deve ter no mínimo 1 caractere")
      .max(250, "Descrição deve ter no máximo 250 caracteres")
      .label("Descrição"),
    data: Yup.string()
      .required("Data é obrigatória")
      .matches(Regex.date_hour, "Data inválida")
      .label("Data"),
    prioridade: Yup.string()
      .required()
      .oneOf(["Alta", "Media", "Baixa"], "Prioridade inválida")
      .label("Prioridade"),
    projeto: Yup.string().required().label("Projeto"),
    status: Yup.string()
      .required()
      .oneOf(["à Fazer", "Atrasados", "Feitos"], "Status inválido")
      .label("Status"),
    funcionarios: Yup.array()
      .of(Yup.string().required())
      .required()
      .min(1, "Pelo menos um ID de usuário é necessário")
      .label("Funcionários"),
  });

  const context = useForm<ITaskDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: ITaskDto): Promise<ITaskDto> {
    const result = await api().post(apiRoute.task, data);
    return result.data;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Tarefa criada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["task-data"] });
      navigate(app.management);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  return { mutate, isPending, context };
};
