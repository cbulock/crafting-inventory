import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button variant="ghost" className="text-white" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
