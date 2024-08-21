import { Calendar, House, Money, ProjectorScreen } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import { app } from "src/routes/app";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import { Header } from "../Header/Header";
import { SidebarX } from "../Sidebar/SidebarX";

export const LayoutX = () => {
  const { acesso } = useAccessControl();
  const nav = [
    { text: "Início", route: app.home, icon: <House width={20} height={17} weight="fill" /> },
    {
      text: "Projetos",
      route: app.projects,
      icon: <ProjectorScreen width={20} height={17} weight="duotone" />,
    },
    {
      text: "Agenda",
      route: app.schedule,
      icon: <Calendar width={20} height={17} weight="duotone" />,
    },
  ];

  if ([Role.Gestor, Role.Admin, null].includes(acesso)) {
    nav.push({
      text: "Financeiro",
      route: app.financial,
      icon: <Money width={20} height={17} weight="fill" />,
    });
  }

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
