import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IFinancialUpdateDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";
import Yup from "src/utils/yupValidation";

export const useUpdateFinancial = (id: string, onClose: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IFinancialUpdateDto) => path(id, data),
    onSuccess: () => {
      responseSuccess("Financeiro atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["financial-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).max(100).label("Nome"),
    tipo: Yup.string().required().oneOf(["Entrada", "Saída"]).max(7).label("Tipo"),
    valor: Yup.string().required().min(1).max(100).label("Valor"),
    status: Yup.string()
      .required()
      .oneOf(["Lançamentos", "Em Processo", "Concluidos"])
      .label("Status"),
    pagamento: Yup.string()
      .required()
      .oneOf(["Crédito", "Débito", "Boleto", "Dinheiro", "Pix", "Outros"])
      .max(100)
      .label("Pagamento"),
    vencimento: Yup.string()
      .max(2)
      .test("vencimento-test", "Vencimento é obrigatório para Entradas", function (value) {
        const { tipo } = this.parent;
        if (tipo === "Entrada") {
          return value && ["10", "20", "30"].includes(value)
            ? true
            : this.createError({
                message: "Vencimento deve ser um dos valores permitidos: 10, 20, 30",
              });
        }
        return true;
      })
      .optional()
      .label("Vencimento"),
    contribution: Yup.object()
      .shape({
        id: Yup.string().required(),
        nome: Yup.string().required().label("Nome"),
      })
      .optional()
      .label("Contribution"),
    cliente: Yup.object()
      .shape({
        id: Yup.string().required(),
        nome: Yup.string().required().label("Nome"),
      })
      .optional()
      .label("Cliente"),
  });

  const context = useForm<IFinancialUpdateDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(
    id: string,
    data: Yup.InferType<typeof schema>,
  ): Promise<IFinancialUpdateDto> {
    const result = await api().put(apiRoute.idFinancial(id), data);
    return result.data;
  }

  return { mutate, isPending, context };
};
