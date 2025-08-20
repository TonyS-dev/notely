import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
} from 'axios';
import toast from 'react-hot-toast';

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
      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  },
);

/**
 * A centralized wrapper for API calls that automatically provides
 * loading, success, and error toast notifications.
 */
const showNotification = async <T>(
  apiCall: Promise<AxiosResponse<T>>,
  messages: { loading: string; success: string; error: string },
): Promise<AxiosResponse<T>> => {
  return toast.promise(apiCall, {
    loading: messages.loading,
    success: messages.success,
    error: (err: unknown) => {
      // Then, we check if it's an AxiosError before accessing its properties.
      if (err instanceof AxiosError && err.response?.data?.message) {
        const serverMessage = err.response.data.message;
        return Array.isArray(serverMessage)
          ? serverMessage.join(', ')
          : serverMessage;
      }
      // If it's not an AxiosError or has no message, we return the generic fallback.
      return messages.error;
    },
  });
};

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
  showNotification(apiClient.post('/notes', data), {
    loading: 'Creating note...',
    success: 'Note created!',
    error: 'Failed to create note.',
  });

export const updateNote = (id: string, data: unknown): Promise<AxiosResponse> =>
  showNotification(apiClient.put(`/notes/${id}`, data), {
    loading: 'Updating note...',
    success: 'Note updated!',
    error: 'Failed to update note.',
  });

export const deleteNote = (id: string): Promise<AxiosResponse> =>
  showNotification(apiClient.delete(`/notes/${id}`), {
    loading: 'Deleting note...',
    success: 'Note deleted!',
    error: 'Failed to delete note.',
  });

export const archiveNote = (id: string): Promise<AxiosResponse> =>
  showNotification(apiClient.patch(`/notes/${id}/archive`), {
    loading: 'Archiving note...',
    success: 'Note archived!',
    error: 'Failed to archive note.',
  });

export const unarchiveNote = (id: string): Promise<AxiosResponse> =>
  showNotification(apiClient.patch(`/notes/${id}/unarchive`), {
    loading: 'Unarchiving note...',
    success: 'Note unarchived!',
    error: 'Failed to unarchive note.',
  });

export const duplicateNote = (id: string): Promise<AxiosResponse> =>
  showNotification(apiClient.post(`/notes/duplicate/${id}`), {
    loading: 'Duplicating note...',
    success: 'Note duplicated!',
    error: 'Failed to duplicate note.',
  });

// Categories
export const getCategories = (): Promise<AxiosResponse> =>
  apiClient.get('/categories');

export const createCategory = (data: unknown): Promise<AxiosResponse> =>
  showNotification(apiClient.post('/categories', data), {
    loading: 'Creating category...',
    success: 'Category created!',
    error: 'Failed to create category.',
  });
