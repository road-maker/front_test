/* eslint-disable no-console */
import { AxiosResponse } from 'axios';
import { axiosInstance } from 'axiosInstance';
import { useUser } from 'components/user/hooks/useUser';
import { useNavigate } from 'react-router-dom';

import { Prompt } from '../../../types/types';

interface UsePrompt {
  getprompt: (keyword: string) => Promise<void>;
}

type PromptResponse = { prompt: Array<Prompt> };

export function usePrompt(): UsePrompt {
  const SERVER_ERROR = 'error contacting server';
  const navigate = useNavigate();
  const { user } = useUser();

  async function promptServerCall(
    urlEndpoint: string,
    keyword: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<PromptResponse> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { keyword },
          // headers: { 'Content-Type': 'application/json' },
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${user.accessToken}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaWdudXBAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY5MDk2Nzg5OH0.coqn_u9t7ir5Qw2Bk6jwD97zuqRYOML1XDv0uPp7TWk`,
          },
        });
      if (status === 200) {
        localStorage.setItem(
          'recent_gpt_search',
          JSON.stringify({ keyword, data }), // 검색어에 대한 data 저장하도록
        );
        // window.onload(navigate(`/roadmap/editor?title=${keyword}`));
        navigate(`/roadmap/editor?title=${keyword}`);
      }
    } catch (errorResponse) {
      console.log(`${SERVER_ERROR}!: ${errorResponse}`);
    }
  }

  async function getprompt(keyword: string): Promise<void> {
    promptServerCall(`/chat?prompt=${keyword}`, keyword);
  }

  return { getprompt };
}
