import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { app } from "src/routes/app";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";
import { IEmployeeDto } from "./interfaces";

export const useUpdateEmployee = (id: string) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IEmployeeDto) => path(id, data),
    onSuccess: () => {
      responseSuccess("Funcionário atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      navigate(app.management);
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  const schema = Yup.object().shape({
    nome: Yup.string().required().min(1).max(255).label("Nome"),
    email: Yup.string().required().email().max(255).label("E-mail"),
    cpf: Yup.string().required().matches(Regex.cpf_mask, "CPF inválido").label("CPF"),
    profissao: Yup.string().required().max(100).label("Profissão"),
    telefone: Yup.string().required().label("Telefone"),
    status: Yup.boolean().optional().label("Status"),
  });

  const context = useForm<IEmployeeDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(id: string, data: Yup.InferType<typeof schema>): Promise<IEmployeeDto> {
    const result = await api().put(apiRoute.idEmployee(id), data);
    return result.data;
  }

  return { mutate, isPending, context };
};
