import { AxiosError } from "axios";
import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function responseError(err: AxiosError<any, any> | string) {
  let messageError;

  if (err instanceof AxiosError) messageError = err.response?.data ? err.response.data.error : "";
  else messageError = err;

  if (err instanceof AxiosError && err.code === "ERR_NETWORK")
    toast.error("Server has no response");
  else if (err instanceof AxiosError && err.code === "ECONNABORTED") toast.error("No reply!");
  else toast.error(messageError);
}

export const responseSuccess = (description: string) => toast.success(description);
