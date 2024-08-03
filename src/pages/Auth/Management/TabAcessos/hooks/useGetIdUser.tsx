import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useGetIdUser = (id: string) => {
  const userId = queryClient.getQueryData<any[]>(["user-data"]);

  const path = async () => {
    const result = await api().get(apiRoute.idUser(id));
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: userId ? ["user-data"] : [],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.filter((user: any) => user.id === id);
    },
  });

  return { data, error, isLoading };
};
