import { Sidebar, X } from "@phosphor-icons/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useLogout } from "src/hooks/API/auth/useLogout";
import { FlexCol } from "../Flex/FlexCol";
import { FlexRow } from "../Flex/FlexRow";
import { Divider } from "../Other/Divider";

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

  return (
    <>
      <FlexCol
        className={`
        ${openMenu ? "hidden" : ""}
        sidebar-fixed
        `}
      >
        <button onClick={() => setOpenMenu(!openMenu)} className={`sidebar-button`}>
          <Sidebar className={`sidebar-icon`} />
        </button>
        <FlexCol className="sidebar-flex-full-height">
          {navbar &&
            navbar.map(({ route, Icon }, key) => (
              <a href={route} key={key} className="sidebar-navbar-item">
                <span className="text-escrita-light">{Icon}</span>
              </a>
            ))}
          <FlexCol className="sidebar-divider-container">
            <Divider />
            {exit && (
              <button onClick={() => mutate()} className={`sidebar-exit-button`}>
                <SignOut />
              </button>
            )}
          </FlexCol>
        </FlexCol>
      </FlexCol>
      <FlexCol
        className={`
      ${openMenu ? "sidebar-full-screen-menu" : "hidden"}
      `}
      >
        <X className="sidebar-icon-large" onClick={() => setOpenMenu(!openMenu)} />
        {image && <img src={image} alt={title} className={`h-20 w-20`} />}
        {title && <h2 className="text-center text-2xl font-bold text-escrita-light">{title}</h2>}
        {(image || title) && <Divider />}
        <FlexCol className="w-full justify-start">
          {navbar &&
            navbar.map(({ text, route, Icon }, key) => (
              <a
                href={route}
                onClick={openMenu ? () => setOpenMenu(!openMenu) : undefined}
                key={key}
              >
                <FlexRow className="sidebar-flex-row-items">
                  <span className="text-escrita-light">{Icon}</span>
                  <p className={`sidebar-text-large`}>{text.toUpperCase()}</p>
                </FlexRow>
              </a>
            ))}
        </FlexCol>
        {exit && (
          <FlexCol className="sidebar-exit-container">
            <Divider />
            <FlexRow className="sidebar-exit-row">
              {exit && (
                <button onClick={() => mutate()} className={`sidebar-exit-button`}>
                  <p>EXIT</p>
                  <SignOut size={24} />
                </button>
              )}
            </FlexRow>
          </FlexCol>
        )}
      </FlexCol>
      <div className={`sidebar-margin-right ${openMenu ? "md:mr-40" : "mr-12"}`}></div>
    </>
  );
};
