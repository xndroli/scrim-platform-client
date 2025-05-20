// src/components/layout/public-navbar.tsx
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export function PublicNavbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Scrim Platform
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link href="/features">
            <Button variant="ghost">Features</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/register">
            <Button>Sign up</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}