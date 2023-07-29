import { useQuery, useQueryClient } from 'react-query';
import {
  clearStoredRoadmap,
  clearStoredRoadmapById,
  getStoredRoadmap,
  getStoredRoadmapById,
  setStoredRoadmap,
  setStoredRoadmapById,
} from 'storage/roadmap-storage';
import { UserRoadmap } from 'types/types';

import { queryKeys } from '../../../../react-query/constants';
import type { NewRoadmap, Roadmap } from '../../../editor/types';

interface UseRoadmapData {
  roadmapById: UserRoadmap;
  roadmaps: Roadmap | null;
  updateRoadmapdata: (roadmap: NewRoadmap | Roadmap) => void;
  updateRoadmapByIdData: (roadmap: NewRoadmap | Roadmap) => void;
  clearRoadmapdata: () => void;
  clearRoadmapByIdData: () => void;
}
export function useRoadmapData(id?: string): UseRoadmapData {
  const queryClient = useQueryClient();
  const { data: roadmaps } = useQuery(
    queryKeys.roadmaps,
    () => getStoredRoadmap(),
    {
      initialData: getStoredRoadmap,
      onSuccess: (received: NewRoadmap | null) => {
        !received ? clearStoredRoadmap() : setStoredRoadmap(received);
      },
      refetchOnMount: 'always',
    },
  );
  const { data: roadmapById } = useQuery(
    queryKeys.roadmapById,
    () => getStoredRoadmapById(),
    {
      initialData: getStoredRoadmapById,
      onSuccess: (received: NewRoadmap | null) => {
        !received ? clearStoredRoadmapById() : setStoredRoadmapById(received);
      },
      // refetchOnMount: 'always',
    },
  );
  function updateRoadmapdata(newRoadmap: NewRoadmap | Roadmap): void {
    queryClient.setQueriesData(queryKeys.roadmaps, newRoadmap);
  }
  function updateRoadmapByIdData(newRoadmap: NewRoadmap | Roadmap): void {
    queryClient.setQueriesData(queryKeys.roadmaps, newRoadmap);
  }
  function clearRoadmapByIdData() {
    queryClient.setQueriesData(queryKeys.roadmapById, null);
  }
  function clearRoadmapdata() {
    queryClient.setQueriesData(queryKeys.roadmaps, null);
  }

  return {
    roadmapById,
    roadmaps,
    updateRoadmapdata,
    updateRoadmapByIdData,
    clearRoadmapdata,
    clearRoadmapByIdData,
  };
}
