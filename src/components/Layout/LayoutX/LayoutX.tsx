import { Calendar, House, Money, ProjectorScreen } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import { app } from "src/routes/app";
import { Header } from "../Header/Header";
import { SidebarX } from "../Sidebar/SidebarX";

export const LayoutX = () => {
  const nav = [
    { text: "Início", route: app.inicio, icon: <House width={20} height={17} weight="fill" /> },
    {
      text: "Agenda",
      route: app.inicio,
      icon: <Calendar width={20} height={17} weight="duotone" />,
    },
    {
      text: "Projetos",
      route: app.inicio,
      icon: <ProjectorScreen width={20} height={17} weight="duotone" />,
    },
    { text: "Financeiro", route: app.inicio, icon: <Money width={20} height={17} weight="fill" /> },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <Header navbar={nav} />
      <div className="flex w-full">
        <SidebarX navbar={nav} />
        <div className="flex w-full flex-col gap-2 bg-gradient p-6 md:gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
