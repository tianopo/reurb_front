export const apiRoute = {
  /* Authentication */
  signin: "/auth/signin",
  signup: "/auth/signup",
  logout: (token: string) => `/auth/logout/${token}`,
  token: (token: string) => `/user/${token}`,

  /* E-mail */
  receiveMembership: "/send/receive-membership",
  sendMembership: `/send/send-membership`,
  forgotPassword: `/send/forgot-password`,
  checkToken: (token: string) => `/send/${token}`,

  /* User */
  user: "/user", // get
  client: "/user/client",
  employee: "/user/employee",
  recoverPassword: "/user/recover-password",
  idUser: (id: string) => `/user/${id}`,
  idClient: (id: string) => `/user/client/${id}`, // delete and update
  idEmployee: (id: string) => `/user/employee/${id}`,

  /* Task */
  task: "/task",
  idTask: (id: string) => `/task/${id}`,
};
