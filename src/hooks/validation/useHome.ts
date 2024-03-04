import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Yup from "src/utils/yupValidation";

export interface IHomeSchema {
  nome: string;
  email: string;
  contato: string;
  mensagem?: string;
}

export const useHome = () => {
  const Schema = Yup.object().shape({
    nome: Yup.string().required().min(1).label("nome"),
    email: Yup.string().email().required().label("email"),
    contato: Yup.string().required().label("contato"),
    mensagem: Yup.string().optional().label("mensagem"),
  });

  const context = useForm<IHomeSchema>({
    resolver: yupResolver(Schema),
    reValidateMode: "onChange",
  });

  return { context };
};
