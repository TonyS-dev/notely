// frontend/src/api/apiClient.ts
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      // Redirect to login page or handle unauthorized access
      window.location.replace('/login');
    }
    return Promise.reject(error);
  },
);

// Auth
export const login = (
  email: string,
  password: string,
): Promise<AxiosResponse<{ access_token: string }>> => {
  return apiClient.post('/auth/login', { email, password });
};
export const register = (
  username: string,
  email: string,
  password: string,
): Promise<AxiosResponse> => {
  return apiClient.post('/users', { username, email, password });
};

// Notes
export const getActiveNotes = (): Promise<AxiosResponse> =>
  apiClient.get('/notes/active');

export const getArchivedNotes = (): Promise<AxiosResponse> =>
  apiClient.get('/notes/archived');

export const createNote = (data: unknown): Promise<AxiosResponse> =>
  apiClient.post('/notes', data);

export const updateNote = (id: string, data: unknown): Promise<AxiosResponse> =>
  apiClient.put(`/notes/${id}`, data);

export const deleteNote = (id: string): Promise<AxiosResponse> =>
  apiClient.delete(`/notes/${id}`);

export const archiveNote = (id: string): Promise<AxiosResponse> =>
  apiClient.patch(`/notes/${id}/archive`);

export const unarchiveNote = (id: string): Promise<AxiosResponse> =>
  apiClient.patch(`/notes/${id}/unarchive`);

export const duplicateNote = (id: string): Promise<AxiosResponse> =>
  apiClient.post(`/notes/duplicate/${id}`);

// Categories
export const getCategories = (): Promise<AxiosResponse> =>
  apiClient.get('/categories');

export const createCategory = (data: unknown): Promise<AxiosResponse> =>
  apiClient.post('/categories', data);
