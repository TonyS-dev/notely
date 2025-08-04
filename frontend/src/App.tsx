// frontend/src/App.tsx
import { useAuth } from './hooks/useAuth';
import { AuthPage } from './pages/AuthPage';
import { Sidebar } from './components/Sidebar';
import { MainContentPage } from './pages/MainContentPage';

function App() {
  // Use custom hook to access authentication state and functions
  // This context provides isAuthenticated, user, login, and logout
  const { isAuthenticated, user, login, logout } = useAuth();

  const MainAppLayout = () => (
    <div style={{ display: 'flex', height: '100vh', background: '#f8f9fa' }}>
      <Sidebar user={user} onLogout={logout} />
      <MainContentPage />
    </div>
  );

  return (
    <div className="app-container">
      {/* 
        - If not authenticated, show AuthPage and give it the 'login' function from our context.
        - If authenticated, show the main app layout.
      */}
      {!isAuthenticated ? (
        <AuthPage onLoginSuccess={login} />
      ) : (
        <MainAppLayout />
      )}
    </div>
  );
}

export default App;
