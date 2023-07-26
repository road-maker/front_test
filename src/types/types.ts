// User 관련

// export interface AccessToken {
//   accessToken?: string;
// }
export interface NewUser {
  nickname?: string;
  text?: string; //
  bjid?: string;
  accessToken?: string;
  password?: string;
  email?: string;
}

// export type User = AccessToken & NewUser;
export type User = NewUser;
// export type User = Id & NewUser; // Id == email임

// Roadmap 관련

export interface Map {
  text?: string;
  flowkey?: string;
}

export type Roadmap = Map;

// GPT 관련

export interface GptNode {
  id: string;
  content?: string;
}
export interface NewPrompt {
  keyword: string;
  data?: Array<GptNode | null>;
}

export type Prompt = NewPrompt & User;
