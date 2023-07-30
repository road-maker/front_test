// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-console */

// import { AxiosResponse } from 'axios';
// import { axiosInstance } from 'axiosInstance';
// import { useNavigate } from 'react-router-dom';
// import { getStoredUser } from 'storage/user-storage';

// import { NewRoadmap, Roadmap } from '../../editor/types';

// interface UseRoadmap {
//   getProgressRoadmap: (id: number) => Promise<void>;
//   getAllRoadmap: () => Promise<void>;
//   postRoadmap: (NewRoadmap: NewRoadmap) => Promise<void>;
// }

// type GetResponse = { message: number };
// type RoadMapResponse = { roadmap: Array<Roadmap> } | GetResponse;
// // 이거 쓰는 중
// export function useRoadmap(): UseRoadmap {
//   const SERVER_ERROR = 'error contacting server';
//   const navigate = useNavigate();

//   async function roadmapServerCall(
//     urlEndpoint: string,
//     id?: number,
//   ): Promise<void> {
//     try {
//       const { data, status }: AxiosResponse<RoadMapResponse> =
//         await axiosInstance({
//           url: urlEndpoint,
//           method: 'GET',
//           data: { id },
//           headers: { 'Content-Type': 'application/json' },
//         });
//       if (status === 200) {
//         localStorage.setItem(
//           'roadmaps',
//           JSON.stringify({ data }), // 검색어에 대한 data 저장하도록
//         );
//         console.log(data);
//         // console.log('roadmaps', data);
//         // navigate(`/roadmaps`);
//       }
//     } catch (errorResponse) {
//       console.log(`${SERVER_ERROR}!: ${errorResponse}`);
//     }
//   }
//   async function roadmapPostSeverCall(
//     urlEndpoint: string,
//     newroadmap: NewRoadmap,
//   ): Promise<void> {
//     try {
//       const { data, status }: AxiosResponse<RoadMapResponse> =
//         await axiosInstance({
//           url: urlEndpoint,
//           method: 'POST',
//           data: { ...newroadmap },
//           headers: {
//             'Content-Type': 'application/json',
//             // Authorization: `Bearer ${getStoredUser()}`,
//
//           },
//         });
//       if (status === 200) {
//         console.log(data);
//       }
//     } catch (errorResponse) {
//       console.log(`${SERVER_ERROR}!: ${errorResponse}`);
//     }
//   }
//   async function getRoadmap(id: number): Promise<void> {
//     roadmapServerCall(`/roadmaps/load-roadmap/${id}`, id);
//   }
//   async function getAllRoadmap(): Promise<void> {
//     roadmapServerCall(`/roadmaps`);
//   }

//   async function postRoadmap(newRoadmap: NewRoadmap): Promise<void> {
//     roadmapPostSeverCall(`/roadmaps`, newRoadmap);
//   }
//   return { postRoadmap, getRoadmap, getAllRoadmap };
// }
