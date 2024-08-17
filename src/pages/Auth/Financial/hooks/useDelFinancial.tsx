import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";

export const useDelFinancial = (id: string, onClose: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Financeiro excluido com sucesso");
      queryClient.refetchQueries({ queryKey: ["financial-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  async function path(): Promise<void> {
    const result = await api().delete(apiRoute.idFinancial(id));
    return result.data;
  }

  return { mutate, isPending };
};
