import { Outlet } from "react-router-dom";
import { Flex } from "../Flex/Flex";
import { Footer } from "./Footer";
import { SidebarX } from "./SidebarX";

export const LayoutX = () => {
  const nav = [
    { text: "Inicio", route: "#" },
    { text: "informações", route: "#informacoes" },
    { text: "agendamento", route: "#agendamento" },
    { text: "Contato", route: "#contato" },
  ];

  return (
    <div className={`home-light`}>
      <Flex className="w-full">
        <SidebarX image="/projeto/logo.svg" navbar={nav} title="Fábrica de Software" exit />
        <Outlet />
      </Flex>
      <Footer />
    </div>
  );
};
