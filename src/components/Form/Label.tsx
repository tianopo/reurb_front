import { IUseForm } from "../../interfaces/IUseForm";
import { FlexRow } from "../Flex/FlexRow";

interface ILabel extends IUseForm {
  title: string;
  words: string;
}

export const Label = ({ required, title, words }: ILabel) => {
  return (
    <FlexRow>
      <label htmlFor={words} className="block w-fit">
        <p className={`label-light text-16 font-normal leading-20`}>
          {title} {required && <span className={`label_required-light`}>*</span>}
        </p>
      </label>
    </FlexRow>
  );
};
