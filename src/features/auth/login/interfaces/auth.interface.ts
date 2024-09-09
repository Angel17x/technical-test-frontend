export interface IAuth {
  loading: boolean;
  modalShow: boolean;
  authenticated: boolean;
  token: string | undefined;
  error: string | undefined;
}