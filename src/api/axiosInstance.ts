import axios from 'axios';
import history from '../navigate';
const axiosInstance = axios.create({ 
    baseURL: 'https://playground.zenberry.one/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            history.push('/login');
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;