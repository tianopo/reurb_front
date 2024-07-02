import { createContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "src/hooks/API/auth/useToken";
import { useTitle } from "src/hooks/utils/useTitle";
import { app } from "../app";

interface IPublicRouteContext {
  token: string | null;
}

const PublicRouteUserContext = createContext<IPublicRouteContext>({ token: null });

export const PublicRoute = () => {
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

  if (data) {
    return <Navigate to={app.perfil} />;
  }

  return (
    <PublicRouteUserContext.Provider value={{ token }}>
      <Outlet />
    </PublicRouteUserContext.Provider>
  );
};
