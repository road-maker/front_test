import axios, { AxiosRequestConfig } from 'axios';

import { User } from '../types/types';
import { baseUrl } from './constants';

export function getJWTHeader(user: User): Record<string, string> {
  return { Authorization: `Bearer ${user.accessToken}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl, withCredentials: true };
export const axiosInstance = axios.create(config);
