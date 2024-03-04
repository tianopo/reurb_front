import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

interface ISelect extends IUseForm {
  title: string;
  options?: string[];
}

export const Select = ({ disabled, required, register, errors, title, options }: ISelect) => {
  const words = labelFormatted(title);

  return (
    <FlexCol className="input_container">
      <Label title={title} words={words} required={required} />
      <select
        id={words}
        name={words}
        disabled={disabled}
        {...register}
        autoComplete="complete"
        className={`
        input
        input-claro
        ${disabled ? "opacity-80" : ""}
        `}
      >
        {options?.map((option, index) => (
          <option key={index} value={labelFormatted(option)}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessages errors={errors} />
    </FlexCol>
  );
};
