import { Sidebar, X } from "@phosphor-icons/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();

  return (
    <>
      <FlexCol
        className={`
        ${openMenu ? "hidden" : ""}
        fixed
        top-0
        z-20
        h-full
        w-12
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
          <Sidebar
            className={`h-7 w-7 rounded-6 border-2 border-slate-300 text-slate-300 hover:bg-slate-600`}
          />
        </button>
      </FlexCol>
      <FlexCol
        className={`
      ${openMenu ? "flex w-full md:flex" : "hidden"}
      fixed
      left-0
      top-0
      z-20
      h-full
      items-center
      gap-3
      rounded-r-6
      border-1
      bg-primaria-light
      p-4
      md:fixed
      md:w-40
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
            navbar.map(({ text, route, Icon }, key) => (
              <FlexRow key={key} className="items-center">
                <span className="text-white">{Icon}</span>
                <a href={route} onClick={openMenu ? () => setOpenMenu(!openMenu) : undefined}>
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
              </FlexRow>
            ))}
        </FlexCol>
        {exit && (
          <FlexCol className="h-full w-full justify-end gap-3">
            <Divider />
            <FlexRow className="justify-between">
              {exit && (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                    toast.success("You exited successfully");
                  }}
                  className={`
                  flex
                  cursor-pointer
                  flex-row
                  items-center
                  gap-1
                  rounded-6
                  text-center
                  font-bold
                  text-white
                  hover:translate-y-1`}
                >
                  <p>EXIT</p>
                  <SignOut size={24} />
                </button>
              )}
            </FlexRow>
          </FlexCol>
        )}
      </FlexCol>
      <div className={`position block ${openMenu ? "md:mr-40" : "mr-12"} bg-black`}></div>
    </>
  );
};
