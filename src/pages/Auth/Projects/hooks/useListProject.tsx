import { useQuery } from "@tanstack/react-query";
import { api } from "src/config/api";
import { apiRoute } from "src/routes/api";

export const useListProject = () => {
  const path = async () => {
    const result = await api().get(apiRoute.project);
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["project-data"],
    queryFn: path,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
};
