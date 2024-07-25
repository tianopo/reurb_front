export interface IGeneralModel {
  id?: string;
  createdIn?: Date;
  updated?: Date;
}

export interface IAuthModel extends IGeneralModel {
  email: string;
  token: string;
}
