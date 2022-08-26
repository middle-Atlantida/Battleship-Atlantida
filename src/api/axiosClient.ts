import axios, { AxiosError } from 'axios';
import { BASE_URL } from 'const/apiConstants';

export type ApiError = AxiosError & {
    response: {
        data: {
            reason: string
        }
    }
}

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true,
});
