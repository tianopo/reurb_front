import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { FlexCol } from "src/components/Flex/FlexCol";
import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import { Label } from "../Label/Label";
import "./Input.css";

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
        className={`input white ${disabled ? "opacity-80" : ""} `}
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
