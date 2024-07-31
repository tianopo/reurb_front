import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export interface IRecoverPasswordDto {
  email: string;
  senha: string;
  confirmarSenha: string;
}

export const useRecoverPassword = () => {
  const navigate = useNavigate();
  const { t: translator } = useTranslation();
  const t = (t: string) => translator(`hooks.auth.${t}`);

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["token-recover-data"] });
      responseSuccess("Formulário enviado com sucesso");

      navigate(app.login);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    email: Yup.string().required().email().matches(Regex.email, t("InvalidEmail")).label("E-mail"),
    senha: Yup.string()
      .required()
      .min(6)
      .max(30)
      .matches(Regex.uppercase, t("passwordUpper"))
      .matches(Regex.lowcase, t("passwordLower"))
      .matches(Regex.number, t("passwordNumber"))
      .matches(Regex.special_character, t("passwordSpecial"))
      .label("Senha"),
    confirmarSenha: Yup.string()
      .required()
      .oneOf([Yup.ref("senha")], "As senhas não coincidem")
      .label("Confirmar Senha"),
  });

  const context = useForm<IRecoverPasswordDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: Yup.InferType<typeof schema>): Promise<IRecoverPasswordDto> {
    const result = await api().put(apiRoute.recoverPassword, data);
    return result.data;
  }

  return { mutate, isPending, context };
};
