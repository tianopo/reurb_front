import { ReactNode } from "react";
import { FlexCol } from "../Flex/FlexCol";

interface ICardContainer {
  children: ReactNode;
}

export const CardContainer = ({ children }: ICardContainer) => {
  return (
    <div className="w-full p-3">
      <FlexCol className="w-full rounded-6 border-1 border-black bg-white p-3">{children}</FlexCol>
    </div>
  );
};
