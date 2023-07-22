import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '../axiosInstance';
import { useUser } from '../components/user/hooks/useUser';
import { User } from '../types/types';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { clearUser, updateUser } = useUser();
  const navigate = useNavigate();

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
    nickname?: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { email, password, nickname },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
      if (status === 201) {
        // eslint-disable-next-line no-alert
        alert(`${nickname}님, 환영합니다!`);
        navigate('/users/signin');
      }

      if ('user' in data) {
        // update stored user data
        updateUser(data.user);
      }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.status
          ? errorResponse?.response?.status
          : SERVER_ERROR;
      status === 409
        ? // eslint-disable-next-line no-alert
          alert('이미 등록된 회원입니다.')
        : // eslint-disable-next-line no-alert
          alert('정확한 정보를 입력해주세요.');
      // 403 alert인데 일단 이렇게 해놨어요 나중에 대안이 생기면 바꿔주세요!
    }
  }
  type accessToken = string;
  async function authLoginServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType, accessToken> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { email, password },
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (status === 201 || status === 200) {
        localStorage.setItem('accessToken', JSON.stringify(data));
        // localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
        // eslint-disable-next-line no-console
        console.log(localStorage);
        if ('user' in data && 'accessToken' in data) {
          // update stored user data
          // eslint-disable-next-line no-alert
          alert(`${data.user.nickname}님, 환영합니다!`);
          updateUser(data.user);
        }
      }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.status
          ? errorResponse?.response?.status
          : SERVER_ERROR;
      status === 403
        ? // eslint-disable-next-line no-alert
          alert('이메일과 비밀번호가 일치하지 않습니다.')
        : // eslint-disable-next-line no-alert
          alert(`status code : ${status}!`);
    }
  }

  async function signin(email: string, password: string): Promise<void> {
    authLoginServerCall('/members/signin', email, password);
    // authServerCall('/members/signin', email, password);
  }
  async function signup(
    email: string,
    password: string,
    nickname: string,
  ): Promise<void> {
    authServerCall('/members/signup', email, password, nickname);
  }

  function signout(): void {
    // clear user from stored user data
    clearUser();
    // eslint-disable-next-line no-alert
    alert(`logged out!`);
  }

  return {
    signin,
    signup,
    signout,
  };
}
