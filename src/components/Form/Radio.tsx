import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { FlexRow } from "../Flex/FlexRow";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

export interface IRadio extends IUseForm {
  title: string;
  options: string[];
}

export const Radio = ({ disabled, errors, register, options, title, required }: IRadio) => {
  return (
    <FlexCol className="input_container">
      <h4 className={`label-texto label-light`}>
        {title} {required && <span className={`label_required-light`}>*</span>}
      </h4>
      {options.map((option) => {
        const palavras = labelFormatted(option);

        return (
          <FlexRow key={option} className="w-fit gap-1.5 py-1">
            <input
              id={palavras}
              name={palavras}
              type="radio"
              value={option}
              readOnly
              disabled={disabled}
              checked
              className={`radio-light h-5 w-5`}
              {...register}
            />
            <Label title={option} words={labelFormatted(option)} />
          </FlexRow>
        );
      })}
      <ErrorMessages errors={errors} />
    </FlexCol>
  );
};
