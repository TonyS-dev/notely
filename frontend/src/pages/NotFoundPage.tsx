// frontend/src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import React from 'react';

export const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Not Found</h1>
      <p style={styles.text}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={styles.link}>
        Go Back to Home
      </Link>
    </div>
  );
};

// Basic inline styles for the Not Found page
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    alignSelf: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  link: {
    fontSize: '1rem',
    color: '#a2d8ff',
    textDecoration: 'none',
    padding: '10px 20px',
    border: '1px solid #a2d8ff',
    borderRadius: '8px',
    transition: 'background-color 0.3s, color 0.3s',
  },
};
