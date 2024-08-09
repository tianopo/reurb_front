import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";

export const useDelProject = (id: string, onClose: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Projeto excluido com sucesso");
      queryClient.refetchQueries({ queryKey: ["project-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  async function path(): Promise<void> {
    const result = await api().delete(apiRoute.idProject(id));
    return result.data;
  }

  return { mutate, isPending };
};
