import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
// fechar sidebar
export const Layout = () => {
  const { t: tradutor } = useTranslation();
  const t = (t: string) => tradutor(`layout.${t}`);

  const nav = [
    { text: t("inicio"), route: "#" },
    { text: "informações", route: "#informacoes" },
    { text: "agendamento", route: "#agendamento" },
    { text: t("contato"), route: "#contato" },
  ];

  const icones = [
    { image: "/sociais/whatsapp.png", route: "https://wa.me/5512982435638" },
    { image: "/sociais/github.png", route: "https://github.com/tianopo" },
    { image: "/sociais/linkedin.png", route: "https://www.linkedin.com/in/matheustianopo/" },
  ];

  return (
    <div className={`home-claro`}>
      <Header image="/projeto/logo.svg" navbar={nav} title="Fábrica de Software" />
      <Outlet />
      <Footer title="Matheus Henrique de Abreu" description={t("description")} icons={icones} />
    </div>
  );
};
