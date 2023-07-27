export interface TokenInfo {
  accessToken?: string;
  grantType?: string;
  refreshToken?: string;
}
export interface NewUser {
  accessToken?: TokenInfo['accessToken'];
  nickname?: string;
  text?: string;
  password?: string;
  email?: string;
}
export interface MemberInfo {
  avatarUrl?: string | null;
  baekjoonId?: string | null;
  bio?: string | null;
  blogUrl?: string | null;
  exp?: number;
  githubUrl?: string | null;
  level?: 0;
}
export interface Roadmap {
  // data?: unknown;
  id?: number;
  thumbnailUrl?: string;
  title?: string;
  recommendedExecutionTimeValue?: number;
  recommendedExecutionTimeUnit?: string;
  text?: string;
  flowkey?: string;
}

export type User = MemberInfo & NewUser;

export interface GptNode {
  id: string;
  content?: string;
}

export interface NewPrompt {
  keyword: string;
  data?: Array<GptNode | null>;
}
export type Prompt = NewPrompt;
