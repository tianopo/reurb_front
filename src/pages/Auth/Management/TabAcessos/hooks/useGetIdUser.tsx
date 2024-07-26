import { useQuery } from "@tanstack/react-query";
import { api } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useGetIdUser = (id: string) => {
  const path = async () => {
    const result = await api().get(apiRoute.idUser(id));
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-data", id],
    queryFn: path,
  });

  return { data, error, isLoading };
};
