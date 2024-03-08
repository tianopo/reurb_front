import { ReactNode } from "react";
import { LoadingToRedirect } from "src/components/Layout/isLoadingToRedirect";

interface IPrivateRoute {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const token = undefined;
  return token ? children : <LoadingToRedirect />;
};
