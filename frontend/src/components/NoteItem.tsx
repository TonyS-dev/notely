// frontend/src/components/NoteItem.tsx
import type { NoteItemProps } from '../types';
import { useRef, useState, useEffect } from 'react';
import { DropdownMenu } from './DropdownMenu';

export const NoteItem = ({
  note,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
}: NoteItemProps) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="note-item">
      <div className="note-header">
        <p className="date">{formattedDate}</p>
        <div className="note-actions">
          <button
            className="note-action-btn"
            title="Edit"
            onClick={() => onEdit(note)}
          >
            ✏️
          </button>
          <DropdownMenu
            onDuplicate={() => onDuplicate(note)}
            onArchive={() => onArchive(note)}
            onDelete={() => onDelete(note)}
          />
        </div>
      </div>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div className="categories">
        {note.categories.map((cat) => (
          <div key={cat.id} className="note-category">
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};
