import { createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX/LayoutX";
import { PublicLayout } from "src/components/Layout/PublicLayout/PublicLayout";
import { Auth } from "src/pages/Auth/Auth.views";
import { Perfil } from "src/pages/Perfil/Perfil.views";
import { app } from "./app";
import { AuthenticatedRoute } from "./context/AuthenticatedRoute";
import { PublicRoute } from "./context/PublicRoute";

export const browserRouter = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: app.auth, element: <Auth /> },
          { path: "*", element: <Auth /> },
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
