/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';

import { Prompt } from '../../../types/types';

interface UsePrompt {
  getprompt: (keyword: string) => Promise<void>;
}

// async function getRecentPrompt(
//   prompt: Prompt['keyword'] | null,
// ): Promise<Prompts | null> {
//     if (!prompt) return null;
//     const {data} : AxiosResponse<{prompt:Prompt}>= await axiosInstance.post()
// }
type ErrorResponse = { message: string };
type PromptResponse = { prompt: Array<Prompt> };

export function usePrompt(): UsePrompt {
  const SERVER_ERROR = 'error contacting server';
  const { getprompt } = usePrompt();
  const navigate = useNavigate();

  async function promptServerCall(
    urlEndpoint: string,
    keyword: string,
  ): Promise<void> {
    try {
      //   const { data, status }: AxiosResponse<PromptResponse>;
    } catch (errorResponse) {
      console.log(errorResponse);
    }
  }

  return { getprompt };
}

// async function promptServiceCall(urlEndpoint: string, prompt: Prompt) {

// }
