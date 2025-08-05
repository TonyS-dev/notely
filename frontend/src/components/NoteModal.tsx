// frontend/src/components/NoteModal.tsx
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import * as api from '../api/apiClient';
import type { NoteModalProps } from '../types';
import { AxiosError } from 'axios';
import { CategorySelector } from './CategorySelector';

const TITLE_MAX_LENGTH = 40;

// NoteModal component for creating and editing notes
export const NoteModal = ({
  isOpen,
  onClose,
  onNoteSaved,
  noteToEdit,
}: NoteModalProps) => {
  // Internal state for the form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  // State for handling loading and API errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = !!noteToEdit;

  // This `useEffect` hook runs whenever the modal is opened.
  // If in "edit" mode, it populates the form with the note's data.
  // If in "create" mode, it clears the form.
  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        setSelectedCategoryIds(noteToEdit.categories.map((cat) => cat.id));
      } else {
        setTitle('');
        setContent('');
        setSelectedCategoryIds([]);
      }
      // Reset error state whenever the modal is opened
      setError('');
    }
  }, [isOpen, noteToEdit, isEditMode]);

  const handleClose = () => {
    if (isClosing) return; // Prevent running multiple times

    setIsClosing(true); // Trigger the closing animation class

    // Wait for the animation to finish before calling the parent's onClose
    setTimeout(() => {
      onClose(); // This actually removes the modal
      setIsClosing(false); // Reset state for the next time it opens
    }, 280);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      setIsLoading(false);
      return;
    }

    try {
      const noteData = { title, content, categoryIds: selectedCategoryIds };

      if (isEditMode) {
        // --- UPDATE LOGIC ---
        await api.updateNote(noteToEdit.id, noteData);
      } else {
        // --- CREATE LOGIC ---
        await api.createNote(noteData);
      }

      onNoteSaved(); // Tell the parent to refresh the notes
      onClose(); // Close this modal
    } catch (err) {
      let errorMessage = 'An unexpected error occurred.';
      if (err instanceof AxiosError && err.response?.data?.message) {
        const serverMessage = err.response.data.message;
        errorMessage = Array.isArray(serverMessage)
          ? serverMessage.join(', ')
          : serverMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // If the modal isn't open, render nothing.
  if (!isOpen) {
    return null;
  }

  // Render the modal with a form for creating or editing a note
  return (
    <div className="modal-overlay active" onClick={handleClose}>
      {/* e.stopPropagation() prevents clicks inside the modal from closing it */}
      <div
        className={`modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="modalTitle">
            {isEditMode ? 'Edit Note' : 'Create New Note'}
          </h3>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <form className="note-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-label-group">
              <label htmlFor="noteTitle">Title *</label>
              <span
                className={`char-counter ${title.length >= TITLE_MAX_LENGTH ? 'limit-reached' : ''}`}
              >
                {title.length} / {TITLE_MAX_LENGTH}
              </span>
            </div>
            <input
              type="text"
              id="noteTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter note title..."
              maxLength={TITLE_MAX_LENGTH}
            />
          </div>

          <div className="form-group">
            <label htmlFor="noteContent">Content *</label>
            <textarea
              id="noteContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your note content here..."
              rows={5}
            ></textarea>
          </div>

          <CategorySelector
            selectedCategoryIds={selectedCategoryIds}
            onCategoriesChange={setSelectedCategoryIds}
          />

          {error && (
            <p
              style={{
                color: 'var(--danger-color)',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : isEditMode
                  ? 'Update Note'
                  : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
