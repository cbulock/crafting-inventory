'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import supabase from '../../utils/supabaseClient';

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in with Google:', error);
    } else {
      router.push('/');
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
