/* eslint no-template-curly-in-string: "off" */
import Yup from "src/utils/yupValidation";

export const yupEnglishLocale: Yup.LocaleObject = {
  string: {
    uuid: "${path} is invalid",
    email: "${path} is an invalid email",
    length: "${path} has ${length} characters?",
    lowercase: "${path} is uppercase?",
    uppercase: "${path} is lowercase?",
    min: ({ min, path }) =>
      `${path} must have at least ${min} ${min === 1 ? "character" : "characters"}`,
    max: ({ max, path }) =>
      `${path} must have at most ${max} ${max === 1 ? "character" : "characters"}`,
    trim: "${path} does not have white spaces?",
    url: "${path} has a valid URL format?",
  },
  number: {
    min: "${path} is greater than ${min}?",
    max: "${path} is less than ${max}?",
    integer: "${path} is an integer?",
    lessThan: "${path} is less than ${less}?",
    moreThan: "${path} is more than ${more}?",
    negative: "${path} is a negative number?",
    positive: "${path} is a positive number?",
  },
  array: {
    min: "${path} has at least ${min} items?",
    length: "${path} has ${length} items?",
    max: "${path} has at most ${max} items?",
  },
  boolean: {
    isValue: "${path} has the same value as ${value}?",
  },
  date: {
    max: "${path} is before ${max}?",
    min: "${path} is after ${min}?",
  },
  object: {
    noUnknown: "${path} has keys not specified in the object shape",
  },
  mixed: {
    default: "${path} is invalid",
    notNull: "${path} is required",
    required: "${path} is required",
    oneOf: "${path} is one of the following values: ${values}",
    notType: ({ path, type, value, originalValue }) => {
      const isCast = originalValue != null && originalValue !== value;
      let msg = `${path} is a \`${type}\`, ` + `but the final value was: \`${value}\`.`;
      if (isCast) {
        msg += ` The original value is \`${originalValue}\`.`;
      }
      return msg;
    },
    defined: "${path} is not undefined",
    notOneOf: "${path} is not one of the following values: ${values}",
  },
};
