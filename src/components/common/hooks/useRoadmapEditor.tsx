/* eslint-disable no-alert */
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '../../../axiosInstance/index';
import { Roadmap } from '../../../types/types';
import { useUser } from '../../user/hooks/useUser';

interface UseRoadmap {
  saveRoadmap: (
    title: string,
    description: string,
    flowkey: string,
  ) => Promise<void>;
  getRoadmap: (
    title: string,
    description: string,
    flowkey: string,
  ) => Promise<void>;
}

type RoadmapResponse = { roadmap: Roadmap };
type ErrorResponse = { message: string };
type RoadmapResponseType = RoadmapResponse | ErrorResponse;

export function useRoadmap(): UseRoadmap {
  const SERVER_ERROR = 'There was an error contacting the server.';
  // const { updateUser } = useUser();
  const navigate = useNavigate();
  const { user } = useUser();
  async function roadmapServerCall(
    urlEndpoint: string,
    title: string,
    description: string,
    flowkey: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<RoadmapResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: {
            title,
            description,
            flowkey,
          },
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // Authorization: `Bearer ${localStorage.getItem('user')}`,
            // Authorization: `Bearer ${user.accessToken}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaWdudXBAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY5MDk3Nzk2Mn0.5XZmXtA2arG_VsEJN5SwQzBj5P2LHFMvdw4Ha8JZVTY`,
          },
        });

      if (status === 201) {
        localStorage.setItem('flowkey', JSON.stringify(data));
        // localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
        alert('Data has been successfully saved!');
        // eslint-disable-next-line no-console
      }
      // if ('user' in data) {
      // update stored user data
      // updateUser(data.user);
      // updateUser(data.user);
      // updateUser(data);
      // }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : SERVER_ERROR;
      status === 403
        ? // eslint-disable-next-line no-alert
          alert(`${status}`)
        : // eslint-disable-next-line no-alert
          alert(`${status}`);
    }
  }

  async function RoadmapCall(
    urlEndpoint: string,
    title: string,
    description: string,
    flowkey: string,
  ): Promise<void> {
    try {
      // Adjust the API endpoint URL to fetch the roadmap data from the backend
      const { data, status }: AxiosResponse<RoadmapResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'GET', // Adjust the method according to your API endpoint
          data: { title, description, flowkey },
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // Authorization: `Bearer ${localStorage.getItem('user')}`,
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

      if (status === 400) {
        alert('Data has been successfully loaded!');
      }

      if ('user' in data) {
        // update stored user data
        // updateUser(data.user);
      }
      // if ('roadmap' in data) {
      //   updateUser(data.roadmap);
      // }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : SERVER_ERROR;
      status === 403
        ? // eslint-disable-next-line no-alert
          alert(`${status}`)
        : // eslint-disable-next-line no-alert
          alert(`${status}`);
    }
  }
  async function saveRoadmap(
    title: string,
    description: string,
    flowkey: string,
  ): Promise<void> {
    roadmapServerCall('roadmaps', title, description, flowkey);
  }

  async function getRoadmap(
    title: string,
    description: string,
    flowkey: string,
  ): Promise<void> {
    RoadmapCall(
      'roadmaps/load-roadmap/:roadmapId',
      title,
      description,
      flowkey,
    );
  }

  // Return the roadmap methods
  return {
    saveRoadmap,
    getRoadmap,
  };
}
