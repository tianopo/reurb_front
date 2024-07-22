import { ReactNode } from "react";

interface ICardContainer {
  children: ReactNode;
}

export const CardContainer = ({ children }: ICardContainer) => {
  return <div className="w-full rounded-6 border-1 border-black bg-white p-3">{children}</div>;
};
