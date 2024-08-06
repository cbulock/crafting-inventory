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
    <div className="bg-primary	p-2 flex gap-4 items-center">
      <h1 className="text-3xl text-primary-foreground grow">
        Crafting Inventory
      </h1>
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
