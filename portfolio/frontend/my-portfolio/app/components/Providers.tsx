'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { ReactNode } from 'react';

// Client wrapper for provider components
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
