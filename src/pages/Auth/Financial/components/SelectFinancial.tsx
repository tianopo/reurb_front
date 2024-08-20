import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { IFinancialDto } from "src/interfaces/models";
import "../Financial.css";

interface SelectFinancialProps {
  setStatus: (option: IFinancialDto["status"]) => void;
  status: string;
  disabled?: boolean;
}

const BeginSelectFinancial: ForwardRefRenderFunction<HTMLInputElement, SelectFinancialProps> = (
  { setStatus, status, disabled, ...props }: SelectFinancialProps,
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: IFinancialDto["status"]) => {
    setIsOpen(false);
    setStatus(option);
  };

  return (
    <div className="relative">
      <div className="flex cursor-pointer gap-1" onClick={toggleDropdown}>
        <input
          id={status}
          ref={ref}
          name={status}
          readOnly={true}
          autoComplete="complete"
          disabled={disabled}
          value={status}
          className={`w-28 cursor-pointer bg-inherit text-write-primary outline-none ${disabled && "cursor-no-drop opacity-80"} `}
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
            <li
              className="option-select-financial"
              onClick={() => handleOptionSelect("Lançamentos")}
            >
              Lançamentos
            </li>
            <li
              className="option-select-financial"
              onClick={() => handleOptionSelect("Em Processo")}
            >
              Em Processo
            </li>
            <li
              className="option-select-financial"
              onClick={() => handleOptionSelect("Concluidos")}
            >
              Concluidos
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export const SelectFinancial = forwardRef(BeginSelectFinancial);
