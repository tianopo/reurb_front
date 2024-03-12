import { createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX";
import { Auth } from "src/pages/Auth/Auth.views";
import { Home } from "src/pages/Home/Home.views";
import { AutenticatedRoute } from "./AutenticatedRoute";

export const browserRouter = createBrowserRouter([
  { path: "/", element: <Auth /> },
  { path: "*", element: <Auth /> },
  {
    element: <AutenticatedRoute />,
    children: [
      {
        element: <LayoutX />,
        children: [{ path: "/home", element: <Home /> }],
      },
    ],
  },
]);
