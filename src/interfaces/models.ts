interface IGeneralModel {
  id?: string;
  createdIn?: Date;
  updated?: Date;
}

export interface IAuthModel extends IGeneralModel {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterDto {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}
