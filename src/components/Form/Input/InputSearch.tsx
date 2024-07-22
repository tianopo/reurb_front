import { MagnifyingGlass } from "@phosphor-icons/react";
import { ChangeEventHandler, ForwardRefRenderFunction, forwardRef } from "react";
import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import "./Input.css";

interface IInputSearch extends IUseForm {
  title: string;
  placeholder?: string;
  value?: string;
  typ?: "text" | "tel" | "date" | "email" | "number" | "time" | "datetime-local" | "password";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const BeginInputSearch: ForwardRefRenderFunction<HTMLInputElement, IInputSearch> = (
  { disabled, required, title, placeholder, value, typ = "text", onChange, ...rest }: IInputSearch,
  ref,
) => {
  const words = labelFormatted(title);

  return (
    <div className="flex w-fit items-end justify-center md:w-72">
      <MagnifyingGlass size={24} className="absolute top-5 ml-28 text-gray-500 md:ml-60" />
      <input
        id={words}
        ref={ref}
        name={words}
        type={typ}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        autoComplete="off"
        className={`input ${disabled ? "cursor-not-allowed opacity-80" : ""} `}
        {...rest}
      />
    </div>
  );
};

export const InputSearch = forwardRef(BeginInputSearch);
