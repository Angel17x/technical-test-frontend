import { IUser } from "@app/shared/interfaces";

export interface IRegister {
  loading: boolean;
  modalShow: boolean;
  user: IUser | undefined;
  error: string | undefined;
}