import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { getStoredUser } from 'storage/user-storage';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { NewUser, User } from '../../../types/types';
import { useUser } from './useUser';

interface useUserInfo {
  myInfo: (member: NewUser) => Promise<void>;
  // updateInfo: (memberInfo: User) => Promise<void>;
}

type UserResponse = { member: NewUser };
type ErrorResponse = { message: string };
type InfoResponseType = UserResponse | ErrorResponse;

export function UseUserInfo(): useUserInfo {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { user, updateUser } = useUser();
  async function infoCall(
    urlEndpoint: string,
    memberInfo: NewUser,
    email?: string,
    nickname?: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<InfoResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTAyNTE4NzZ9.ME4EZINEOZ8jaBBFsWulSb2oOkpdqh8TFsRhmV7rut8',
          },
        });
      if (status === 201 || status === 200) {
        console.log('useAuth ServiceCall', data);
        getStoredUser();
        if ('member' in data) {
          const { member } = data;
          updateUser({
            memberId: member.memberId,
            avatarUrl: member.avatarUrl || '',
            baekjoonId: member.baekjoonId || '',
            bio: member.bio || '',
            blogUrl: member.blogUrl || '',
            email: member.email || '',
            exp: member.exp || 0,
            githubUrl: member.githubUrl || '',
            level: member.level || 0,
            nickname: member.nickname || '',
            inProcessRoadmapDto: member.inProcessRoadmapDto || [],
          });
        }
        // navigate('/');
      }
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
  async function myInfo(member: NewUser): Promise<void> {
    console.log('members', member);
    infoCall(`/members/${member?.nickname}`, member);
  }

  return {
    myInfo,
    // updateInfo,
  };
}
