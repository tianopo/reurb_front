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

export const formatRG = (value: string): string => {
  let input = value.replace(/\D/g, "");
  if (input.length > 9) {
    input = input.slice(0, 9);
  }
  if (input.length > 0) {
    input = input.replace(/^(\d{2})(\d)/, "$1.$2");
  }

  if (input.length > 5) {
    input = input.replace(/(\d{3})(\d)/, "$1.$2");
  }

  if (input.length > 8) {
    input = input.replace(/(\d{3})(\d{0,1})$/, "$1-$2");
  }

  if (input.endsWith("-")) {
    input = input.slice(0, -1);
  }

  return input;
};

export const formatCPF = (value: string): string => {
  let input = value.replace(/\D/g, "");
  if (input.length > 11) {
    input = input.slice(0, 11);
  }

  if (input.length > 0) {
    input = input.replace(/^(\d{3})(\d)/, "$1.$2");
  }

  if (input.length > 6) {
    input = input.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  }

  if (input.length > 9) {
    input = input.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  }

  if (input.endsWith("-")) {
    input = input.slice(0, -1);
  }

  return input;
};

export const formatState = (value: string): string => {
  let input = value.replace(/[^a-zA-Z]/g, "").toUpperCase();

  if (input.length > 2) {
    input = input.slice(0, 2);
  }

  return input;
};

export const formatCurrency = (value: string): string => {
  let input = value.replace(/[^0-9,]/g, "");

  if (input.length > 2) {
    input = input.replace(/,/g, "");
    input = input.replace(/(\d*)(\d{2})$/, "$1,$2");
  }

  if (input.length > 0) {
    input = `R$ ${input}`;
  }

  input = input.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  if (input.endsWith(",")) {
    input = input.slice(0, -1);
  }

  return input;
};

export const parseCurrency = (value: string): number => {
  return Number(
    value
      .replace(/[^\d,-]/g, "")
      .replace("R$", "")
      .replace(".", "")
      .replace(",", "."),
  );
};

export const parseToFormatCurrency = (value: number): string => {
  const numberValue = parseFloat(value.toString().replace(",", "."));

  const fixedNumberValue = numberValue.toFixed(2);
  return `R$ ${fixedNumberValue.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
};

export const formatDateHour = (value: string): string => {
  let input = value.replace(/[^0-9]/g, "");

  if (input.length <= 2) {
    // Formata DD
    input = input.replace(/^(\d{1,2})/, "$1");
  } else if (input.length <= 4) {
    // Formata DD/MM
    input = input.replace(/^(\d{2})(\d{1,2})/, "$1/$2");
  } else if (input.length <= 8) {
    // Formata DD/MM/YYYY
    input = input.replace(/^(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  } else if (input.length <= 10) {
    // Formata HH
    input = input.replace(/^(\d{2})(\d{2})(\d{4})(\d{1,2})/, "$1/$2/$3 $4");
  } else if (input.length < 12) {
    // Formata HH:MM
    input = input.replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{1,2})/, "$1/$2/$3 $4:$5");
  } else if (input.length === 12) {
    input = input.replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/, "$1/$2/$3 $4:$5");
  } else if (input.length > 12) {
    input = input = input
      .slice(0, -1)
      .replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/, "$1/$2/$3 $4:$5");
  }

  return input;
};

export const formatDateHourToISO = (dateString: string): string => {
  if (!dateString) return "";

  const [datePart, timePart] = dateString.split(" ");

  if (!datePart || !timePart) return "";

  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  if (!day || !month || !year || !hour || !minute) return "";

  return `${year}-${month}-${day}T${hour}:${minute}:00`;
};

export const formatISOToDateAndTime = (isoString: string): { date: string; time?: string } => {
  if (!isoString) return { date: "" };
  const [datePart, timePart] = isoString.split("T");

  if (!datePart) return { date: "" };

  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return { date: "" };

  const date = `${day}/${month}/${year}`;

  let time;
  if (timePart) {
    const [hour, minute] = timePart.split(":");
    if (hour && minute) {
      time = `${hour}:${minute}`;
    }
  }

  return time ? { date, time } : { date };
};

export const formatDate = (value: string): string => {
  let input = value.replace(/[^0-9]/g, "");

  if (input.length <= 2) {
    input = input.replace(/^(\d{1,2})/, "$1");
  } else if (input.length <= 4) {
    input = input.replace(/^(\d{2})(\d{1,2})/, "$1/$2");
  } else if (input.length <= 8) {
    input = input.replace(/^(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  } else {
    // Se a string tiver mais de 8 caracteres, limita a 10 (formato DD/MM/YYYY)
    input = input.slice(0, 8).replace(/^(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  }

  return input;
};

export const formatDateToISO = (dateString: string): string => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  if (!day || !month || !year) return "";
  return `${year}-${month}-${day}`;
};
