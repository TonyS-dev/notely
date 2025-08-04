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
