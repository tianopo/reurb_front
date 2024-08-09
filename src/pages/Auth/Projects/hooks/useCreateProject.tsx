import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IProjectDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";
import Yup from "src/utils/yupValidation";

export const useCreateProject = (onClose: () => void) => {
  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).max(100).label("Nome"),
    descricao: Yup.string().required().min(1).max(250).label("Descrição"),
    valorTotal: Yup.string().required().label("Valor Total"),
    valorAcumulado: Yup.string().required().label("Valor Acumulado"),
    funcionarios: Yup.array().of(Yup.string().required()).optional().min(1).label("Funcionários"),
    clientes: Yup.array().of(Yup.string().required()).optional().min(1).label("Clientes"),
    contribuicoes: Yup.array()
      .of(
        Yup.object().shape({
          userId: Yup.string().required().label("ID do Usuário"),
          valor: Yup.string().required().label("Valor da Contribuição"),
        }),
      )
      .required()
      .min(1)
      .label("Contribuições"),
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
