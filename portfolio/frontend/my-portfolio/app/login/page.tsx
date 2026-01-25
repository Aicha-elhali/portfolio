'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import styles from './page.module.css';

// Login page for JWT authentication
// User accounts are created via Postman/Thunder Client
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { login, logout, isLoading, isAuthenticated, user, error } = useAuth();
  const router = useRouter();

  // Submit login form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    try {
      await login(email, password);
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      // Error is set in AuthContext
    }
  };

  // If already logged in, show logout option
  if (isAuthenticated && user) {
    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.loggedIn}>
            <h1 className={styles.title}>Welcome!</h1>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          Sign in to your account
        </p>

        {/* Error message */}
        {(error || localError) && (
          <div className={styles.error}>
            {error || localError}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className={styles.success}>
            {successMessage}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Your password"
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
