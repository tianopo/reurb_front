import { FormHTMLAttributes, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (data: any) => void;
}

export const Form = forwardRef<HTMLFormElement, IForm>(({ onSubmit, ...rest }, ref) => {
  const formContext = useFormContext();
  const { handleSubmit } = formContext || {};

  return <form onSubmit={handleSubmit(onSubmit)} {...rest} ref={ref} />;
});

Form.displayName = "Form";
