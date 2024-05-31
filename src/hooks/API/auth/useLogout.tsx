import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, queryClient } from "src/config/api";
import { responseError } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";

export const useLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const { mutate } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.setQueryData(["token-data"], "");
      toast.success("You exited successfully");
      navigate(app.auth);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  async function path(): Promise<string> {
    const result = await api().post(apiRoute.logout(token));
    return result.data;
  }

  return { mutate };
};
