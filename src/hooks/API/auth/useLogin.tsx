import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, auth } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IAuthModel } from "src/interfaces/models";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export interface ILoginDto {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: (data: IAuthModel) => {
      responseSuccess("User successfully logged in");
      localStorage.setItem("token", data.token);
      setTimeout(
        () => {
          localStorage.removeItem("token");
        },
        24 * 60 * 60 * 1000,
      );

      navigate("/home");
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    password: Yup.string()
      .required()
      .min(8)
      .max(30)
      .matches(Regex.uppercase, "Password must have at least one uppercase character")
      .matches(Regex.lowcase, "Password must have at least one lowercase character")
      .matches(Regex.number, "Password must have at least one number character")
      .matches(Regex.special_character, "Password must have at least one special character")
      .label("password"),
    email: Yup.string()
      .required()
      .email()
      .matches(Regex.email, "Invalid email address")
      .label("email"),
  });

  const context = useForm<ILoginDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: Yup.InferType<typeof schema>): Promise<IAuthModel> {
    const result = await api().post(`${auth}/signin`, data);
    return result.data;
  }

  return { mutate, isPending, context };
};
