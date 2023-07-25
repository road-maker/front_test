export interface AccessToken {
  accessToken?: string;
}
export interface NewUser {
  nickname?: string;
  text?: string;
  bjid?: string;
  // accessToken?: string;
  password?: string;
  email?: string;
}
export interface Map {
  text?: string;
  flowkey?: string;
}

export type Roadmap = Map;

export type User = AccessToken & NewUser;

// export type User = Id & NewUser;

export interface GptNode {
  id: string;
  content?: string;
}

export interface NewPrompt {
  keyword: string;
  data?: Array<GptNode | null>;
}
export type Prompt = NewPrompt;
