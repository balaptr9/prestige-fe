import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await apiClient.post('/auth/refresh-token', {
                        refresh_token: refreshToken,
                    });

                    const { token } = response.data;
                    localStorage.setItem('accessToken', token);

                    // Retry original request
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // Redirect to login
                localStorage.clear();
                window.location.href = '/login';
            }
        }

        // Handle other errors
        if (error.response?.status === 500) {
            toast.error('Server error. Please try again later.');
        } else if (error.response?.status === 404) {
            toast.error('Resource not found.');
        } else if (error.message === 'Network Error') {
            toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

export default apiClient;