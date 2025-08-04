// frontend/src/services/api.ts
import axios from 'axios';
import type {
  CreateCategoryData,
  CreateNoteData,
  UpdateNoteData,
} from '../types';

const API_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_URL) {
  throw new Error('VITE_API_BASE_URL is not defined in .env file');
}

const apiClient = axios.create({
  baseURL: API_URL,
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

// Interceptor to handle 401 Unauthorized errors
apiClient.interceptors.response.use(
  // On success, just return the response
  (response) => response,
  // On error, handle it globally
  (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized error AND ensure it's not a retry AND it's not the login page
    if (
      error.response?.status === 401 &&
      originalRequest.url !== '/auth/login'
    ) {
      console.error(
        'Session expired or token is invalid. Redirecting to login.',
      );
      // This is where you would trigger a global logout
      // Forcing a page reload to the root is a simple way to do it.
      localStorage.removeItem('accessToken');
      window.location.href = '/';
      // Important: Return a new promise to prevent the original caller's .catch from firing
      return new Promise(() => {});
    }

    // For all other errors (including 401 on the login page), just pass them along
    return Promise.reject(error);
  },
);

// --- API Functions with Types ---

// --- AUTHENTICATION ---
export const login = (email: string, password: string) =>
  apiClient.post('/auth/login', { email, password });

export const register = (username: string, email: string, password: string) =>
  apiClient.post('/users', { username, email, password });

// --- NOTES ---
export const getActiveNotes = () => apiClient.get('/notes/active');
export const getArchivedNotes = () => apiClient.get('/notes/archived');

export const createNote = (noteData: CreateNoteData) =>
  apiClient.post('/notes', noteData);

export const duplicateNote = (noteId: string) =>
  apiClient.post(`/notes/duplicate/${noteId}`);

export const updateNote = (noteId: string, noteData: UpdateNoteData) =>
  apiClient.put(`/notes/${noteId}`, noteData);

export const archiveNote = (noteId: string) =>
  apiClient.patch(`/notes/${noteId}/archive`);

export const unarchiveNote = (noteId: string) =>
  apiClient.patch(`/notes/${noteId}/unarchive`);

export const deleteNote = (noteId: string) =>
  apiClient.delete(`/notes/${noteId}`);

// --- CATEGORIES ---
export const createCategory = (categoryData: CreateCategoryData) =>
  apiClient.post('/categories', categoryData);

export const getCategories = () => apiClient.get('/categories');
