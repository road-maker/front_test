import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { MemberInfo, NewUser, User } from '../../../types/types';
import { useUser } from './useUser';

interface useUserInfo {
  myInfo: (memberInfo: NewUser) => Promise<void>;
  // updateInfo: (memberInfo: User) => Promise<void>;
}

type UserResponse = { user: NewUser };
type ErrorResponse = { message: string };
type InfoResponseType = UserResponse | ErrorResponse;

export function UseUserInfo(): useUserInfo {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { user, updateUser } = useUser();

  async function infoCall(
    urlEndpoint: string,
    memberInfo: NewUser,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<InfoResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'GET',
          data: { ...memberInfo },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTAyNTE4NzZ9.ME4EZINEOZ8jaBBFsWulSb2oOkpdqh8TFsRhmV7rut8`,
          },
        });
      if (status === 201 || status === 200) {
        // localStorage.setItem('nickname', JSON.stringify({ data }));
        console.log('useAuth ServiceCall', data);
        // navigate('/');
      }

      // if ('nickname' in data && data.nickname) {
      //   updateUser(user); // 또는 updateUser(data.user.nickname)로 사용자 닉네임만 전달할 수도 있습니다.
      // }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.status
          ? errorResponse?.response?.status
          : SERVER_ERROR;
      if (status) {
        // eslint-disable-next-line no-alert
        alert(`${status}`);
      }
    }
  }
  async function myInfo(memberInfo: NewUser): Promise<void> {
    infoCall(`/members/${memberInfo.nickname}`, memberInfo);
  }

  return {
    myInfo,
    // updateInfo,
  };
}
