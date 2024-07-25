import { ChangeEventHandler, ForwardRefRenderFunction, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import { Label } from "../Label/Label";
import "./Input.css";

interface IInputX extends IUseForm {
  title: string;
  placeholder?: string;
  value?: string;
  typ?: "text" | "tel" | "date" | "email" | "number" | "time" | "datetime-local" | "password";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
}

export const BeginInput: ForwardRefRenderFunction<HTMLInputElement, IInputX> = (
  {
    disabled,
    required,
    title,
    placeholder,
    value,
    readOnly,
    typ = "text",
    onChange,
    ...rest
  }: IInputX,
  ref,
) => {
  const words = labelFormatted(title);
  const formContext = useFormContext();
  const { register, formState } = formContext || {};

  const { errors } = formState || {};
  const inputRegister = register ? register(words, { required }) : undefined;
  const errorMessage = errors && errors[words]?.message;

  return (
    <div className="input_container">
      <Label title={title} words={words} required={required} />
      <input
        id={words}
        ref={ref}
        name={words}
        type={typ}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        {...inputRegister}
        onChange={(e) => {
          inputRegister?.onChange(e);
          onChange && onChange(e);
        }}
        readOnly={readOnly}
        autoComplete="complete"
        className={`input border-edge-primary ${disabled ? "cursor-not-allowed opacity-80" : ""} ${errorMessage ? "border-1 border-variation-error" : ""} `}
        {...rest}
      />
      <ErrorMessages errors={errorMessage?.toString()} />
    </div>
  );
};

export const InputX = forwardRef(BeginInput);
