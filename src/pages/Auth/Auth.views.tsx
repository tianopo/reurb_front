import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { FlexCol } from "src/components/Flex/FlexCol";
import { Form } from "src/components/Form/Form";
import { Input } from "src/components/Form/Input";
import { useRegister } from "src/hooks/API/useRegister";
import { IRegisterDto } from "src/interfaces/models";

export const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { mutate, isPending, context } = useRegister();
  const { formState } = context;
  const onSubmit = (data: IRegisterDto) => {
    mutate(data);
  };

  const loginOrRegister = !showRegister ? "LOGIN" : "REGISTER";
  return (
    <section
      className={`via-from-slate-400 to-from-slate-200 flex h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-slate-600 p-2`}
    >
      <div className="w-2/3 rounded-xl bg-neutral-600 p-3 shadow-2xl md:w-96">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h2 className="text-4xl font-semibold text-white">{loginOrRegister}</h2>
          <FormProvider {...context}>
            <Form onSubmit={onSubmit}>
              <FlexCol className="w-fit items-center gap-1">
                {showRegister && <Input title="Name" placeholder="John Wick" required />}
                <Input title="E-mail" placeholder="johnwick@domain.com" typ="email" required />
                <Input title="Password" placeholder="*******" typ="password" required />
                {showRegister && (
                  <Input title="Confirm Password" placeholder="*******" typ="password" required />
                )}
                <button
                  disabled={isPending || formState.errors === undefined}
                  className="button button-light"
                >
                  {!isPending ? loginOrRegister : "loading..."}
                </button>
              </FlexCol>
            </Form>
          </FormProvider>
          <h5 className="mb-0">
            {!showRegister ? (
              <FlexCol className="items-center">
                <p className="break-all font-semibold text-white">Don't have an account?</p>
                <p
                  className="cursor-pointer font-semibold text-white hover:underline"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </p>
              </FlexCol>
            ) : (
              <FlexCol className="items-center">
                <p className="font-semibold text-white">Already have an account?</p>
                <p
                  className="cursor-pointer font-semibold text-white hover:underline"
                  onClick={() => setShowRegister(false)}
                >
                  Login
                </p>
              </FlexCol>
            )}
          </h5>
        </div>
      </div>
    </section>
  );
};
