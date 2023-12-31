'use client'

import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from './app/store';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { token } = useUserStore()

  const router = useRouter();

  useEffect(() => {
    if (token) {
      // Redirect to login page if not authenticated
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;


