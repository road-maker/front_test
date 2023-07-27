/* eslint-disable no-alert */
import jsonpatch from 'fast-json-patch';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { User } from '../../../types/types';
import { useUser } from '../../user/hooks/useUser';

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    // `/user/${originalData.email}`,
    // `/user/${originalData.nickname}`,
    `/member/${originalData.nickname}`,
    { patch },
    {
      headers: getJWTHeader(originalData.accessToken),
    },
  );
  return data.user;
}

export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const { user, updateUser } = useUser();
  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation(
    (newUserData: User) => patchUserOnServer(newUserData, user),
    {
      // onMutate returns context that is passed to onError
      onMutate: async (newData: User | null) => {
        // cancel any outgoing queries for user data, so old server data
        // doesn't overwrite our optimistic update
        queryClient.cancelQueries(queryKeys.user);

        // snapshot of previous user value
        const previousUserData: User = queryClient.getQueryData(queryKeys.user);

        // optimistically update the cache with new user value
        updateUser(newData);

        // return context object with snapshotted value
        return { previousUserData };
      },
      onError: (error, newData, context) => {
        // roll back cache to saved value
        if (context.previousUserData) {
          updateUser(context.previousUserData);
          alert({
            title: 'Update failed; restoring previous values',
            status: 'warning',
          });
        }
      },
      onSuccess: (userData: User | null) => {
        // note: the conditional here should be `userData`, not `user` as shown
        //   in the video.
        // see: https://www.udemy.com/course/learn-react-query/learn/#questions/18361988/
        if (userData) {
          alert('User updated!');
        }
      },
      onSettled: () => {
        // invalidate user query to make sure we're in sync with server data
        queryClient.invalidateQueries(queryKeys.user);
      },
    },
  );

  return patchUser;
}
