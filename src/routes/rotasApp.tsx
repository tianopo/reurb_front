import { createBrowserRouter } from "react-router-dom";
import { Layout } from "src/components/Layout/Layout";
import { Home } from "src/pages/home/Home.pagina";

export const browserRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },

      { path: "*", element: <Home /> },
    ],
  },
]);
