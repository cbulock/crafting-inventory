'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography } from 'antd';
import supabase from '../../utils/supabaseClient';

const { Title } = Typography;

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
      <Title level={2}>Login</Title>
      <Button type="primary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </div>
  );
};

export default LoginPage;
