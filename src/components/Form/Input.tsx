import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

interface IInput extends IUseForm {
  title: string;
  placeholder?: string;
  typ?: "text" | "tel" | "date" | "email" | "number" | "time" | "datetime-local";
}

export const Input = ({
  disabled,
  required,
  title,
  placeholder,
  register,
  errors,
  typ = "text",
}: IInput) => {
  const words = labelFormatted(title);

  return (
    <FlexCol className="input_container">
      <Label title={title} words={words} required={required} />
      <input
        id={words}
        name={words}
        type={typ}
        disabled={disabled}
        placeholder={placeholder}
        {...register}
        autoComplete="complete"
        className={`
            input
            input-claro
            ${disabled ? "opacity-80" : ""}
          `}
      />
      <ErrorMessages errors={errors} />
    </FlexCol>
  );
};
