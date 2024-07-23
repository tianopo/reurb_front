import { Gear } from "@phosphor-icons/react";
import { useState } from "react";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { IconX } from "src/components/Icons/IconX";
import { CardContainer } from "src/components/Layout/CardContainer";
import { formatCep, formatCPF, formatRG } from "src/utils/formats";
import "../Management.css";
import { SelectUser } from "./components/SelectUser";

export const User = () => {
  const [valueRG, setValueRG] = useState("");
  const [valueCPF, setValueCPF] = useState("");
  const [valueCEP, setValueCEP] = useState("");
  // const acesso = "funcionário"

  const handleRGFormat = (e: { target: { value: string } }) => {
    const formattedRG = formatRG(e.target.value);
    setValueRG(formattedRG);
  };

  const handleCPFFormat = (e: { target: { value: string } }) => {
    const formattedCPF = formatCPF(e.target.value);
    setValueCPF(formattedCPF);
  };

  const handleCEPFormat = (e: { target: { value: string } }) => {
    const formattedCEP = formatCep(e.target.value);
    setValueCEP(formattedCEP);
  };

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
        <InputX title="Nome" placeholder="Ciclano Fonseca" required />
        <InputX
          title="RG"
          placeholder="XX.XXX.XXX-X"
          onChange={handleRGFormat}
          value={valueRG}
          required
        />
        <InputX
          title="CPF"
          placeholder="XXX.XXX.XXX-XX"
          onChange={handleCPFFormat}
          value={valueCPF}
          required
        />
      </div>
      <div className="container-user">
        <Select
          title="Estado Civil"
          options={["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"]}
          required
        />
        <InputX title="Profissão" placeholder="Carpinteiro" required />
        <InputX
          title="CEP"
          placeholder="XX.XXX-XXX"
          onChange={handleCEPFormat}
          value={valueCEP}
          required
        />
      </div>
    </CardContainer>
  );
};
