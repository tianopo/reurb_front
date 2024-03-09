import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, auth } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IAuthModel, IRegisterDto } from "src/interfaces/models";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("User registered successfully");
      navigate(0);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    name: Yup.string().required().min(1).label("name"),
    password: Yup.string()
      .required()
      .min(8)
      .max(30)
      .matches(Regex.uppercase, "Password must have at least one uppercase character")
      .matches(Regex.lowcase, "Password must have at least one lowercase character")
      .matches(Regex.number, "Password must have at least one number character")
      .matches(Regex.special_character, "Password must have at least one special character")
      .label("password"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .label("Confirm Password"),
    email: Yup.string()
      .required()
      .email()
      .matches(Regex.year, "Invalid email address")
      .label("email"),
  });

  const context = useForm<IRegisterDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: Yup.InferType<typeof schema>): Promise<IAuthModel> {
    const result = await api().post(`${auth}/signup`, data);
    return result.data;
  }

  return { mutate, isPending, context };
};
