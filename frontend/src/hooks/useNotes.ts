// frontend/src/hooks/useNotes.ts
import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/apiClient';
import type { Note } from '../types';
import { useAuth } from '../hooks/useAuth';

const NOTES_PER_PAGE = 9;

export const useNotes = () => {
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);

  const [activePage, setActivePage] = useState(1);
  const [totalActivePages, setTotalActivePages] = useState(1);

  const [archivedPage, setArchivedPage] = useState(1);
  const [totalArchivedPages, setTotalArchivedPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchInitialNotes = useCallback(async () => {
    if (!isAuthenticated) {
      setActiveNotes([]);
      setArchivedNotes([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const [activeRes, archivedRes] = await Promise.all([
        api.getActiveNotes(1, NOTES_PER_PAGE),
        api.getArchivedNotes(1, NOTES_PER_PAGE),
      ]);

      setActiveNotes(activeRes.data.data);
      setTotalActivePages(activeRes.data.totalPages);
      setActivePage(1);

      setArchivedNotes(archivedRes.data.data);
      setTotalArchivedPages(archivedRes.data.totalPages);
      setArchivedPage(1);
    } catch (err) {
      setError('Failed to fetch notes.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const loadMoreActive = async () => {
    if (activePage >= totalActivePages) return;
    const nextPage = activePage + 1;
    const res = await api.getActiveNotes(nextPage, NOTES_PER_PAGE);
    setActiveNotes((prev) => [...prev, ...res.data.data]);
    setActivePage(nextPage);
  };

  const loadMoreArchived = async () => {
    if (archivedPage >= totalArchivedPages) return;
    const nextPage = archivedPage + 1;
    const res = await api.getArchivedNotes(nextPage, NOTES_PER_PAGE);
    setArchivedNotes((prev) => [...prev, ...res.data.data]);
    setArchivedPage(nextPage);
  };

  useEffect(() => {
    fetchInitialNotes();
  }, [fetchInitialNotes]);

  return {
    activeNotes,
    archivedNotes,
    isLoading,
    error,
    refetchNotes: fetchInitialNotes,
    loadMoreActive,
    loadMoreArchived,
    hasMoreActive: activePage < totalActivePages,
    hasMoreArchived: archivedPage < totalArchivedPages,
  };
};
