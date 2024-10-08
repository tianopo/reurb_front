import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IProjectUpdateDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export const useUpdateProject = (id: string, onClose: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IProjectUpdateDto) => path(id, data),
    onSuccess: () => {
      responseSuccess("Projeto atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["project-data"] });
      queryClient.invalidateQueries({ queryKey: ["task-data"] });
      queryClient.invalidateQueries({ queryKey: ["financial-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).max(100).label("Nome"),
    descricao: Yup.string().required().min(1).max(250).label("Descrição"),
    dataInicio: Yup.string()
      .required()
      .matches(Regex["DD/MM/YYYY"], "Formato: DD/MM/YY, apenas números")
      .label("Data Inicio"),
    valorTotal: Yup.string().required().label("Valor Total"),
    valorAcumulado: Yup.string().required().label("Valor Acumulado"),
    status: Yup.string().oneOf(["Aberto", "Progresso", "Concluido"]).required(),
    funcionarios: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          nome: Yup.string().required(),
        }),
      )
      .optional()
      .label("Funcionário"),
    clientes: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          nome: Yup.string().required(),
        }),
      )
      .optional()
      .label("Cliente"),
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

  const context = useForm<IProjectUpdateDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(id: string, data: Yup.InferType<typeof schema>): Promise<IProjectUpdateDto> {
    const result = await api().put(apiRoute.idProject(id), data);
    return result.data;
  }

  return { mutate, isPending, context };
};
