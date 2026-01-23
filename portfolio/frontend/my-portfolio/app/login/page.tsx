'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import styles from './page.module.css';

// Login/Signup Seite für JWT-Authentifizierung
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { login, signup, logout, isLoading, isAuthenticated, user, error } = useAuth();
  const router = useRouter();

  // Formular absenden
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    try {
      if (isLogin) {
        await login(email, password);
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        if (!name.trim()) {
          setLocalError('Please enter your name');
          return;
        }
        await signup(name, email, password);
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } catch (err) {
      // Fehler wird im AuthContext gesetzt
    }
  };

  // Tab wechseln zwischen Login und Signup
  const switchTab = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setLocalError(null);
    setSuccessMessage(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  // Falls bereits eingeloggt, Logout-Option anzeigen
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
        <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className={styles.subtitle}>
          {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
        </p>

        {/* Tabs für Login/Signup */}
        <div className={styles.tabs}>
          <button
            className={isLogin ? styles.tabActive : styles.tab}
            onClick={() => switchTab(true)}
          >
            Sign In
          </button>
          <button
            className={!isLogin ? styles.tabActive : styles.tab}
            onClick={() => switchTab(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Fehlermeldung */}
        {(error || localError) && (
          <div className={styles.error}>
            {error || localError}
          </div>
        )}

        {/* Erfolgsmeldung */}
        {successMessage && (
          <div className={styles.success}>
            {successMessage}
          </div>
        )}

        {/* Formular */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name nur bei Signup */}
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Your name"
                disabled={isLoading}
              />
            </div>
          )}

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
              placeholder={isLogin ? 'Your password' : 'Min. 6 characters'}
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
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
}
