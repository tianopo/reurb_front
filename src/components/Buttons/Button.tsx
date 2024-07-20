import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ children, ...props }: IButton) => {
  return (
    <button
      className={`h-12 w-full cursor-pointer rounded-20 bg-primary px-5 text-center text-12 font-bold uppercase tracking-widest text-white hover:opacity-70`}
      {...props}
    >
      {children}
    </button>
  );
};
