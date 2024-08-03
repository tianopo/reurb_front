import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useGetEmployees = () => {
  const user = queryClient.getQueryData<any[]>(["user-data"]);
  const path = async () => {
    const result = await api().get(apiRoute.employees);
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: user ? ["user-data"] : ["employee-data"],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.filter((user: any) => user.acesso === "Funcionário");
    },
  });

  return { data, error, isLoading };
};
