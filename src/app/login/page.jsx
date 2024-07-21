'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Typography } from 'antd';
import supabase from '../../utils/supabaseClient';

const { Title } = Typography;

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error);
    } else {
      router.push('/dashboard'); // Redirect to dashboard or any other page
    }
  };

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
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email ? errors.email.message : ''}
        >
          <Input
            {...register('email', { required: 'Email is required' })}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password ? errors.password.message : ''}
        >
          <Input.Password
            {...register('password', { required: 'Password is required' })}
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </div>
  );
};

export default LoginPage;
