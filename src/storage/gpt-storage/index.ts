import { Prompt } from '../../types/types';

const GPT_LOCALSTORAGE_KEY = 'recent_gpt_search';

export function getStoredGpt(prompt: Prompt | null): Prompt | null {
  const storedGpt = localStorage.getItem(GPT_LOCALSTORAGE_KEY);
  return storedGpt ? JSON.parse(storedGpt) : null;
}

export function setStoredGpt(prompt: Prompt): void {
  localStorage.setItem(GPT_LOCALSTORAGE_KEY, JSON.stringify(prompt));
}

export function clearStoredGpt(): void {
  localStorage.removeItem(GPT_LOCALSTORAGE_KEY);
}
