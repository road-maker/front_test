export interface Id {
  id: number;
}
export interface NewUser {
  name?: string;
  token?: string;
}
export type User = Id & NewUser;
