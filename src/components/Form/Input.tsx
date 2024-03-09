import { ChangeEventHandler, ForwardRefRenderFunction, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

interface IInput extends IUseForm {
  title: string;
  placeholder?: string;
  typ?: "text" | "tel" | "date" | "email" | "number" | "time" | "datetime-local" | "password";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const BeginInput: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  { disabled, required, title, placeholder, typ = "text", onChange, ...rest }: IInput,
  ref,
) => {
  const words = labelFormatted(title);
  const formContext = useFormContext();
  const { register, formState } = formContext || {};

  const { errors } = formState || {};
  const inputRegister = register ? register(words, { required }) : undefined;
  const errorMessage = errors && errors[words]?.message;

  return (
    <FlexCol className="input_container">
      <Label title={title} words={words} required={required} />
      <input
        id={words}
        ref={ref}
        name={words}
        type={typ}
        disabled={disabled}
        placeholder={placeholder}
        {...inputRegister}
        onChange={(e) => {
          inputRegister?.onChange(e);
          onChange && onChange(e);
        }}
        autoComplete="complete"
        className={`
            input
            input-light
            ${disabled ? "cursor-not-allowed opacity-80" : ""}
            ${errorMessage ? "border-1 border-erro-light" : ""}
          `}
        {...rest}
      />
      <ErrorMessages errors={errorMessage?.toString()} />
    </FlexCol>
  );
};

export const Input = forwardRef(BeginInput);
