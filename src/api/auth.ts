import {
    LOGOUT_URL, SIGNIN_URL, SIGNUP_URL, CURR_USER_URL, OAUTH_ID, OAUTH_AUTH,
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

export interface IOAuthId {
    // eslint-disable-next-line camelcase
    service_id: string,
}

export interface IOAuth {
    // eslint-disable-next-line camelcase
    code: string,
    // eslint-disable-next-line camelcase
    redirect_uri: string
}

export const AuthAPI = {
    signin: async (data: ISignInRequest) => axiosClient.post(SIGNIN_URL, data),
    signup: (data: ISignUpRequest) => axiosClient.post(SIGNUP_URL, data),
    logout: () => axiosClient.post(LOGOUT_URL),
    me: () => axiosClient.get(CURR_USER_URL),
    oAuthId: () => axiosClient.get(OAUTH_ID),
    oAuth: async (data: IOAuth) => axiosClient.post(OAUTH_AUTH, data),
};
