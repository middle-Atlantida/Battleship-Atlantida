import {
    LOGOUT_URL, SIGNIN_URL, SIGNUP_URL, USER_URL,
} from 'const/apiConstants';
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

export const signin = (data: ISignInRequest) => axiosClient.post(SIGNIN_URL, data);

export const signup = (data: ISignUpRequest) => axiosClient.post(SIGNUP_URL, data);

export const logout = () => axiosClient.post(LOGOUT_URL);

export const user = () => axiosClient.get(USER_URL);
