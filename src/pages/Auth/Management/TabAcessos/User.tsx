import { Gear } from "@phosphor-icons/react";
import { InputX } from "src/components/Form/Input/InputX";
import { IconX } from "src/components/Icons/IconX";
import { CardContainer } from "src/components/Layout/CardContainer";
import "../Management.css";
import { SelectUser } from "./components/SelectUser";

export const User = () => {
  return (
    <CardContainer>
      <div className="flex w-full items-start justify-between">
        <h4 className="text-start text-write-primary">Usuário Adriana</h4>
        <div className="flex gap-1">
          <SelectUser />
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
      <div className="container-user">
        <InputX title="Nome" placeholder="Ciclano Fonseca" />
        <InputX title="RG" placeholder="XX.XXX.XXX-X" />
        <InputX title="CPF" placeholder="Ciclano Fonseca" />
      </div>
    </CardContainer>
  );
};
