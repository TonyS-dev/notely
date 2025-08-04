// frontend/src/App.tsx
import { useAuth } from './hooks/useAuth';
import { AuthPage } from './pages/AuthPage';
import { Sidebar } from './components/Sidebar';
import { MainContentPage } from './pages/MainContentPage';
import { useState } from 'react';

function App() {
  // Use custom hook to access authentication state and functions
  // This context provides isAuthenticated, user, login, and logout
  const { isAuthenticated, user, login, logout } = useAuth();
  const [showArchived, setShowArchived] = useState(false);

  const handleShowArchived = () => setShowArchived(true);
  const handleShowNotes = () => setShowArchived(false);

  const MainAppLayout = () => (
    <div style={{ display: 'flex', height: '100vh', background: '#f8f9fa' }}>
      <Sidebar
        user={user}
        onLogout={logout}
        onShowArchived={handleShowArchived}
        onShowNotes={handleShowNotes}
      />
      <MainContentPage showArchived={showArchived} />
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
