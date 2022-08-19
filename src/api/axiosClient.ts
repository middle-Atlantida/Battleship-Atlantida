import axios from 'axios';
import { BASE_URL } from 'const/apiConstants';

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true,
});
