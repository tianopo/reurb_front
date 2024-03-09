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
