// frontend/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/styles.css';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ModalProvider } from './context/ModalContext';

createRoot(document.getElementById('root')!).render(
  /* 
    1. StrictMode helps identify potential problems in the app.
    2. AuthProvider, NotesProvider, CategoriesProvider, and ModalProvider
       make their respective contexts available throughout the app.
    3. BrowserRouter wraps the entire app, enabling routing capabilities.
  */
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoriesProvider>
          <NotesProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </NotesProvider>
        </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
