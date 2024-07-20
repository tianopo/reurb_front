// validadors to Input

export const formatPhone = (value: string): string => {
  let input = value.replace(/\D/g, "");
  if (input.length > 11) {
    input = input.slice(0, 11);
  }
  if (input.length > 0) {
    input = input.replace(/^(\d{2})(\d)/, "($1) $2");
  }

  if (input.length > 6) {
    input = input.replace(/(\d{4})(\d{0,4})$/, "$1-$2");
  }

  if (input.endsWith("-")) {
    input = input.slice(0, -1);
  }
  return input;
};

export const formatCep = (value: string): string => {
  let input = value.replace(/\D/g, "");
  if (input.length > 8) {
    input = input.slice(0, 8);
  }
  if (input.length > 0) {
    input = input.replace(/^(\d{2})(\d)/, "$1.$2");
  }

  if (input.length > 4) {
    input = input.replace(/(\d{3})(\d)/, "$1-$2");
  }

  return input;
};
