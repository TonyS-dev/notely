import React, { useState, useRef, useEffect } from 'react';
import type { DropdownMenuProps } from '../types';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onDuplicate,
  onArchive,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="dropdown-menu-wrapper" ref={menuRef}>
      <button
        className="note-action-btn"
        title="More actions"
        onClick={() => setOpen((prev) => !prev)}
      >
        ⋯
      </button>
      {open && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={onDuplicate}>
            📋 Duplicate
          </button>
          <button className="dropdown-item" onClick={onArchive}>
            📁 Archive
          </button>
          <button className="dropdown-item danger" onClick={onDelete}>
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};
