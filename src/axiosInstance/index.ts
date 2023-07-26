import axios, { AxiosRequestConfig } from 'axios';
import { User } from 'types/types';

import { baseUrl } from './constants';

// export function getJWTHeader(token: AccessToken): Record<string, string> {
export function getJWTHeader(
  token: User['accessToken'],
): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl, withCredentials: true };
export const axiosInstance = axios.create(config);
