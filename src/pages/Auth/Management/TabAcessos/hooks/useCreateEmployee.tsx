import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { IEmployeeDto } from "src/interfaces/models";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

export const useCreateEmployee = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Funcionário criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      navigate(app.management);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).max(255).label("Nome"),
    email: Yup.string()
      .required()
      .email()
      .matches(Regex.email, "E-mail inválido")
      .max(255)
      .label("E-mail"),
    cpf: Yup.string().required().matches(Regex.cpf_mask, "CPF inválido").label("CPF"),
    profissao: Yup.string().required().max(100).label("Profissão"),
    telefone: Yup.string().required().label("Telefone"),
  });

  const context = useForm<IEmployeeDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: Yup.InferType<typeof schema>): Promise<IEmployeeDto> {
    const result = await api().post(apiRoute.employee, data);
    return result.data;
  }

  return { mutate, isPending, context };
};
