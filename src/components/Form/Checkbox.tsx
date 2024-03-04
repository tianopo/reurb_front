import { IUseForm } from "src/interfaces/IUseForm";
import { labelFormatted } from "src/utils/formatation/labelFormatted";
import { FlexCol } from "../Flex/FlexCol";
import { FlexRow } from "../Flex/FlexRow";
import { ErrorMessages } from "./ErrorMessages";
import { Label } from "./Label";

export interface ICheckbox extends IUseForm {
  titulo: string;
}

export const Checkbox = ({ disabled, required, errors, titulo, register }: ICheckbox) => {
  const palavras = labelFormatted(titulo);

  return (
    <FlexCol>
      <FlexRow className="gap-1 p-2">
        <input
          id={titulo}
          name={palavras}
          type="checkbox"
          readOnly
          disabled={disabled}
          {...register}
          className={`
          checkbox_input-light
          h-4
          w-4
          outline-none
          focus:outline-none
          `}
        />
        <Label title={titulo} words={palavras} required={required} />
      </FlexRow>
      <ErrorMessages errors={errors} />
    </FlexCol>
  );
};
