'use client';

import { useAuth } from '@/context/AuthContext';
import LogoutButton from '@/components/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const HeaderBar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-primary	p-2 flex gap-8 items-center">
      <h1 className="text-3xl text-primary-foreground">
        <a href="/">Inventory Manager</a>
      </h1>
      <nav className="grow">
        <a href="/projects" className="hover:underline text-primary-foreground">
          Projects
        </a>
      </nav>
      {user && (
        <>
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default HeaderBar;
