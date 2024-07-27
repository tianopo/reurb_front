import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useGetIdUser = (id: string) => {
  const cachedData = queryClient.getQueryData<any[]>(["user-data"])?.find((user) => user.id === id);

  const path = async () => {
    const result = await api().get(apiRoute.idUser(id));
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-data", id],
    queryFn: path,
    initialData: cachedData,
    enabled: !cachedData,
  });

  return { data, error, isLoading };
};
