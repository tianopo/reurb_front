import { createBrowserRouter } from "react-router-dom";
import { Layout } from "src/components/Layout/Layout";
import { Home } from "src/pages/Home/Home.views";
import { Auth } from "src/pages/Auth.views";

export const browserRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/", element: <Auth /> },
      { path: "*", element: <Auth /> },
    ],
  },
]);
