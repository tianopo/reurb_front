import { Sidebar } from "@phosphor-icons/react";
import { useState } from "react";
import { FlexRow } from "src/components/Flex/FlexRow";
import "./Header.css";

interface INavbar {
  text: string;
  route: string;
}

interface IHeader {
  image?: string;
  title?: string;
  navbar?: INavbar[];
}

export const Header = ({ image, title, navbar }: IHeader) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`
      header-light
      sticky
      top-0
      z-10
      flex
      h-20
      w-full
      flex-row
      justify-between
      rounded-b-6
      border-b-1
      p-3
      `}
      >
        <FlexRow className="gap-3">
          {image && (
            <img
              src={image}
              alt={title}
              className={`
              header_imagem-light
              h-12
              w-10
              rounded-20
              border-1
              p-0.5
          `}
            />
          )}
          {title && <h1 className="text-20 font-bold text-escrita-light">{title}</h1>}
        </FlexRow>
        {navbar && (
          <>
            <FlexRow className={`hidden gap-1 md:flex`}>
              {navbar.map(({ text, route }: INavbar, key: number) => (
                <a key={key} href={route}>
                  <p
                    className={`
                    p-2
                    text-16
                    font-bold
                    text-escrita-light
                    hover:underline
                    `}
                  >
                    {text.toUpperCase()}
                  </p>
                </a>
              ))}
            </FlexRow>

            <FlexRow className={`flex items-center justify-center px-4 md:hidden`}>
              <div className="relative inline-block w-auto pt-1 duration-300">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  onBlur={() =>
                    setTimeout(() => {
                      setMenuOpen(false);
                    }, 100)
                  }
                  className={`navbar_mobile_button-light rounded-6 border-1`}
                >
                  <Sidebar
                    className={`h-7 w-7 rounded-6 border-2 border-slate-300 text-escrita-light hover:bg-slate-600`}
                  />
                </button>
                {menuOpen && (
                  <div
                    className={`
                    menu_mobile-light
                    absolute
                    right-0
                    w-auto
                    rounded-6
                    border-1
                    duration-300
                    `}
                  >
                    {navbar.map(({ text, route }, key: number) => (
                      <a key={key} href={route}>
                        <p
                          className={`
                        p-2
                        text-16
                        font-bold
                        text-escrita-light
                        hover:underline
                        `}
                        >
                          {text.toUpperCase()}
                        </p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </FlexRow>
          </>
        )}
      </header>
    </>
  );
};
