interface IErrorMessages {
  errors?: string;
}

export const ErrorMessages = ({ errors }: IErrorMessages) => {
  if (!errors) {
    return <></>;
  }

  return <span className={`label_required-claro text-12 font-normal`}>{errors}</span>;
};
