import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const ip = process.env.BACK_HOST;
const port = process.env.BACK_PORT;
const path = process.env.BACK_PATH;
const timeOut = 1000 * 30;
const authHeader = () => ({ authorization: `Bearer ${localStorage.getItem("token")}` });

export const auth = "auth";

export const fileBase = (fileUrl: string) => `${ip}${port}${path}/${fileUrl}`;

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 }, mutations: { retry: 0 } },
});

export const api = () =>
  axios.create({
    baseURL: `${ip}${port}${path}`,
    timeout: timeOut,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHeader(),
    },
  });

export const apiUpload = () =>
  axios.create({
    baseURL: `${ip}${port}${path}`,
    timeout: timeOut,
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
