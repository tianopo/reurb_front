export const apiRoute = {
  signin: "/signin",
  signup: "/signup",
  logout: (token: string) => `logout/${token}`,
  token: (token: string) => `/user/${token}`,
};
