export const app = {
  // Before Login
  register: "/cadastro",
  login: "/login",
  forgotPassword: "/esqueceu-senha",
  recoverPassword: "/recuperar-senha",
  membership: "/formulario-adesao",

  // After Login
  auth: "/",
  home: "/inicio",
  schedule: "/agenda",
  projects: "/projetos",
  financial: "/financeiro",
  management: "/administracao",
  user: "/usuario",
  userUpdate: (id: string) => `/usuario/${id}`,
};
