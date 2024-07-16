import { HouseLine } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import { app } from "src/routes/app";
import "./Layout.css";
import { Flex } from "src/components/Flex/Flex";
import { SidebarX } from "../SidebarX";
import { FlexCol } from "src/components/Flex/FlexCol";
import { Header } from "../Header/Header";

export const LayoutX = () => {
  const nav = [{ text: "Perfil", route: app.perfil, Icon: <HouseLine /> }];

  return (
    <div className={`home-light`}>
      <Flex>
        <SidebarX image="/projeto/logo.svg" navbar={nav} title="Software" exit />
        <FlexCol className="w-full">
          <Header title="Olá" />
          <div className="h-screen w-full bg-slate-400">
            <Outlet />
          </div>
        </FlexCol>
      </Flex>
    </div>
  );
};
