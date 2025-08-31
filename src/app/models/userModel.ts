export interface UserModel {
  id: number;
  name?: string;
  email?:string;
  password?: string;
  dateCreated?: Date;
  status?: boolean;
}
