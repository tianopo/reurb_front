import axios from "axios";

const ip = process.env.BACK_HOST;
const port = process.env.BACK_PORT;
const path = process.env.BACK_PATH;

export const api = () =>
  axios.create({
    baseURL: `${ip}${port}${path}`,
    timeout: 1000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
