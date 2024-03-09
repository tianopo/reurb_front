import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

interface ISelect extends IUseForm {
  title: string;
  register?: UseFormRegisterReturn<string>;
  options?: string[];
}

export const Select = ({ disabled, required, title, register, options, ...rest }: ISelect) => {
  const words = labelFormatted(title);
  const formContext = useFormContext();
  const { formState } = formContext || {};

  const { errors } = formState || {};
  const errorMessage = errors && errors[words]?.message;

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
        input-light
        ${disabled ? "opacity-80" : ""}
        `}
        {...rest}
      >
        {options?.map((option, index) => (
          <option key={index} value={labelFormatted(option)}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessages errors={errorMessage?.toString()} />
    </FlexCol>
  );
};
