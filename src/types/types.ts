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
export interface GptNode {
  id: string;
  content?: string;
}

export interface NewPrompt {
  keyword: string;
  data?: Array<GptNode | null>;
  // response?: Array<GptNode | null>;
}
export type Prompt = NewPrompt;
