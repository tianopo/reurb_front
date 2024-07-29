import { Gear } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconX } from "src/components/Icons/IconX";
import "../../Management.css";
import { SelectUser } from "../components/SelectUser";
import { FormUpdateClient } from "./FormUpdateClient";
import { FormUpdateEmployee } from "./FormUpdateEmployee";

export const UserUpdate = () => {
  const location = useLocation();
  const [access, setAccess] = useState("");
  const [user, setUser] = useState("Usuário");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (location.state?.access) {
      setAccess(location.state.access);
    }
  }, [location.state]);

  const handleUserTypeSelect = (option: string) => {
    setAccess(option);
  };

  const MainDiv = () => (
    <div className="flex w-full flex-col items-start justify-between md:flex-row">
      <h4 className="md:w-max-80 w-full truncate text-start text-write-primary md:w-80">{user}</h4>
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
              onClick={() => setEdit(!edit)}
            />
          }
        />
      </div>
    </div>
  );

  return access === "Cliente" ? (
    <FormUpdateClient MainDiv={MainDiv} setUser={setUser} edit={edit} />
  ) : (
    <FormUpdateEmployee MainDiv={MainDiv} setUser={setUser} edit={edit} />
  );
};
