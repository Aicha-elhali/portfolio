'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { ReactNode } from 'react';

// Client-Wrapper für Provider-Komponenten
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
