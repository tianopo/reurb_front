import { Bell, DoorOpen, Gear, UserCheck } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "src/hooks/API/auth/useLogout";
import "./Sidebar.css";
import { IconX } from "src/components/Icons/IconX";

interface INavbar {
  icon?: JSX.Element;
  text: string;
  route: string;
}

interface ISidebarX {
  navbar: INavbar[];
  menuOpen?: boolean;
}

export const SidebarX = ({ navbar, menuOpen }: ISidebarX) => {
  const { mutate } = useLogout();
  const navigate = useNavigate();

  return (
    <div
      className={`h-calc-header w-60 flex-col justify-between border-e-1 border-edge-primary bg-white px-2 py-4 md:flex ${menuOpen ? "flex h-screen" : "hidden"} `}
    >
      <div>
        {navbar?.map((nav: INavbar, index: number) => (
          <div
            className="flex h-10 cursor-pointer items-center justify-start gap-2.5 rounded-10 pl-2.5 text-write-secundary hover:bg-selected-primary hover:text-write-primary"
            key={index}
            onClick={() => navigate(nav.route)}
          >
            {nav.icon}
            <h6>{nav.text}</h6>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="border-edge block border-t-1 md:hidden" />
        <div className="flex flex-col items-center gap-5 md:hidden">
          <div className="flex w-full flex-row gap-1 pl-2.5 text-start">
            <IconX
              name="Acessos"
              icon={
                <Gear
                  className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
                  width={19.45}
                  height={20}
                  weight="fill"
                />
              }
            />
            <IconX
              name="Notificações"
              icon={
                <Bell
                  className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
                  width={19.45}
                  height={20}
                  weight="fill"
                />
              }
            />
          </div>
          <div className="flex cursor-pointer items-center gap-5 rounded-6 p-2.5 text-write-secundary hover:bg-secundary hover:text-write-primary">
            <h5>Matheus Henrique</h5>
            <UserCheck width={19.45} height={20} weight="fill" />
          </div>
        </div>
        <div className="border-edge border-t-1" />
        <div
          className="flex h-10 cursor-pointer items-center justify-start gap-2.5 rounded-10 pl-2.5 text-write-secundary hover:bg-selected-primary hover:text-write-primary"
          onClick={() => mutate()}
        >
          <DoorOpen width={20} height={17} weight="duotone" />
          <h6>Sair</h6>
        </div>
      </div>
    </div>
  );
};
