import { IUseForm } from "../../../interfaces/IUseForm";
import { FlexRow } from "../../Flex/FlexRow";

interface ILabel extends IUseForm {
  title: string;
  words: string;
}

export const Label = ({ required, title, words }: ILabel) => {
  return (
    <FlexRow>
      <label htmlFor={words} className="block w-fit">
        <p className={`text-write-primary`}>
          {title} {required && <span className={`text-variation-error`}>*</span>}
        </p>
      </label>
    </FlexRow>
  );
};
