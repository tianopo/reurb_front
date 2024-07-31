import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useCheckTokenRecover = () => {
  const { token } = useParams<{ token: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["token-recover-data"],
    queryFn: path,
    staleTime: 900 * 1000,
    refetchOnWindowFocus: false,
  });

  async function path() {
    const result = await api().get(apiRoute.checkToken(token || ""));
    return result.data;
  }

  return { data, error, isLoading };
};
