import { Gear } from "@phosphor-icons/react";
import { useState } from "react";
import { IconX } from "src/components/Icons/IconX";
import "../Management.css";
import { SelectUser } from "./components/SelectUser";
import { FormClient } from "./FormClient";
import { FormEmployee } from "./FormEmployee";

export const User = () => {
  const [access, setAccess] = useState("Cliente");

  const handleUserTypeSelect = (option: string) => {
    setAccess(option);
  };

  const MainDiv = () => (
    <div className="flex w-full items-start justify-between">
      <h4 className="text-start text-write-primary">Usuário Adriana</h4>
      <div className="flex gap-1">
        <SelectUser setAccess={handleUserTypeSelect} access={access} />
        <IconX
          name="Editar"
          icon={
            <Gear
              className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
              width={19.45}
              height={20}
              weight="fill"
            />
          }
        />
      </div>
    </div>
  );

  return access !== "Funcionário" ? (
    <FormClient MainDiv={MainDiv} />
  ) : (
    <FormEmployee MainDiv={MainDiv} />
  );
};
