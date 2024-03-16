import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "src/config/api";
import { responseError } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";

export const useToken = ({ token }: { token: string }) => {
  async function path(): Promise<string> {
    const result = await api().get(apiRoute.token(token));
    return result.data;
  }

  const { data } = useQuery({
    enabled: !!token,
    queryKey: ["token-data", token],
    queryFn: path,
    throwOnError: (error: AxiosError) => {
      responseError(error);
      return false;
    },
  });

  return { data };
};
