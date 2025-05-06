import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4062/api';

const authRequestInterceptor = (config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return config;
};

export const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(authRequestInterceptor);
