import { Layout } from "@phosphor-icons/react";
import { createBrowserRouter } from "react-router-dom";
import { Auth } from "src/pages/Auth/Auth.views";
import { Home } from "src/pages/Home/Home.views";
import { AutenticatedRoute } from "./AutenticatedRoute";

export const browserRouter = createBrowserRouter([
  {
    element: <AutenticatedRoute />,
    children: [
      {
        element: <Layout />,
        children: [{ path: "/home", element: <Home /> }],
      },
    ],
  },
  {
    element: "",
    children: [
      { path: "/", element: <Auth /> },
      { path: "*", element: <Auth /> },
    ],
  },
]);
