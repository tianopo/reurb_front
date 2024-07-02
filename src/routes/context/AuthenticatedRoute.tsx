import { createContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "src/hooks/API/auth/useToken";
import { useTitle } from "src/hooks/utils/useTitle";
import { app } from "../app";

interface IPrivateRouteContext {
  token: string | null;
}

const PrivateRouteUserContext = createContext<IPrivateRouteContext>({ token: null });

export const AuthenticatedRoute = () => {
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

  if (!data) {
    return <Navigate to={app.auth} />;
  }

  return (
    <PrivateRouteUserContext.Provider value={{ token }}>
      <Outlet />
    </PrivateRouteUserContext.Provider>
  );
};
