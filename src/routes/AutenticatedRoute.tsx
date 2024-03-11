import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { LoadingToRedirect } from "src/components/Layout/isLoadingToRedirect";

interface IPrivateRouteContext {
  token: string | null;
}

const PrivateRouteUserContext = createContext<IPrivateRouteContext>({ token: null });

export const AutenticatedRoute = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <PrivateRouteUserContext.Provider value={{ token }}>
      <Outlet />
    </PrivateRouteUserContext.Provider>
  ) : (
    <LoadingToRedirect />
  );
};
