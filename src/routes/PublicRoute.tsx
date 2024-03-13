import { createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IPublicRouteContext {
  token: string | null;
}

const PublicRouteUserContext = createContext<IPublicRouteContext>({ token: null });

export const PublicRoute = () => {
  const token = localStorage.getItem("token");

  return !token ? (
    <PublicRouteUserContext.Provider value={{ token }}>
      <Outlet />
    </PublicRouteUserContext.Provider>
  ) : (
    <Navigate to="/home" />
  );
};
