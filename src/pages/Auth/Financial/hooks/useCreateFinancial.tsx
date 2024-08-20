import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IFinancialDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";
import Yup from "src/utils/yupValidation";

export const useCreateFinancial = (onClose: () => void) => {
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
    contributionId: Yup.string().optional(),
    clienteId: Yup.string().optional(),
  });

  const context = useForm<IFinancialDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: IFinancialDto): Promise<IFinancialDto> {
    const result = await api().post(apiRoute.financial, data);
    return result.data;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Financeiro criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["financial-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  return { mutate, isPending, context };
};
