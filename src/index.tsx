import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./languages/tradution";
import { browserRouter } from "./routes/rotasApp";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/api";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={browserRouter} />
    </QueryClientProvider>
  </React.StrictMode>,
);
