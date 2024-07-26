import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "src/hooks/utils/useTitle";

interface IPublicRouteContext {
  token: string | null;
}

const PublicRouteUserContext = createContext<IPublicRouteContext>({ token: null });

export const PublicRoute = () => {
  useTitle();

  return (
    <PublicRouteUserContext.Provider value={{ token: localStorage.getItem("token") }}>
      <Outlet />
    </PublicRouteUserContext.Provider>
  );
};
