/* eslint no-template-curly-in-string: "off" */
import * as Yup from "yup";

export const yupPortugueseLocale: Yup.LocaleObject = {
  mixed: {
    default: "${path} é inválido",
    required: "${path} é obrigatório",
    oneOf: "${path} deve ser um dos seguintes valores: ${values}",
    notOneOf: "${path} não pode ser um dos seguintes valores: ${values}",
    notType: ({ path, type, value, originalValue }) => {
      const isCast = originalValue != null && originalValue !== value;
      let msg = `${path} deve ser do tipo \`${type}\`, mas o valor final foi: \`${value}\``;
      if (isCast) {
        msg += ` (valor original: \`${originalValue}\`).`;
      }
      return msg;
    },
    defined: "${path} não deve ser indefinido",
  },
  string: {
    length: "${path} deve ter exatamente ${length} caracteres",
    min: "${path} deve ter pelo menos ${min} caracteres",
    max: "${path} deve ter no máximo ${max} caracteres",
    matches: '${path} deve corresponder ao padrão: "${regex}"',
    email: "${path} deve ser um e-mail válido",
    url: "${path} deve ser uma URL válida",
    trim: "${path} não deve conter espaços em branco no início ou no fim",
    lowercase: "${path} deve estar em minúsculo",
    uppercase: "${path} deve estar em maiúsculo",
  },
  number: {
    min: "${path} deve ser no mínimo ${min}",
    max: "${path} deve ser no máximo ${max}",
    lessThan: "${path} deve ser menor que ${less}",
    moreThan: "${path} deve ser maior que ${more}",
    positive: "${path} deve ser um número positivo",
    negative: "${path} deve ser um número negativo",
    integer: "${path} deve ser um número inteiro",
  },
  date: {
    min: "${path} deve ser posterior a ${min}",
    max: "${path} deve ser anterior a ${max}",
  },
  boolean: {
    isValue: "${path} deve ser ${value}",
  },
  object: {
    noUnknown: "${path} não deve ter chaves não especificadas na forma do objeto",
  },
  array: {
    min: "${path} deve ter no mínimo ${min} itens",
    max: "${path} deve ter no máximo ${max} itens",
    length: "${path} deve conter exatamente ${length} itens",
  },
};

Yup.setLocale(yupPortugueseLocale);

export default Yup;
