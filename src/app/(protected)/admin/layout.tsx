// src/app/(protected)/admin/layout.tsx
'use client';

//import { AdminNavbar } from '../../../components/layout/admin-navbar';
import { AdminSidebar } from '../../../components/layout/admin-sidebar';
//import { useAuth } from '../../../hooks/useAuth';
//import { redirect } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const { user, isAdmin } = useAuth();
  //const { user } = useAuth();
  
  // Redirect non-admin users
  // if (!isAdmin) {
  //   redirect('/dashboard');
  //   return null;
  // }
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* <AdminNavbar user={user} /> */}
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}