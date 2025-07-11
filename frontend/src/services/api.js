import axios from 'axios';
import {API_BASE_URL, API_URL} from '../utils/constants';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        // 1. Get the token from localStorage on every request.
        const token = localStorage.getItem('token');

        // 2. If the token exists, add it to the request headers.
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // 3. The request configuration must be returned for the request to proceed.
        return config;
    },
    (error) => {
        // 4. If there's an error in setting up the request, reject the promise.
        return Promise.reject(error);
    }
);

export default apiClient;