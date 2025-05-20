// src/app/(public)/layout.tsx
// import { PublicNavbar } from '@/components/layout/public-navbar';
//import Link from 'next/link';
//import { Button } from '../../components/ui/button';
//import { Footer } from '../../components/layout/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <PublicNavbar /> */}
      <main className="flex-1">{children}</main>
      {/*<Footer />*/}
    </div>
  );
}