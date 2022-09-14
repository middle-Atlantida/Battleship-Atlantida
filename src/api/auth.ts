import {
    LOGOUT_URL, SIGNIN_URL, SIGNUP_URL, CURR_USER_URL,
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

export const AuthAPI = {
    signin: (data: ISignInRequest) => axiosClient.post(SIGNIN_URL, data),
    signup: (data: ISignUpRequest) => axiosClient.post(SIGNUP_URL, data),
    logout: () => axiosClient.post(LOGOUT_URL),
    me: () => axiosClient.get(CURR_USER_URL),
};
