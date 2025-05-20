// src/app/(protected)/dashboard/layout.tsx
'use client';

import { DashboardNavbar } from '../../../src/components/layout/dashboard-navbar';
import { Sidebar } from '../../../src/components/layout/sidebar';
import { useAuth } from '../../../src/hooks/useAuth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}