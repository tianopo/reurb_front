import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { FlexCol } from "src/components/Flex/FlexCol";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/InputX";
import { useLogin, ILoginDto } from "src/pages/public/Login/useLogin";

export const FormLogin = () => {
  const { mutate, isPending, context } = useLogin();
  const {
    formState: { errors },
  } = context;
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data: ILoginDto) => {
    mutate(data);
  };

  return (
    <FormProvider {...context}>
      <FormX onSubmit={onSubmit}>
        <FlexCol className="w-fit items-center gap-1">
          <InputX title="E-mail" placeholder="johnwick@domain.com" typ="email" required />
          <InputX
            title="Password"
            placeholder="*******"
            typ={showPassword ? "text" : "password"}
            required
          />
          <label className="flex w-11/12 flex-row items-center gap-2 text-sm text-primary">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 appearance-none rounded-6 bg-primary outline-none checked:bg-slate-800 focus:outline-none"
            />
            {showPassword ? "Hide" : "Show"} Password
          </label>
          <button
            disabled={isPending || Object.keys(errors).length > 0}
            className="button button-light"
          >
            {!isPending ? "LOGIN" : "loading..."}
          </button>
        </FlexCol>
      </FormX>
    </FormProvider>
  );
};
