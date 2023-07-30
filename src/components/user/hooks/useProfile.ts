/* eslint-disable no-console */
/* eslint-disable no-alert */
import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../../../axiosInstance';
import type { NewUser } from '../../../types/types';
import { useUser } from './useUser';

interface useUserInfo {
  myInfo: (member: NewUser) => Promise<void>;
  updateInfo: (memberInfo: NewUser) => Promise<void>;
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
            Authorization: `Bearer ${user?.accessToken}`,
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
  async function infoEditCall(
    urlEndpoint: string,
    memberInfo: NewUser,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<InfoResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { ...memberInfo },
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTExMzQ5NzZ9.vjjUDXsjiF2d2nj8H8dTmByWlDZbLKZ3WGOZjLjNRso',
          },
        });
      if (status === 201 || status === 200) {
        console.log('updateUser', data);
        if ('member' in data) {
          const { member } = data;
          updateUser({
            memberId: member.memberId,
            avatarUrl: member.avatarUrl,
            baekjoonId: member.baekjoonId,
            bio: member.bio,
            blogUrl: member.blogUrl,
            email: member.email,
            exp: member.exp,
            githubUrl: member.githubUrl,
            level: member.level,
            nickname: member.nickname,
            inProcessRoadmapDto: member.inProcessRoadmapDto,
          });
        }
        alert('변경되었습니다!');
        // navigate('/');
      }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.status
          ? errorResponse?.response?.status
          : SERVER_ERROR;
      if (status === 406) {
        // eslint-disable-next-line no-alert
        alert('이전과 다른 닉네임을 설정해주세요!');
      } else if (status === 409) {
        alert('이미 존재하는 닉네임입니다.');
      } else {
        alert(`${status}`);
      }
    }
  }
  async function myInfo(member: NewUser): Promise<void> {
    // console.log('members', member);
    infoCall(`/members/${member?.nickname}`, member);
  }
  async function updateInfo(member: NewUser): Promise<void> {
    console.log('updatemembers', member);
    await infoEditCall(`/members/save-profile`, member);
  }
  return {
    myInfo,
    updateInfo,
  };
}
