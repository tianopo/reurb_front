import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { ITaskUpdateDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export const useUpdateTask = (id: string, onClose: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ITaskUpdateDto) => path(id, data),
    onSuccess: () => {
      responseSuccess("Tarefa atualizada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["task-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    descricao: Yup.string().required().min(1).max(250).label("Descrição"),
    data: Yup.string()
      .required()
      .matches(Regex.date_hour, "Formato: DD/MM/YY HH:MM, apenas números")
      .label("Data"),
    prioridade: Yup.string()
      .required()
      .oneOf(["Alta", "Media", "Baixa"], "Prioridade inválida")
      .label("Prioridade"),
    status: Yup.string()
      .required()
      .oneOf(["à Fazer", "Atrasados", "Feitos"], "Status inválido")
      .label("Status"),
    funcionarios: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          nome: Yup.string().required(),
          email: Yup.string().required().email(),
        }),
      )
      .optional()
      .label("Funcionários"),
  });

  const context = useForm<ITaskUpdateDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(id: string, data: Yup.InferType<typeof schema>): Promise<ITaskUpdateDto> {
    const result = await api().put(apiRoute.idTask(id), data);
    return result.data;
  }

  return { mutate, isPending, context };
};
