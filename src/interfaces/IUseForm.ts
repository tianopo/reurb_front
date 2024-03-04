import { UseFormRegisterReturn } from "react-hook-form";

export interface IUseForm {
  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegisterReturn<string>;
  errors?: string;
}
