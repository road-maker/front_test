import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { setStoredUser } from 'storage/user-storage';

import { axiosInstance } from '../axiosInstance';
import { useUser } from '../components/user/hooks/useUser';
import { NewUser, User } from '../types/types';

interface UseAuth {
  signin: (email: string, password: string, nickname?: string) => Promise<void>;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { user: User };
// type NewUserResponse = { user: NewUser };
type ErrorResponse = { message: string };
// type AuthResponseType = UserResponse | ErrorResponse ;
type AuthResponseType = NewUser;

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { user, clearUser, updateUser } = useUser();
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
          },
        });
      if (status === 201 || status === 200) {
        // if ('accessToken' in data) {
        // if ('user' in data) {
        // updateUser(data.accessToken);
        // updateUser(data.user);
        updateUser({ email, nickname, accessToken: data.accessToken });
        // }
        navigate('/');
      }
      // eslint-disable-next-line no-console
      // console.log('authServerCall', data);
      // update stored user data
      // updateUser(data.user);

      // if ('user' in data) {
      //   // update stored user data
      //   updateUser(data.user);
      // }
    } catch (errorResponse) {
      const status =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.status
          ? errorResponse?.response?.status
          : SERVER_ERROR;
      if (status === 409) {
        // eslint-disable-next-line no-alert
        alert('이미 등록된 회원입니다.');
      }
    }
  }
  async function authLoginServerCall(
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
          data: { email, password },
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (status === 201 || status === 200) {
        // const { accessToken } = data.user;
        console.log(data);
        // updateUser({ email, nickname, accessToken: data.accessToken });
        // localStorage.setItem('accessToken', JSON.stringify(data));
        // localStorage.setItem('user', JSON.stringify(data));
        // localStorage.setItem(
        //   'user',
        //   // JSON.stringify(
        //   JSON.stringify({ email, nickname, accessToken: data.accessToken }),
        //   // ),
        // );
        localStorage.setItem(
          'user',
          // JSON.stringify(
          JSON.stringify({ data }),
          // ),
        );
        setStoredUser(data);
        // if (data) {
        //   updateUser({ email, nickname, accessToken: data.accessToken });
        // alert('로그인 성공');
        // navigate('/');
        // }
        // navigate('/');
        // if ('accessToken' in data) {
        // if ('user' in data) {
        //   // update stored user data
        // updateUser(data.user);
        // updateUser({ email, nickname, accessToken: data.accessToken });
        // }
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

  async function signin(
    email: string,
    password: string,
    nickname: string,
  ): Promise<void> {
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
