// frontend/src/components/auth/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * A component that acts as a guard for public routes like login and register.
 * It prevents authenticated users from accessing these pages.
 */
export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loader while authentication status is being checked
  if (isLoading) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
          color: 'white',
          fontSize: '1.5rem',
        }}
      ></div>
    );
  }

  // If the user is already authenticated, redirect them away from the public-only
  // pages (like login/register) to the main application dashboard.
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
