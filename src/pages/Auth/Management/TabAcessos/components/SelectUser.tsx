import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useState } from "react";
import "../../Management.css";

interface SelectUserProps {
  setAccess: (option: string) => void;
  access: string;
}

export const SelectUser = ({ setAccess, access }: SelectUserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setIsOpen(false);
    setAccess(option);
  };

  return (
    <div className="relative">
      <div className="flex cursor-pointer gap-1" onClick={toggleDropdown}>
        <input
          readOnly
          value={access}
          className="w-24 cursor-pointer bg-inherit text-write-primary outline-none"
        />
        {isOpen ? (
          <CaretUp className="text-write-secundary" width={19.45} height={20} />
        ) : (
          <CaretDown className="text-write-secundary" width={19.45} height={20} />
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-fit rounded-lg border border-gray-300 bg-white shadow-md">
          <ul>
            <li className="option-select-user" onClick={() => handleOptionSelect("Funcionário")}>
              Funcionário
            </li>
            <li className="option-select-user" onClick={() => handleOptionSelect("Cliente")}>
              Cliente
            </li>
            <li className="option-select-user" onClick={() => handleOptionSelect("Admin")}>
              Admin
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
