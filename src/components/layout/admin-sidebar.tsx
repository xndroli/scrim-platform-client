// src/components/layout/admin-sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { 
  LucideLayoutDashboard, 
  LucideUsers, 
  LucideUserCog, 
  LucideShield, 
  LucideGamepad2, 
  LucideSettings 
} from 'lucide-react';

const adminItems = [
  {
    title: 'Overview',
    href: '/admin',
    icon: LucideLayoutDashboard,
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: LucideUserCog,
  },
  {
    title: 'Team Management',
    href: '/admin/teams',
    icon: LucideUsers,
  },
  {
    title: 'Scrim Management',
    href: '/admin/scrims',
    icon: LucideGamepad2,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: LucideSettings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  
  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/10">
      <div className="flex h-14 items-center border-b px-4 font-semibold text-primary">
        <LucideShield className="mr-2 h-5 w-5" />
        Admin Panel
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {adminItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
              pathname === item.href
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-muted/50'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}