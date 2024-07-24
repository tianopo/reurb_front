import { X } from "@phosphor-icons/react";
import { ReactNode } from "react";

interface IModal {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: IModal) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-11/12 flex-col gap-1 rounded-lg bg-white p-4 shadow-lg md:w-2/3">
        <button
          className="absolute right-2 top-2 text-write-primary hover:text-selected-primary"
          onClick={onClose}
        >
          <X size={24} weight="bold" />
        </button>
        {children}
      </div>
    </div>
  );
};
