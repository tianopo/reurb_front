export const apiRoute = {
  /* Authentication */
  signin: "/auth/signin",
  signup: "/auth/signup",
  logout: (token: string) => `/auth/logout/${token}`,
  token: (token: string) => `/user/${token}`,

  /* User */
  user: "user", // get
  client: "/user/client",
  employee: "/user/employee",
  idClient: (id: string) => `/user/client/${id}`, // delete and update
  idemployee: (id: string) => `/user/employee/${id}`,
};
