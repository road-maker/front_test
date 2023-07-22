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

export interface NewPrompt {
  keyword: string;
  content?: string;
}
export type Prompt = Id & NewPrompt;
