import axios from 'axios';
import { BASE_URL } from 'const/baseUrl';

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    timeout: 2000,
    withCredentials: true,
});
