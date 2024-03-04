import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
// fechar sidebar
export const Layout = () => {

  const nav = [
    { text: "Inicio", route: "#" },
    { text: "informações", route: "#informacoes" },
    { text: "agendamento", route: "#agendamento" },
    { text: "Contato", route: "#contato" },
  ];

  const icones = [
    { image: "/sociais/whatsapp.png", route: "https://wa.me/5512982435638" },
    { image: "/sociais/github.png", route: "https://github.com/tianopo" },
    { image: "/sociais/linkedin.png", route: "https://www.linkedin.com/in/matheustianopo/" },
  ];

  return (
    <div className={`home-light`}>
      <Header image="/projeto/logo.svg" navbar={nav} title="Fábrica de Software" />
      <Outlet />
      <Footer title="Matheus Henrique de Abreu" description={"descrição"} icons={icones} />
    </div>
  );
};
