'use client';

import { useAuth } from '@/context/AuthContext';
import LogoutButton from '@/components/LogoutButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const HeaderBar = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Crafting Inventory</h1>
      <p>{user?.user_metadata?.name}</p>
      <Avatar>
        <AvatarImage src={user?.user_metadata?.avatar_url} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <LogoutButton />
    </div>
  );
};

export default HeaderBar;
