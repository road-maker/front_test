export interface Id {
  id?: number;
}
export interface NewUser {
  nickname?: string;
  accessToken?: string;
  password?: string;
  email?: string;
}
export type User = Id & NewUser;
