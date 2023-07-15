// import { AxiosResponse } from 'axios';
// import { useQuery, useQueryClient } from 'react-query';

// import type { User } from '../../../../../shared/types';
// import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
// import { queryKeys } from '../../../react-query/constants';
// import {
//     clearStoredUser,
//     getStoredUser,
//     setStoredUser,
// } from '../../../user-storage';

// async function getUser(user: User | null): Promise<User | null> {
//   if (!user) return null;
//   const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
//     `/user/${user.id}`, // if there is an user logged in , go to the server and get the user data for the logged in user
//     {
//       headers: getJWTHeader(user),
//     },
//   );
//   return data.user;
// }

// interface UseUser {
//   user: User | null;
//   updateUser: (user: User) => void;
//   clearUser: () => void;
// }

// export function useUser(): UseUser {
//   // TODO: call useQuery to update user data from server
//   // const user = null;
//   const queryClient = useQueryClient();
//   const { data: user } = useQuery(queryKeys.user, () => getUser(user), {
//     initialData: getStoredUser, // use getStoredUser function's result (get user if there is user info in local Storage)
//     onSuccess: (received: User | null) => {
//       // persisting user data to local storage
//       // if (!received) {
//       //   clearStoredUser();
//       // } else {
//       //   setStoredUser(received);
//       // }
//       !received ? clearStoredUser() : setStoredUser(received);
//     },
//   }); // get data from user what ever the data is
//   // but currently, the user is never set in the first place
//   // so the data:user is always going to be falsy, therefore never getting data from the server

//   // meant to be called from useAuth
//   function updateUser(newUser: User): void {
//     // TODO: update the user in the query cache
//     queryClient.setQueriesData(queryKeys.user, newUser);
//   }

//   // meant to be called from useAuth
//   function clearUser() {
//     // TODO: reset user to null in query cache
//     queryClient.setQueryData(queryKeys.user, null);
//     queryClient.removeQueries('user-appointments'); // the user signs out, that userQuery's appointment data will not be available
//     // if we want to remove multiple queries, run removeQueries multiple times
//   }

//   return { user, updateUser, clearUser };
// }
