'use client'

import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from './authService';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      // Redirect to login page if not authenticated
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;


