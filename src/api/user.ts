import { AVATAR_URL } from 'const/apiConstants';
import { axiosClient } from './axiosClient';

export const setAvatar = data => axiosClient.put(AVATAR_URL, data);
