import { HTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

export interface ILink extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  route?: string;
  target?: string;
}

export const LinkX = ({ route, children, target }: ILink) => {
  return (
    <Link
      to={route!}
      target={target}
      className={`
      link-light
      w-fit
      font-normal
      transition
      duration-300
      ease-in-out
      hover:opacity-80
      `}
    >
      {children}
    </Link>
  );
};
