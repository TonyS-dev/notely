// frontend/src/components/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../hooks/useAuth';

/**
 * AppLayout serves as the main structural component for the authenticated
 * part of the application. It includes the sidebar and a content area
 * for the routed pages.
 */
export const AppLayout = () => {
  const { user } = useAuth();

  return (
    <div className="main-app-layout">
      <Sidebar user={user} />
      {/* 
        The <Outlet> component from react-router-dom is a placeholder.
        It renders the component of the currently matched child route.
        For example, if the path is '/', it renders <MainContentPage>.
        If the path is '/archived', it also renders <MainContentPage>.
      */}
      <Outlet />
    </div>
  );
};
