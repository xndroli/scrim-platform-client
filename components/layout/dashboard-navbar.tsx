// src/components/layout/dashboard-navbar.tsx
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { 
  //LucideUser, 
  LucideUsers, 
  LucideGamepad2, 
  LucideLayoutDashboard, 
  //LucideShieldAlert 
} from 'lucide-react';

export function DashboardNavbar() {
  const { user } = useUser();
  
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Scrim Platform
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
            <LucideLayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          
          <Link href="/dashboard/teams" className="flex items-center gap-2 text-sm font-medium">
            <LucideUsers className="h-4 w-4" />
            <span>Teams</span>
          </Link>
          
          <Link href="/dashboard/scrims" className="flex items-center gap-2 text-sm font-medium">
            <LucideGamepad2 className="h-4 w-4" />
            <span>Scrims</span>
          </Link>
          
          {/* {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-primary">
              <LucideShieldAlert className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          )} */}
          
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm font-medium">{user.username || user.firstName}</span>
            )}
            
            <UserButton />
          </div>
        </nav>
      </div>
    </header>
  );
}