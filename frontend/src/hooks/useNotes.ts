// frontend/src/hooks/useNotes.ts
import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/apiClient';
import type { Note } from '../types';
import { useAuth } from '../hooks/useAuth';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, token } = useAuth();

  const fetchNotes = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setNotes([]);
      setIsLoading(false);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getActiveNotes();
      setNotes(response.data);
    } catch (err) {
      setError('Failed to fetch notes.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, isLoading, error, refetchNotes: fetchNotes };
};
