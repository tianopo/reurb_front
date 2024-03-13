import { Navigate, createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX";
import { Auth } from "src/pages/Auth/Auth.views";
import { Home } from "src/pages/Home/Home.views";
import { AutenticatedRoute } from "./AutenticatedRoute";

const token = localStorage.getItem("token");

export const browserRouter = createBrowserRouter([
  { path: "/", element: token ? <Navigate to="/home" /> : <Auth /> },
  { path: "*", element: <Navigate to="/home" /> },
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
