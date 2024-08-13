import { useState } from "react";
import { Role } from "src/routes/context/AccessControl";
import "../../Management.css";
import { SelectUser } from "../components/SelectUser";
import { FormCreateClient } from "./FormCreateClient";
import { FormCreateEmployee } from "./FormCreateEmployee";

export const UserCreate = () => {
  const [access, setAccess] = useState<Role | string>(Role.Cliente);
  const [user, setUser] = useState("Usuário");

  const handleUserTypeSelect = (option: Role | string) => {
    setAccess(option);
  };

  const MainDiv = () => (
    <div className="flex w-full flex-col items-start justify-between md:flex-row">
      <h4 className="md:w-max-80 w-full truncate text-start text-write-primary md:w-80">{user}</h4>
      <div className="flex gap-1">
        <SelectUser setAccess={handleUserTypeSelect} access={access} />
      </div>
    </div>
  );

  return access === Role.Cliente ? (
    <FormCreateClient MainDiv={MainDiv} setUser={setUser} />
  ) : (
    <FormCreateEmployee MainDiv={MainDiv} setUser={setUser} />
  );
};
