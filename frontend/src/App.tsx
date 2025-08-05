// frontend/src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthPage } from './pages/AuthPage';
import { MainContentPage } from './pages/MainContentPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import { AppLayout } from './components/AppLayout';

function App() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    // This dynamically applies the 'auth-view' class for the login page styling
    <div className={`app-container ${isAuthRoute ? 'auth-view' : ''}`}>
      {/* 
        This Toaster component is responsible for rendering the notifications.
        Placing it at the top level makes it available everywhere in the app.
      */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--text-primary)',
            color: 'var(--background-primary)',
            boxShadow: 'var(--shadow-lg)',
            minWidth: '250px',
            fontSize: '18px',
          },
          success: {
            duration: 2000,
          },
        }}
      />
      <Routes>
        {/*
          Public Only Routes:
          - The <PublicRoute> guard PREVENTS authenticated users from seeing these pages.
          - If a logged-in user tries to go to /login, they are redirected to '/'.
        */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Route>

        {/* 
          Protected Routes:
          - The <PrivateRoute> guard REQUIRES authentication.
          - If a user is not logged in, they are redirected to '/login'.
        */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<MainContentPage />} />
            <Route path="archived" element={<MainContentPage />} />
          </Route>
        </Route>

        {/* Catch-all Route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
