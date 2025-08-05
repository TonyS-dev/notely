// frontend/src/pages/AuthPage.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as api from '../api/apiClient';
import { AxiosError } from 'axios';

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Determine the view based on the URL, not internal state
  const isLoginView = location.pathname === '/login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const parseErrorMessage = (serverMessage: string): string => {
      if (serverMessage.includes('Key (email)')) {
        return 'An account with this email already exists.';
      }
      if (serverMessage.includes('Key (username)')) {
        return 'This username is already taken. Please choose another.';
      }
      return 'An unexpected error occurred. Please try again.';
    };

    try {
      let token: string;
      if (isLoginView) {
        const response = await api.login(email, password);
        token = response.data.access_token;
      } else {
        await api.register(username, email, password);
        const response = await api.login(email, password);
        token = response.data.access_token;
      }

      login(token);
      navigate('/', { replace: true });
    } catch (err) {
      let errorMessage = 'An unexpected error occurred.';
      if (err instanceof AxiosError && err.response?.data?.message) {
        const serverMessage = err.response.data.message;
        if (err.response.status === 409) {
          errorMessage = parseErrorMessage(serverMessage);
        } else {
          errorMessage = Array.isArray(serverMessage)
            ? serverMessage.join(', ')
            : serverMessage;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="particles" id="particles"></div>
      <main id="main">
        <header className="login-header">
          <div className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="32"
              height="32"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h1 className="login-title">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="login-subtitle">
            {isLoginView
              ? 'Please sign in to your account'
              : 'Get started with your new account'}
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend className="hidden">User Credentials</legend>
            {!isLoginView && (
              <div className="form-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  placeholder="Username"
                  required
                  autoComplete="username"
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Email address"
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Password"
                required
                autoComplete={isLoginView ? 'current-password' : 'new-password'}
              />
            </div>
          </fieldset>

          {error && (
            <p
              style={{
                color: '#ff4757',
                textAlign: 'center',
                marginBottom: '1rem',
                fontWeight: 500,
              }}
            >
              {error}
            </p>
          )}

          <div className="button-container">
            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <span className="button-text">
                {isLoginView ? 'Sign In' : 'Sign Up'}
              </span>
            </button>
            <div className={`button-loader ${isLoading ? 'show' : ''}`}></div>
          </div>

          <p
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '14px',
            }}
          >
            {isLoginView
              ? "Don't have an account? "
              : 'Already have an account? '}
            <Link
              to={isLoginView ? '/register' : '/login'}
              style={{
                color: '#2196f3',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {isLoginView ? 'Sign Up' : 'Sign In'}
            </Link>
          </p>
        </form>
      </main>
      <footer>
        <p>© 2025 Note App by Antonio Santiago. All rights reserved.</p>
      </footer>
    </>
  );
}
