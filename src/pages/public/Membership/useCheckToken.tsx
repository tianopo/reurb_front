import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useCheckToken = () => {
  const { token } = useParams<{ token: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["token-membership-data"],
    queryFn: path,
    staleTime: 3600 * 1000,
    refetchOnWindowFocus: false,
  });

  async function path() {
    const result = await api().get(apiRoute.checkToken(token || ""));
    return result.data;
  }

  return { data, error, isLoading };
};
