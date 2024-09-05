'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BASE_PATH from '@/utils/basePath';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent) => (props) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace(`${BASE_PATH}/login`);
    }
  }, [loading, user, router]);

  if (!user) {
    return null;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
