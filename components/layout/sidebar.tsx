// components/layout/sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { 
  LucideHome, 
  LucideUser, 
  LucideUsers, 
  LucideGamepad2, 
  LucideSettings
} from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LucideHome,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: LucideUser,
  },
  {
    title: 'Teams',
    href: '/dashboard/teams',
    icon: LucideUsers,
  },
  {
    title: 'Scrims',
    href: '/dashboard/scrims',
    icon: LucideGamepad2,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: LucideSettings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/10">
      <div className="flex h-14 items-center border-b px-4 font-semibold">
        Dashboard
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => (
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