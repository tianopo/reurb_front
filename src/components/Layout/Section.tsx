import { HTMLAttributes, ReactNode } from "react";

interface ISection extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  divisao?: number;
}
/* Consegue dividir em até dois lados por seção */
export const Section = ({ children, divisao, className }: ISection) => {
  return (
    <section
      className={`grid w-full ${
        divisao ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      } gap-2 ${className}`}
    >
      {children}
    </section>
  );
};
