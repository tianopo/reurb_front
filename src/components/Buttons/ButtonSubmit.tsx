// BotaoSubmit.tsx
import { HTMLAttributes, ReactNode } from "react";

interface IButtonSubmit extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  disabled?: boolean;
}

export const ButtonSubmit = ({ className, children, disabled }: IButtonSubmit) => {
  return (
    <button
      disabled={disabled}
      className={`
        botao
        botao-light
        ${className}`}
    >
      {children}
    </button>
  );
};
