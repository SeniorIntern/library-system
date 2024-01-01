'use client'

import { PropsWithChildren, useEffect } from 'react';
import { redirect } from 'next/navigation';
import useUserStore from './app/store';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { token } = useUserStore()

  useEffect(() => {
    if (token) {
      // Redirect to login page if not authenticated
      redirect('/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;


