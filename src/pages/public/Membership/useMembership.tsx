import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { api } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export interface IMembershipDto {
  nome: string;
  email: string;
  telefone: string;
  cep: string;
}

export const useMembership = () => {
  const navigate = useNavigate();
  const { t: translator } = useTranslation();
  const t = (t: string) => translator(`hooks.auth.${t}`);

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Formulário enviado com sucesso");

      navigate(app.login);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).label("Nome"),
    email: Yup.string().required().email().matches(Regex.email, t("InvalidEmail")).label("E-mail"),
    telefone: Yup.string().required().label("Telefone"),
    cep: Yup.string().required().matches(Regex.cep_mask, "CEP inválido").label("CEP"),
  });

  const context = useForm<IMembershipDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: Yup.InferType<typeof schema>): Promise<IMembershipDto> {
    const result = await api().post(apiRoute.sendMembership, data);
    return result.data;
  }

  return { mutate, isPending, context };
};
