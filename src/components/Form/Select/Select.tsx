import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { ForwardRefRenderFunction, forwardRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import "../Input/Input.css";
import { Label } from "../Label/Label";

interface ISelect extends IUseForm {
  title: string;
  options?: string[];
  onChange?: (value: string) => void;
  value?: string; // Adicione esta linha
  required?: boolean;
  disabled?: boolean;
}

const BeginSelect: ForwardRefRenderFunction<HTMLButtonElement, ISelect> = (
  {
    disabled,
    required,
    title,
    options,
    onChange,
    value, // Adicione esta linha
  }: ISelect,
  ref,
) => {
  const words = labelFormatted(title);
  const formContext = useFormContext();
  const { register, setValue, formState } = formContext || {};

  const { errors } = formState || {};
  const selectRegister = register ? register(words, { required }) : undefined;
  const errorMessage = errors && errors[words]?.message;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(value);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (setValue) {
      setValue(words, option);
    }
    onChange && onChange(option);
  };

  return (
    <div className="input_container relative">
      <Label title={title} words={words} required={required} />
      <button
        id={words}
        ref={ref}
        name={words}
        onBlur={() =>
          setTimeout(() => {
            setIsOpen(false);
          }, 100)
        }
        className={`input ${disabled ? "cursor-not-allowed opacity-80" : ""} ${errorMessage ? "border-1 border-variation-error" : ""} `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        {...selectRegister}
      >
        <div className="flex cursor-pointer items-center justify-between text-write-secundary">
          <p className="text-write-placeholder">{selectedOption || "Selecione uma opção"}</p>
          {isOpen ? <CaretUp width={19.45} height={20} /> : <CaretDown width={19.45} height={20} />}
        </div>
        {isOpen && (
          <ul className="absolute left-0 top-16 z-10 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white">
            {options?.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer rounded-lg p-2.5 text-14 text-write-secundary hover:bg-selected-primary hover:text-write-primary"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </button>
      <ErrorMessages errors={errorMessage?.toString()} />
    </div>
  );
};

export const Select = forwardRef(BeginSelect);
