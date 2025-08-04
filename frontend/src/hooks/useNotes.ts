// frontend/src/hooks/useNotes.ts
import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/apiClient';
import type { Note } from '../types';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, isLoading, error, refetchNotes: fetchNotes };
};
