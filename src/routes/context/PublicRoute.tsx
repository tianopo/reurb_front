import { createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTitle } from "src/hooks/utils/useTitle";
import { app } from "../app";

interface IPublicRouteContext {
  token: string | null;
}

const PublicRouteUserContext = createContext<IPublicRouteContext>({ token: null });

export const PublicRoute = () => {
  useTitle();
  const token = localStorage.getItem("token");

  return !token ? (
    <PublicRouteUserContext.Provider value={{ token }}>
      <Outlet />
    </PublicRouteUserContext.Provider>
  ) : (
    <Navigate to={app.perfil} />
  );
};
