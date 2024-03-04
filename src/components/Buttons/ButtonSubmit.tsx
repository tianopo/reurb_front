// buttonSubmit.tsx
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
        button
        button-light
        ${className}`}
    >
      {children}
    </button>
  );
};
