import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";

export const useDelUser = (id: string) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Usuário excluido com sucesso");
      queryClient.refetchQueries({ queryKey: ["user-data"] });
      navigate(app.management);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  async function path(): Promise<void> {
    const result = await api().delete(apiRoute.idUser(id));
    return result.data;
  }

  return { mutate, isPending };
};
