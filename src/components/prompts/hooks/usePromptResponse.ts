import { useQuery, useQueryClient } from 'react-query';

import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredGpt,
  getStoredGpt,
  setStoredGpt,
} from '../../../storage/gpt-storage';
import type { Prompt } from '../../../types/types';

interface UsePromptAnswer {
  prompt: Prompt | null;
  updateGptAnswer: (prompt: Prompt) => void;
  clearGptAnswer: () => void;
}
export function usePromptAnswer(): UsePromptAnswer {
  const queryClient = useQueryClient();
  const { data: prompt } = useQuery(
    queryKeys.prompt,
    () => getStoredGpt(prompt),
    {
      initialData: getStoredGpt,
      onSuccess: (received: Prompt | null) => {
        !received ? clearStoredGpt() : setStoredGpt(received);
      },
    },
  );
  function updateGptAnswer(newPrompt: Prompt): void {
    queryClient.setQueriesData(queryKeys.prompt, newPrompt);
  }
  function clearGptAnswer() {
    queryClient.setQueriesData(queryKeys.user, null);
  }

  return { prompt, updateGptAnswer, clearGptAnswer };
}
