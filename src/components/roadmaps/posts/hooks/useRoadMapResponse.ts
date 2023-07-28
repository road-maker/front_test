import { useQuery, useQueryClient } from 'react-query';
import {
  clearStoredRoadmap,
  getStoredRoadmap,
  setStoredRoadmap,
} from 'storage/roadmap-storage';
import { Roadmap } from 'types/types';

import { queryKeys } from '../../../../react-query/constants';
import type { NewRoadmap } from '../../../editor/types';

interface UseRoadmapData {
  roadmapById: Roadmap;
  roadmaps: Roadmap | null;
  updateRoadmapdata: (prompt: NewRoadmap) => void;
  clearRoadmapdata: () => void;
}
export function useRoadmapData(): UseRoadmapData {
  const queryClient = useQueryClient();
  const { data: roadmaps } = useQuery(
    queryKeys.roadmaps,
    () => getStoredRoadmap(),
    {
      initialData: getStoredRoadmap,
      onSuccess: (received: NewRoadmap | null) => {
        !received ? clearStoredRoadmap() : setStoredRoadmap(received);
      },
    },
  );
  const { data: roadmapById } = useQuery(
    queryKeys.roadmapById,
    () => getStoredRoadmap(),
    {
      initialData: getStoredRoadmap,
      onSuccess: (received: NewRoadmap | null) => {
        // console.log('roadmapById', roadmapById);
        // !received ? clearStoredRoadmap() : setStoredRoadmap(received);
      },
    },
  );
  function updateRoadmapdata(newPrompt: NewRoadmap): void {
    queryClient.setQueriesData(queryKeys.roadmaps, newPrompt);
  }
  function clearRoadmapdata() {
    queryClient.setQueriesData(queryKeys.roadmaps, null);
  }

  return { roadmapById, roadmaps, updateRoadmapdata, clearRoadmapdata };
}
