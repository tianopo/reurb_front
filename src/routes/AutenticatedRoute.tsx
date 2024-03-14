import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { LoadingToRedirect } from "src/components/Layout/isLoadingToRedirect";
import { useTitle } from "src/hooks/utils/useTitle";

interface IPrivateRouteContext {
  token: string | null;
}

const PrivateRouteUserContext = createContext<IPrivateRouteContext>({ token: null });

export const AutenticatedRoute = () => {
  useTitle();
  const token = localStorage.getItem("token");

  return token ? (
    <PrivateRouteUserContext.Provider value={{ token }}>
      <Outlet />
    </PrivateRouteUserContext.Provider>
  ) : (
    <LoadingToRedirect />
  );
};
