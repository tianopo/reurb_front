import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { LoadingToRedirect } from "src/components/Layout/isLoadingToRedirect";
import { useToken } from "src/hooks/API/auth/useToken";
import { useTitle } from "src/hooks/utils/useTitle";

interface IPrivateRouteContext {
  token: string | null;
}

const PrivateRouteUserContext = createContext<IPrivateRouteContext>({ token: null });

export const AutenticatedRoute = () => {
  useTitle();
  const token = localStorage.getItem("token") || "";
  const [dataFetched, setDataFetched] = useState(false);
  const { data, refetch } = useToken({ token });

  useEffect(() => {
    if (!dataFetched && token) {
      refetch();
      setDataFetched(true);
    }
  }, [dataFetched, token, refetch]);

  return data ? (
    <PrivateRouteUserContext.Provider value={{ token }}>
      <Outlet />
    </PrivateRouteUserContext.Provider>
  ) : (
    <LoadingToRedirect />
  );
};
