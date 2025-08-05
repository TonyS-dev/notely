// frontend/src/components/Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import type { SidebarProps } from '../types';
import { useModal } from '../hooks/useModal';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = ({ user }: SidebarProps) => {
  const { openCreateNoteModal } = useModal();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="user-profile">
        <img
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.username || 'User'}`}
          alt="user-image"
          className="profile-img"
        />
        <div className="user-info">
          <h3>{user?.username || 'Loading...'}</h3>
          <p>{user?.email || '...'}</p>
        </div>
      </div>

      <button className="new-note" onClick={openCreateNoteModal}>
        + New note
      </button>

      <div className="nav-footer-wrapper">
        <nav className="sidebar-nav">
          <div className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-btn ${isActive ? 'active' : ''}`
              }
            >
              📝 Notes
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              to="/archived"
              className={({ isActive }) =>
                `nav-btn ${isActive ? 'active' : ''}`
              }
            >
              📂 Archived
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
