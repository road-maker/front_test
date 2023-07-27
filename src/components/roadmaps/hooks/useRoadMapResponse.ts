import { useQuery, useQueryClient } from 'react-query';
import {
  clearStoredRoadmap,
  getStoredRoadmap,
  setStoredRoadmap,
} from 'storage/roadmap-storage';

import { queryKeys } from '../../../react-query/constants';
import type { NewRoadmap } from '../../editor/types';
// import type { Roadmap } from '../../editor/types';

interface UseRoadmapData {
  roadmap: NewRoadmap | null;
  updateRoadmapdata: (prompt: NewRoadmap) => void;
  clearRoadmapdata: () => void;
}
export function useRoadmapData(): UseRoadmapData {
  const queryClient = useQueryClient();
  const { data: roadmap } = useQuery(
    queryKeys.roadmap,
    () => getStoredRoadmap(),
    {
      initialData: getStoredRoadmap,
      onSuccess: (received: NewRoadmap | null) => {
        !received ? clearStoredRoadmap() : setStoredRoadmap(received);
      },
    },
  );
  function updateRoadmapdata(newPrompt: NewRoadmap): void {
    queryClient.setQueriesData(queryKeys.prompt, newPrompt);
  }
  function clearRoadmapdata() {
    queryClient.setQueriesData(queryKeys.user, null);
  }

  return { roadmap, updateRoadmapdata, clearRoadmapdata };
}
