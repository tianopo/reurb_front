import { ArrowRight, List, X } from "@phosphor-icons/react";
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
      {/* Sidebar Desktop Fechada */}
      <FlexCol
        className={`
        ${openMenu && "hidden"}
        fixed
        top-0
        z-20
        hidden
        h-full
        items-center
        gap-32
        border-1
        bg-white
        p-2
        md:flex
        md:w-12
        md:rounded-r-6
        `}
      >
        <button onClick={() => setOpenMenu(!openMenu)} className={`navbar_mobile_botao-light`}>
          <ArrowRight className={`h-7 w-7 text-escrita-light hover:bg-selecionado-light`} />
        </button>
        <FlexCol className="h-full justify-between">
          {navbar &&
            navbar.map(({ route, Icon }, key) => (
              <a
                href={route}
                key={key}
                className="flex h-7 w-full items-center justify-center rounded-6 hover:bg-selecionado-light"
              >
                <span className="text-escrita-light">{Icon}</span>
              </a>
            ))}
          <FlexCol className="gap-3">
            <Divider />
            {exit && (
              <button
                onClick={() => mutate()}
                className={`
                flex
                w-full
                cursor-pointer
                flex-row
                items-center
                gap-1
                rounded-6
                p-2
                text-center
                font-bold
                text-escrita-light
                hover:bg-selecionado-light
                `}
              >
                <SignOut />
              </button>
            )}
          </FlexCol>
        </FlexCol>
      </FlexCol>

      {/* Sidebar Mobile Fechada */}
      <FlexCol
        className={`
        ${!openMenu && "flex md:hidden"}
        fixed bottom-0 flex h-14 w-full items-center justify-center rounded-t-6 bg-white p-2 md:hidden
        `}
      >
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className={`navbar_mobile_botao-light rounded-6 border-1`}
        >
          <List
            className={`h-10 w-10 rounded-6 border-2 border-slate-300 text-escrita-light hover:bg-selecionado-light`}
          />
        </button>
      </FlexCol>

      {/* Sidebar Desktop e Mobile Aberta */}
      <FlexCol
        className={`
      ${openMenu ? "flex w-full" : "hidden"}
      md:rounded-t-0 fixed left-0 top-0 z-20 h-full items-center gap-3 rounded-t-6 border-1 bg-white p-4 md:fixed md:w-40 md:rounded-r-6
      `}
      >
        <X
          className="h-40 w-10 cursor-pointer self-end text-escrita-light md:absolute md:right-0 md:h-5"
          onClick={() => setOpenMenu(!openMenu)}
        />
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
                <FlexRow className="items-center rounded-6 px-1 hover:bg-selecionado-light">
                  <span className="text-escrita-light">{Icon}</span>
                  <p className={` p-2 text-16 font-bold text-escrita-light`}>
                    {text.toUpperCase()}
                  </p>
                </FlexRow>
              </a>
            ))}
        </FlexCol>
        {exit && (
          <FlexCol className="h-full w-full justify-end gap-3">
            <Divider />
            <FlexRow className="justify-between">
              {exit && (
                <button
                  onClick={() => mutate()}
                  className={` flex w-full cursor-pointer flex-row items-center gap-1 rounded-6 p-2 text-center text-16 font-bold text-escrita-light hover:bg-selecionado-light `}
                >
                  <p>EXIT</p>
                  <SignOut size={24} />
                </button>
              )}
            </FlexRow>
          </FlexCol>
        )}
      </FlexCol>
      <div className={`position block ${openMenu ? "md:mr-40" : "md:mr-12"} bg-black`}></div>
    </>
  );
};
