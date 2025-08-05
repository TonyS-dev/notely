import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
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

// Update note-fetching functions to accept pagination params
export const getActiveNotes = (
  page: number,
  limit: number,
): Promise<AxiosResponse> =>
  apiClient.get('/notes/active', { params: { page, limit } });

export const getArchivedNotes = (
  page: number,
  limit: number,
): Promise<AxiosResponse> =>
  apiClient.get('/notes/archived', { params: { page, limit } });

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
