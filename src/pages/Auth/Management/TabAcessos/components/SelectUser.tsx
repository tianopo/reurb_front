import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import "../../Management.css";

interface SelectUserProps {
  setAccess: (option: string) => void;
  access: string;
  disabled?: boolean;
}

const BeginSelectUser: ForwardRefRenderFunction<HTMLInputElement, SelectUserProps> = (
  { setAccess, access, disabled, ...props }: SelectUserProps,
  ref,
) => {
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
          id={access}
          ref={ref}
          name={access}
          readOnly={true}
          autoComplete="complete"
          disabled={disabled}
          value={access}
          className={`w-24 cursor-pointer bg-inherit text-write-primary outline-none ${disabled && "cursor-no-drop opacity-80"} `}
          {...props}
        />
        {isOpen && !disabled ? (
          <CaretUp className="text-write-secundary" width={19.45} height={20} />
        ) : (
          <CaretDown
            className={`text-write-secundary ${disabled && "cursor-no-drop opacity-80"} `}
            width={19.45}
            height={20}
          />
        )}
      </div>
      {isOpen && !disabled && (
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

export const SelectUser = forwardRef(BeginSelectUser);
