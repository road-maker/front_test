/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { AxiosResponse } from 'axios';
import { axiosInstance } from 'axiosInstance';
import { useNavigate } from 'react-router-dom';

import { NewRoadmap, Roadmap } from '../../editor/types';

interface UseRoadmap {
  getRoadmap: (id: number) => Promise<void>;
  postRoadmap: (NewRoadmap: NewRoadmap) => Promise<void>;
}

type ErrorResponse = { message: string };
// type GetResponse = { message: string };
type GetResponse = { message: number };
type RoadMapResponse = { roadmap: Array<Roadmap> } | GetResponse;

export function useRoadmap(): UseRoadmap {
  const SERVER_ERROR = 'error contacting server';
  const navigate = useNavigate();

  async function roadmapServerCall(
    urlEndpoint: string,
    id: number,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<RoadMapResponse> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'GET',
          data: { id },
          headers: { 'Content-Type': 'application/json' },
        });
      if (status === 200) {
        localStorage.setItem(
          'recent_roadmap_search',
          JSON.stringify({ data }), // 검색어에 대한 data 저장하도록
        );
        navigate(`/roadmap/${id}`);
      }
    } catch (errorResponse) {
      console.log(`${SERVER_ERROR}!: ${errorResponse}`);
    }
  }
  async function roadmapPostSeverCall(
    urlEndpoint: string,
    newroadmap: NewRoadmap,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<RoadMapResponse> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { ...newroadmap },
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${getStoredUser()}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaWdudXBAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY5MDk3Nzk2Mn0.5XZmXtA2arG_VsEJN5SwQzBj5P2LHFMvdw4Ha8JZVTY`,
          },
        });
      if (status === 200) {
        console.log(data);
      }
    } catch (errorResponse) {
      console.log(`${SERVER_ERROR}!: ${errorResponse}`);
    }
  }
  async function getRoadmap(id: number): Promise<void> {
    roadmapServerCall(`/roadmaps/load-roadmap/`, id);
  }

  async function postRoadmap(newRoadmap: NewRoadmap): Promise<void> {
    roadmapPostSeverCall(`/roadmaps`, newRoadmap);
  }
  return { postRoadmap, getRoadmap };
}
