// frontend/src/components/AuthPage.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import * as api from '../api/apiClient';
import { AxiosError } from 'axios';
import type { AuthPageProps } from '../types';

// This component needs one function, onLoginSuccess,
// to tell the parent App component
// that the user has successfully logged in.
export function AuthPage({ onLoginSuccess }: AuthPageProps) {
  // State to track if we are showing the Login form or the Register form
  const [isLoginView, setIsLoginView] = useState(true);

  // State for the form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Only for the registration form

  // State for handling loading and error messages
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This function handles both login and registration submissions
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // A helper function to create user-friendly error messages
    const parseErrorMessage = (serverMessage: string): string => {
      if (serverMessage.includes('Key (email)')) {
        return 'An account with this email already exists. Please try to sign in.';
      }
      if (serverMessage.includes('Key (username)')) {
        return 'This username is already taken. Please choose another.';
      }
      // !TODO: Add more specific checks here
      return 'An unexpected error occurred. Please try again.';
    };

    try {
      if (isLoginView) {
        // --- LOGIN LOGIC ---
        const response = await api.login(email, password);
        const token = response.data.access_token;
        localStorage.setItem('accessToken', token);
        onLoginSuccess(token); // Notify the parent App component
      } else {
        // --- REGISTRATION LOGIC ---
        await api.register(username, email, password);
        // After a successful registration, the user is automatically logged in
        const response = await api.login(email, password);
        const token = response.data.access_token;
        localStorage.setItem('accessToken', token);
        onLoginSuccess(token);
      }
    } catch (err) {
      let errorMessage = 'An unexpected error occurred.';
      if (err instanceof AxiosError && err.response?.data?.message) {
        const serverMessage = err.response.data.message;
        // Check for specific error messages
        if (err.response.status === 409) {
          // 409 Conflict
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
      {/* We are using fragments <>...</> to return multiple top-level elements */}
      <div className="particles" id="particles"></div>
      <main id="main">
        <header className="login-header">
          <div className="logo">AS</div>
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

            {/* Conditional Rendering: Only show the username input if it's the registration view */}
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

          {/* Display any error messages from the API */}
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

          {/* This is the toggle link to switch between Login and Register views */}
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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginView(!isLoginView);
                setError(''); // Clear any old errors when switching views
              }}
              style={{
                color: '#2196f3',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {isLoginView ? 'Sign Up' : 'Sign In'}
            </a>
          </p>
        </form>
      </main>
      <footer>
        <p>© 2025 Note App by Antonio Santiago. All rights reserved.</p>
      </footer>
    </>
  );
}
