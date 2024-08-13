import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "src/config/api";
import { apiRoute } from "src/routes/api";
import { Role } from "src/routes/context/AccessControl";

export const useGetClientsAndEmployees = () => {
  const user = queryClient.getQueryData<any[]>(["user-data"]);
  const path = async () => {
    const result = await api().get(apiRoute.clientAndEmployees);
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: user ? ["user-data"] : ["client-employee-data"],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.filter((user: any) => [Role.Funcionario, Role.Cliente].includes(user.acesso));
    },
  });

  return { data, error, isLoading };
};
