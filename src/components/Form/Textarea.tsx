import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

interface ITextarea extends IUseForm {
  title: string;
  placeholder?: string;
  rows?: number;
}

export const Textarea = ({
  disabled,
  required,
  title,
  placeholder,
  register,
  errors,
  rows = 4,
}: ITextarea) => {
  const words = labelFormatted(title);

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
        {...register}
        className={`
          input-light
          input
          resize-none
          ${disabled ? "opacity-80" : ""}
          `}
      />
      <ErrorMessages errors={errors} />
    </FlexCol>
  );
};
