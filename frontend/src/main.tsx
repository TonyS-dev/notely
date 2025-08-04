// frontend/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.css';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ModalProvider } from './context/ModalContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CategoriesProvider>
        <NotesProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </NotesProvider>
      </CategoriesProvider>
    </AuthProvider>
  </StrictMode>,
);
