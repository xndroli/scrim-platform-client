// src/app/(protected)/admin/layout.tsx
'use client';

// import AdminSidebar from '@/components/admin/AdminSidebar';
// import Header from '@/components/admin/Header';
// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
//import { AdminNavbar } from '../../../components/layout/admin-navbar';
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
    // <SidebarProvider>
    <main>
      <div>
        {children}
      </div>
    </main>
    // <main className="flex min-h-screen w-full flex-row">
    //   {/* Admin Sidebar */}
    //   {/* <AdminSidebar /> */}
    //   {/* <AdminNavbar user={user} /> */}

    //   <div className="admin-container">
    //     <main className="flex-1 p-6">
    //       {/* <SidebarTrigger /> */}
    //       {children}
    //     </main>
    //   </div>
    // </main>
    // </SidebarProvider>
  );
}