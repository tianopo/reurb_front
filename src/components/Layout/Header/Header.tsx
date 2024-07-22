import { Bell, Gear, List, UserCheck } from "@phosphor-icons/react";
import { useState } from "react";
import { InputSearch } from "src/components/Form/Input/InputSearch";
import "../Sidebar/Sidebar.css";
import { SidebarX } from "../Sidebar/SidebarX";

interface INavbar {
  text: string;
  route: string;
}

interface IHeader {
  image?: string;
  title?: string;
  navbar: INavbar[];
}

export const Header = ({ image, title, navbar }: IHeader) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="sticky z-10 flex h-fit w-full items-center justify-between bg-white shadow-sm">
        <img src="logo/logo-icon.png" alt="icone da logo da Reurb" width={93} height={67.19} />
        <div className="w-fit">
          <InputSearch title="pesquisar" placeholder="Pesquisar Projeto" />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Gear
            className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
            width={19.45}
            height={20}
            weight="fill"
          />
          <Bell
            className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
            width={19.45}
            height={20}
            weight="fill"
          />
          <div className="flex cursor-pointer items-center gap-5 rounded-6 p-2.5 text-write-secundary hover:bg-secundary hover:text-write-primary">
            <h5>Matheus Henrique</h5>
            <UserCheck width={19.45} height={20} weight="fill" />
          </div>
        </div>
        <List
          className="cursor-pointer text-write-secundary md:hidden"
          size={24}
          onClick={handleMenuToggle}
        />
      </header>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25"
          onClick={() =>
            setTimeout(() => {
              setMenuOpen(false);
            }, 100)
          }
        >
          <SidebarX navbar={navbar} menuOpen />
        </div>
      )}
    </>
  );
};
