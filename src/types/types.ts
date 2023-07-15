export interface Id {
  id: number;
}
export interface NewUser {
  token?: string;
  password?: string;
  email?: string;
}
export type User = Id & NewUser;
