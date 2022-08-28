import {
    AVATAR_URL, PASSWORD_URL, PROFILE_URL, USER_URL,
} from 'const/apiConstants';
import { axiosClient } from './axiosClient';

export interface IChangeProfileRequest {
    // eslint-disable-next-line camelcase
    first_name: string;
    // eslint-disable-next-line camelcase
    second_name: string;
    // eslint-disable-next-line camelcase
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface IGetUserRequest {
    id: number;
}

export const changeProfile = (data: IChangeProfileRequest) => axiosClient.put(PROFILE_URL, data);

export const changeAvatar = (data: FormData) => axiosClient.put(AVATAR_URL, data, {
    headers: {
        'content-type': 'multipart/form-data',
    },
});

export const changePassword = (data: IChangePasswordRequest) => axiosClient.put(PASSWORD_URL, data);

export const getUser = ({ id }: IGetUserRequest) => axiosClient.get(`${USER_URL}/${id}`);
