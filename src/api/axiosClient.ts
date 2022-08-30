import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from 'const/apiConstants';

export type ApiError = AxiosError & {
    response: {
        data: {
            reason: string
        }
    }
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true,
});

const successCallback = (result: AxiosResponse<unknown, unknown>) => Promise.resolve(result.data);
const errorCallback = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const reason = (error as ApiError).response.data.reason ?? '';
        throw new Error(reason);
    }
};

export const axiosClient = {
    post: (
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ) => axiosInstance.post(url, data, config)
        .then(successCallback, errorCallback),
    put: (
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ) => axiosInstance.put(url, data, config)
        .then(successCallback, errorCallback),
    get: (
        url: string,
        config?: AxiosRequestConfig,
    ) => axiosInstance.get(url, config)
        .then(successCallback, errorCallback),
    delete: (
        url: string,
        config?: AxiosRequestConfig,
    ) => axiosInstance.delete(url, config)
        .then(successCallback, errorCallback),
};
