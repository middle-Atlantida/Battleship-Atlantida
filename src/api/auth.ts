import { axiosClient } from './axiosClient';

export interface ISignInRequest {
  login: string
  password: string
}

export interface ISignUpRequest {
  // eslint-disable-next-line camelcase
  first_name: string,
  // eslint-disable-next-line camelcase
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export const signin = (data: ISignInRequest) => axiosClient.post('auth/signin', data);

export const signup = (data: ISignUpRequest) => axiosClient.post('auth/signup', data);

export const logout = () => axiosClient.post('auth/logout');

export const user = () => axiosClient.get('auth/user');
