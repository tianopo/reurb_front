import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";

export const useListUser = () => {
  const navigate = useNavigate();

  const path = async () => {
    const result = await api().get(apiRoute.user);
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-data"],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Cliente criado com sucesso");
      navigate(app.management);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  return { data, error, isLoading, mutate, isPending };
};
