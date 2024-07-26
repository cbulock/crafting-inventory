import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button variant="ghost" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
