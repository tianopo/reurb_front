import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "src/config/api";
import { IUserDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";

export const useGetIdUser = (id: string) => {
  const cachedUser = queryClient
    .getQueryData<IUserDto[]>(["user-data"])
    ?.find((user) => user.id === id);

  const path = async () => {
    if (cachedUser) {
      return cachedUser;
    }
    const result = await api().get(apiRoute.idUser(id));
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-data", id],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
};
