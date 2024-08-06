import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";

export const useDelTask = (id: string, onClose: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Tarefa excluida com sucesso");
      queryClient.refetchQueries({ queryKey: ["task-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  async function path(): Promise<void> {
    const result = await api().delete(apiRoute.idTask(id));
    return result.data;
  }

  return { mutate, isPending };
};
