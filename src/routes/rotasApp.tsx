import { createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX";
import { Auth } from "src/pages/Auth/Auth.views";
import { Perfil } from "src/pages/Perfil/Perfil.views";
import { app } from "./app";
import { AutenticatedRoute } from "./context/AutenticatedRoute";
import { PublicRoute } from "./context/PublicRoute";

export const browserRouter = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: app.auth, element: <Auth /> },
      { path: "*", element: <Auth /> },
    ],
  },
  {
    element: <AutenticatedRoute />,
    children: [
      {
        element: <LayoutX />,
        children: [{ path: app.perfil, element: <Perfil /> }],
      },
    ],
  },
]);
