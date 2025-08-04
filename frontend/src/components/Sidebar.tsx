// frontend/src/components/Sidebar.tsx
import type { SidebarProps } from '../types';
import { useModal } from '../hooks/useModal';

// !TODO: add more props like the user's name and email

export const Sidebar = ({
  user,
  onLogout,
  onShowArchived,
  onShowNotes,
  showArchived,
}: SidebarProps) => {
  const { openCreateNoteModal } = useModal();
  return (
    <aside className="sidebar">
      <div className="user-profile">
        <img
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.username || 'User'}`}
          alt="user-image"
          className="profile-img"
        />
        <div className="user-info">
          {/* User information from the API */}
          <h3>{user?.username || 'Loading...'}</h3>
          <p>{user?.email || '...'}</p>
        </div>
      </div>

      <button className="new-note" onClick={openCreateNoteModal}>
        + New note
      </button>

      <nav className="sidebar-nav">
        <div className="nav-item">
          <button
            className={`nav-btn ${!showArchived ? 'active' : ''}`}
            onClick={onShowNotes}
          >
            📝 Notes
          </button>
        </div>
        <div className="nav-item">
          <button
            className={`nav-btn ${showArchived ? 'active' : ''}`}
            onClick={onShowArchived}
          >
            📂 Archived
          </button>
        </div>
      </nav>
      <div className="sidebar-footer">
        <button className="about-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};
