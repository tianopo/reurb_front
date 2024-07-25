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
      <button className="flex cursor-pointer gap-1" onClick={toggleDropdown}>
        <h6 className="text-write-primary">{access}</h6>
        {isOpen ? (
          <CaretUp className="text-write-secundary" width={19.45} height={20} />
        ) : (
          <CaretDown className="text-write-secundary" width={19.45} height={20} />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-28 rounded-lg border border-gray-300 bg-white shadow-md">
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
