// components/layout/navbar.tsx
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LucideLogOut, LucideUser, LucideUsers, LucideGamepad2 } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Scrim Platform
        </Link>
        
        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard/teams" className="flex items-center gap-2 text-sm font-medium">
                <LucideUsers className="h-4 w-4" />
                <span>Teams</span>
              </Link>
              
              <Link href="/dashboard/scrims" className="flex items-center gap-2 text-sm font-medium">
                <LucideGamepad2 className="h-4 w-4" />
                <span>Scrims</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <Link href="/dashboard/profile" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 rounded-full border">
                    <AvatarImage src={user?.profileImage || ''} alt={user?.username || ''} />
                    <AvatarFallback className="bg-muted">
                      {user?.username.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user?.username}</span>
                </Link>
                
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LucideLogOut className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}