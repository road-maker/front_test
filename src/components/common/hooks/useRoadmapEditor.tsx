/* eslint-disable no-alert */
import axios, { AxiosResponse } from 'axios';
import { useUser } from 'components/user/hooks/useUser';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '../../../axiosInstance/index';
import { Roadmap } from '../../../types/types';

interface UseRoadmap {
  saveRoadmap: (
    title: string,
    description: string,
    flowkey: string,
  ) => Promise<void>;
  getRoadmap: (id: number) => Promise<void>;
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
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

      if (status === 201) {
        // setStoredRoadmap(data.flowkey);
        localStorage.setItem('flowkey', JSON.stringify(data));
        navigate('/');
        alert('Data has been successfully saved!');
        // eslint-disable-next-line no-console
      }
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

  async function roadmapCall(urlEndpoint: string, id: number): Promise<void> {
    try {
      // Adjust the API endpoint URL to fetch the roadmap data from the backend
      const { data, status }: AxiosResponse<RoadmapResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'GET', // Adjust the method according to your API endpoint
          // data: { title, description, flowkey },
          data: { id },
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (status === 200) {
        alert('Data has been successfully loaded!');
        // console.log('roadmapCall', data);
      }
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

  async function getRoadmap(id: number): Promise<void> {
    const idStr = id.toString();
    roadmapCall(`roadmaps/load-roadmap/${idStr}`, id);
  }

  // Return the roadmap methods
  return {
    saveRoadmap,
    getRoadmap,
  };
}
