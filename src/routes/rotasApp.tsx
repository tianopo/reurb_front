import { createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX";
import { Auth } from "src/pages/Auth/Auth.views";
import { Perfil } from "src/pages/Perfil/Perfil.views";
import { Teste } from "src/pages/Teste";
import { app } from "./app";
import { AuthenticatedRoute } from "./context/AuthenticatedRoute";
import { PublicRoute } from "./context/PublicRoute";

export const browserRouter = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: app.auth, element: <Auth /> },
      { path: "*", element: <Auth /> },
      { path: "/teste", element: <Teste /> },
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
