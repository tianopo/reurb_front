import { ArrowRight, List, X } from "@phosphor-icons/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useLogout } from "src/hooks/API/auth/useLogout";
import { FlexCol } from "../Flex/FlexCol";
import { FlexRow } from "../Flex/FlexRow";
import { Divider } from "../Other/Divider/Divider";

interface INavbar {
  Icon?: JSX.Element;
  text: string;
  route: string;
}

interface ISidebarX {
  image?: string;
  title?: string;
  navbar?: INavbar[];
  exit?: boolean;
}

export const SidebarX = ({ image, title, navbar, exit }: ISidebarX) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { mutate } = useLogout();

  return <div></div>;
};
