/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { AxiosResponse } from 'axios';
import { axiosInstance } from 'axiosInstance';
import { useUser } from 'components/user/hooks/useUser';
import { useNavigate } from 'react-router-dom';

import { NewRoadmap, Roadmap } from '../../../editor/types';

interface UseRoadmap {
  getRoadmapById: (id: number) => Promise<void>;
  getAllRoadmap: () => Promise<void>;
  postRoadmap: (NewRoadmap: NewRoadmap) => Promise<void>;
}

type ErrorResponse = { message: string };
type GetResponse = { message: number };
type RoadMapResponse = { roadmap: Array<Roadmap> } | GetResponse;
export function useRoadmap(): UseRoadmap {
  const SERVER_ERROR = 'error contacting server';
  const navigate = useNavigate();
  const { user } = useUser();

  async function roadmapServerCall(
    urlEndpoint: string,
    id?: number,
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
        !id
          ? localStorage.setItem('roadmaps', JSON.stringify({ data })) // 모든 로드맵 가져오기
          : localStorage.setItem('roadmapById', JSON.stringify({ data })); // 특정 id의 로드맵 가져오기
        // console.log('useRoadmap', data);
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
            Authorization: `Bearer ${user?.accessToken}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaWdudXBAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY5MDk3Nzk2Mn0.5XZmXtA2arG_VsEJN5SwQzBj5P2LHFMvdw4Ha8JZVTY`,
          },
        });
      if (status === 200) {
        console.log('roadmapPostSeverCall', data);
        alert(data);
      }
    } catch (errorResponse) {
      console.log(`${SERVER_ERROR}!: ${errorResponse}`);
    }
  }
  async function getRoadmapById(id: number): Promise<void> {
    roadmapServerCall(`/roadmaps/load-roadmap/${id}`, id);
  }
  async function getAllRoadmap(): Promise<void> {
    roadmapServerCall(`/roadmaps`);
  }

  async function postRoadmap(newRoadmap: NewRoadmap): Promise<void> {
    roadmapPostSeverCall(`/roadmaps`, newRoadmap);
  }
  return { postRoadmap, getRoadmapById, getAllRoadmap };
}
