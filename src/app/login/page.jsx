'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import BASE_PATH from '@/utils/basePath';
import supabase from '../../utils/supabaseClient';

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process?.env?.NEXT_PUBLIC_SITE_URL,
      },
    });

    if (error) {
      console.error('Error logging in with Google:', error);
    } else {
      router.push(`${BASE_PATH}/`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <Button onClick={handleGoogleLogin}>
        <SiGoogle className="mr-2 h-4 w-4" />
        Login with Google
      </Button>
    </div>
  );
};

export default LoginPage;
