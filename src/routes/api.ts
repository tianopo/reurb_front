export const apiRoute = {
  signin: "/signin",
  signup: "/signup",
  token: (token: string) => `/user/${token}`,
};
