import { createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX/LayoutX";
import { PublicLayout } from "src/components/Layout/PublicLayout/PublicLayout";
import { ForgotPassword } from "src/pages/ForgotPassword/forgotPassword.views";
import { Login } from "src/pages/Login/login.views";
import { Perfil } from "src/pages/Perfil/Perfil.views";
import { RecoverPassword } from "src/pages/RecoverPassword/recoverPassword.views";
import { app } from "./app";
import { AuthenticatedRoute } from "./context/AuthenticatedRoute";
import { PublicRoute } from "./context/PublicRoute";
import { Register } from "src/pages/Register/register.views";

export const browserRouter = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: app.login, element: <Login /> },
          { path: app.forgotPassword, element: <ForgotPassword /> },
          { path: app.recoverPassword, element: <RecoverPassword /> },
          { path: app.register, element: <Register /> },
          { path: "*", element: <Login /> },
        ],
      },
    ],
  },
  {
    element: <AuthenticatedRoute />,
    children: [
      {
        element: <LayoutX />,
        children: [{ path: app.perfil, element: <Perfil /> }],
      },
    ],
  },
]);
