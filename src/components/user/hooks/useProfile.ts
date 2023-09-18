/* eslint-disable no-console */
/* eslint-disable no-alert */
import axios, { AxiosResponse } from 'axios';

import { axiosInstance } from '../../../axiosInstance';
import type { MemberInfo, NewUser } from '../../../types/types';
import { useUser } from './useUser';

interface useUserInfo {
  myInfo: (member: NewUser) => Promise<void>;
  updateInfo: (memberInfo: NewUser) => Promise<void>;
}

type UserResponse = { data: { member: MemberInfo } };
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
      if (status === 201 || status === 200) {
        // // console.log('useAuth ServiceCall', data);
        // getStoredUser();
        if ('member' in data) {
          const updateMember: NewUser = data.member;
          updateUser({
            avatarUrl: updateMember.avatarUrl,
            baekjoonId: updateMember.baekjoonId,
            bio: updateMember.bio,
            email: updateMember.email,
            nickname: updateMember.nickname,
            blogUrl: updateMember.blogUrl,
          });
        }
      }
      // navigate('/');
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
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
      if (status === 201) {
        // console.log('updateUser', data);
        if ('member' in data) {
          const updateMember: NewUser = data.member;
          updateUser({
            avatarUrl: updateMember.avatarUrl,
            baekjoonId: updateMember.baekjoonId,
            bio: updateMember.bio,
            email: updateMember.email,
            nickname: updateMember.nickname,
            blogUrl: updateMember.blogUrl,
          });
        }
        alert('변경되었습니다!');
        // navigate('/');
      }
      if (status === 409) {
        alert('이미 존재하는 닉네임입니다.');
      }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.status
          ? errorResponse?.response?.status
          : SERVER_ERROR;
    }
  }
  async function myInfo(member: NewUser): Promise<void> {
    // // console.log('members', member);
    infoCall(`/members/${member?.nickname}`, member);
  }
  async function updateInfo(member: NewUser): Promise<void> {
    // console.log('updatemembers', member);
    await infoEditCall(`/members/save-profile`, member);
  }
  return {
    myInfo,
    updateInfo,
  };
}
