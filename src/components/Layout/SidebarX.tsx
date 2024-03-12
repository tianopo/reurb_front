import { Article, X } from "@phosphor-icons/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { ButtonChangeLanguage } from "../Buttons/ButtonChangeLanguage";
import { ButtonChangeTheme } from "../Buttons/ButtonChangeTheme";
import { FlexCol } from "../Flex/FlexCol";
import { FlexRow } from "../Flex/FlexRow";
import { Divider } from "../Other/Divider";

interface INavbar {
  text: string;
  route: string;
}

interface ISidebarX {
  image?: string;
  title?: string;
  navbar?: INavbar[];
  language?: boolean;
  themeColor?: boolean;
  exit?: boolean;
}

export const SidebarX = ({ image, title, navbar, language, themeColor, exit }: ISidebarX) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <FlexCol
        className={`
        fixed
        top-0
        z-20
        h-full
        w-10
        items-center
        gap-3
        rounded-r-6
        border-1
        bg-primaria-light
        p-2
        `}
      >
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className={`navbar_mobile_botao-light rounded-6 border-1`}
        >
          <Article className={`navbar_mobile_article-light h-7 w-7 font-bold`} />
        </button>
      </FlexCol>
      <FlexCol
        className={`
      ${openMenu ? "flex w-full" : "hidden"}
      sticky
      left-0
      top-0
      z-20
      h-screen
      items-center
      gap-3
      rounded-r-6
      border-1
      bg-primaria-light
      p-4
      md:sticky
      ${openMenu ? "md:flex" : "hidden"}
      md:w-1/3
      `}
      >
        <X
          className="h-40 w-10 cursor-pointer self-end text-white md:absolute md:right-0 md:h-5"
          onClick={() => setOpenMenu(!openMenu)}
        />
        {image && <img src={image} alt={title} className={`h-20 w-20`} />}
        {title && <h2 className="text-center text-2xl font-bold text-white">{title}</h2>}
        {(image || title) && <Divider />}
        <FlexCol className="w-full justify-start">
          {navbar &&
            navbar.map(({ text, route }, key) => (
              <a
                key={key}
                href={route}
                onClick={openMenu ? () => setOpenMenu(!openMenu) : undefined}
              >
                <p
                  className={`
                p-2
                text-16
                font-bold
                text-white
                hover:underline
                `}
                >
                  {text.toUpperCase()}
                </p>
              </a>
            ))}
        </FlexCol>
        {(themeColor || language || exit) && (
          <FlexCol className="h-full w-full justify-end gap-3">
            <Divider />
            <FlexRow className="justify-between">
              {exit && (
                <FlexRow
                  className={`
                sidebar_hover-light
                cursor-pointer
                gap-1
                rounded-6`}
                >
                  <p>Sair</p>
                  <SignOut size={24} />
                </FlexRow>
              )}
              {themeColor && <ButtonChangeTheme />}
              {language && <ButtonChangeLanguage menuBottom />}
            </FlexRow>
          </FlexCol>
        )}
      </FlexCol>
    </>
  );
};
