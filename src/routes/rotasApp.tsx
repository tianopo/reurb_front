import { createBrowserRouter } from "react-router-dom";
import { Layout } from "src/componentes";
import { Inicio } from "src/paginas/inicio/Inicio.pagina";

export const browserRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/inicio", element: <Inicio /> },

      { path: "*", element: <Inicio /> },
    ],
  },
]);
