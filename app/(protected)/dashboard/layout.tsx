// src/app/(protected)/dashboard/layout.tsx
'use client';

import { DashboardNavbar } from '@/components/layout/dashboard-navbar';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}