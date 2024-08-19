import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IProjectDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export const useCreateProject = (onClose: () => void) => {
  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).max(100).label("Nome"),
    dataInicio: Yup.string()
      .required()
      .matches(Regex["DD/MM/YYYY"], "Formato: DD/MM/YYYY, data inválida")
      .label("Data Inicio"),
    descricao: Yup.string().required().min(1).max(250).label("Descrição"),
    valorTotal: Yup.string().required().label("Valor Total"),
    valorAcumulado: Yup.string().required().label("Valor Acumulado"),
    status: Yup.string().oneOf(["Aberto", "Progresso", "Concluido"]).required(),
    funcionarios: Yup.array().optional().label("Funcionários"),
    clientes: Yup.array().optional().label("Clientes"),
    contributions: Yup.array()
      .of(
        Yup.object().shape({
          valor: Yup.string().required().label("Valor"),
          entrada: Yup.string().required().label("Entrada"),
          parcelas: Yup.string().required().min(1).max(2).label("Parcelas"),
          valorParcela: Yup.string().required().label("Valor Parcela"),
          userId: Yup.string().required(),
        }),
      )
      .optional()
      .when("clientes", {
        is: (clientes: any[]) => clientes && clientes.length > 0,
        then: (schema) =>
          schema
            .min(
              Yup.ref("clientes.length"),
              "O número de contribuições deve ser igual ao número de clientes",
            )
            .max(
              Yup.ref("clientes.length"),
              "O número de contribuições deve ser igual ao número de clientes",
            )
            .required("Contributions são obrigatórios quando há clientes"),
        otherwise: (schema) => schema.optional(),
      }),
  });

  const context = useForm<IProjectDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: IProjectDto): Promise<IProjectDto> {
    const result = await api().post(apiRoute.project, data);
    return result.data;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Projeto criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["project-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  return { mutate, isPending, context };
};
