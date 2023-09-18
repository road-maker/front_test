// /* eslint-disable no-console */
// /* eslint-disable no-alert */
// import axios, { AxiosResponse } from 'axios';

// import { axiosInstance } from '../../../axiosInstance';
// import type { MemberInfo } from '../../../types/types';
// import { useUser } from './useUser';

// interface CommentInfo {
//   writeComment: (
//     title: string,
//     comment: string,
//     nickname: string,
//   ) => Promise<void>;
// }

// type UserResponse = { data: { member: MemberInfo } };
// type ErrorResponse = { message: string };
// type InfoResponseType = UserResponse | ErrorResponse;

// export function useCommentInfo(): CommentInfo {
//   const SERVER_ERROR = 'There was an error contacting the server.';
//   const { user } = useUser();
//   async function writeCall(
//     urlEndpoint: string,
//     title: string,
//     comment: string,
//     nickname: string,
//   ): Promise<void> {
//     try {
//       const { data, status }: AxiosResponse<InfoResponseType> =
//         await axiosInstance({
//           url: urlEndpoint,
//           method: 'POST',
//           data: { title, comment, nickname },
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${user?.accessToken}`,
//           },
//         });
//       if (status === 201 || status === 200) {
//         // // console.log('useAuth ServiceCall', data);
//         // getStoredUser();
//         // console.log('conmment', data);
//       }
//       // navigate('/');
//     } catch (errorResponse) {
//       const status =
//         axios.isAxiosError(errorResponse) && errorResponse?.response?.status
//           ? errorResponse?.response?.status
//           : SERVER_ERROR;
//       if (status) {
//         // eslint-disable-next-line no-alert
//         alert(`${status}`);
//       }
//     }
//   }
//   async function writeComment(
//     title: string,
//     comment: string,
//     nickname: string,
//   ): Promise<void> {
//     // // console.log('members', member);
//     writeCall(`/comments/save-comment`, title, comment, nickname);
//   }
//   return {
//     writeComment,
//   };
// }
export {};
