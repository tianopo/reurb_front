import { ChangeEventHandler } from "react";
import { useFormContext } from "react-hook-form";
import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

interface ITextarea extends IUseForm {
  title: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
}

export const Textarea = ({
  disabled,
  required,
  title,
  placeholder,
  onChange,
  rows = 4,
}: ITextarea) => {
  const words = labelFormatted(title);

  const formContext = useFormContext();
  const { register, formState } = formContext || {};

  const { errors } = formState || {};
  const inputRegister = register ? register(title, { required }) : undefined;

  return (
    <FlexCol className={`input_container`}>
      <Label title={title} words={words} required={required} />
      <textarea
        id={words}
        name={words}
        disabled={disabled}
        readOnly={disabled}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => {
          inputRegister?.onChange(e);
          onChange && onChange(e);
        }}
        className={`
          input-light
          input
          resize-none
          ${disabled ? "opacity-80" : ""}
          `}
      />
      <ErrorMessages errors={errors.root?.message} />
    </FlexCol>
  );
};
