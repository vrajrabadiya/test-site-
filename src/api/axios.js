import axios from 'axios';

/**
 * Pre-configured Axios instance for the NeuroRob frontend.
 *
 * The base URL is read from VITE_API_URL when set, otherwise it falls
 * back to a relative path. The instance is configured with sensible
 * defaults for timeouts, JSON headers, and a request interceptor that
 * attaches a Bearer token from localStorage when available.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error logging - replace with toast/notification in production
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[API Error]', error?.response?.data || error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
