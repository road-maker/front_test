export interface AccessToken {
  accessToken?: string;
}
export interface NewUser {
  nickname?: string;
  password?: string;
  email?: string;
}
export type User = AccessToken & NewUser;
export interface GptNode {
  id: string;
  content?: string;
}

export interface NewPrompt {
  keyword: string;
  data?: Array<GptNode | null>;
}
export type Prompt = NewPrompt;
