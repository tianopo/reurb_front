import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useGetClients = () => {
  const user = queryClient.getQueryData<any[]>(["user-data"]);
  const clientsAndEmployees = queryClient.getQueryData<any[]>(["client-employee-data"]);
  const path = async () => {
    const result = await api().get(apiRoute.clients);
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: user
      ? ["user-data"]
      : clientsAndEmployees
        ? ["client-employee-data"]
        : ["client-data"],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.filter((user: any) => user.acesso === "Cliente");
    },
  });

  return { data, error, isLoading };
};
