import { HouseLine } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import { Flex } from "../Flex/Flex";
import { FlexCol } from "../Flex/FlexCol";
import { Header } from "./Header";
import { SidebarX } from "./SidebarX";

export const LayoutX = () => {
  const nav = [{ text: "Home", route: "/home", Icon: <HouseLine /> }];

  return (
    <div className={`home-light`}>
      <Flex>
        <SidebarX image="/projeto/logo.svg" navbar={nav} title="Fábrica de Software" exit />
        <FlexCol className="w-full">
          <Header title="Olá" />
          <Outlet />
        </FlexCol>
      </Flex>
    </div>
  );
};
