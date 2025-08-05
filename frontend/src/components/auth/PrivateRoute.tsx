// frontend/src/components/auth/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * A component that acts as a guard for protected routes.
 * It checks for user authentication status.
 */
export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If it is still checking for authentication, show a loading indicator.
  // This prevents a "flash" of the login page for already authenticated users.
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

  // If the user is authenticated, render the nested child routes via the <Outlet>.
  // If not, redirect them to the '/login' page.
  // The 'replace' prop prevents the user from going back to the protected route
  // with the browser's back button after being redirected.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
