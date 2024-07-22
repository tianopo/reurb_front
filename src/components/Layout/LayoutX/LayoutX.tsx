import { HouseLine } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import { app } from "src/routes/app";
import { Header } from "../Header/Header";
import { SidebarX } from "../SidebarX";

export const LayoutX = () => {
  const nav = [{ text: "Perfil", route: app.perfil, Icon: <HouseLine /> }];

  return (
    <div className="flex w-full flex-col">
      <Header title="Olá" />
      <div className="w-full">
        <SidebarX image="/projeto/logo.svg" navbar={nav} title="Software" exit />
        <div className="flex w-full flex-col gap-2 bg-gradient p-6 md:gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
