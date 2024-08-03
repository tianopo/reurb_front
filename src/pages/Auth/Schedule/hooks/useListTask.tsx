import { useQuery } from "@tanstack/react-query";
import { api } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useListTask = () => {
  const path = async () => {
    const result = await api().get(apiRoute.task);
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["task-data"],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
};
