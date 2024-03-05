import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./languages/tradution";
import { browserRouter } from "./routes/rotasApp";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={browserRouter} />
  </React.StrictMode>,
);
