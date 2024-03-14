import { createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX";
import { Auth } from "src/pages/Auth/Auth.views";
import { Perfil } from "src/pages/Perfil/Perfil.views";
import { AutenticatedRoute } from "./AutenticatedRoute";
import { PublicRoute } from "./PublicRoute";

export const browserRouter = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/", element: <Auth /> },
      { path: "*", element: <Auth /> },
    ],
  },
  {
    element: <AutenticatedRoute />,
    children: [
      {
        element: <LayoutX />,
        children: [{ path: "/perfil", element: <Perfil /> }],
      },
    ],
  },
]);
