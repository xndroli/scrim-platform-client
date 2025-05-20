// src/app/(public)/layout.tsx
// import { PublicNavbar } from '@/components/layout/public-navbar';
//import Link from 'next/link';
//import { Button } from '../../components/ui/button';
//import { Footer } from '../../components/layout/footer';
// import { auth } from "@/auth";
//import { redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // // Look for active user session
  // const session = await auth();

  // // If user is not logged in, redirect to sign-in page
  // if (session) redirect("/dashboard");

  return (
    <div className="root-container min-h-screen">
      {/* <PublicNavbar /> */}
      <main>
        {children}
      </main>
      {/*<Footer />*/}
    </div>
  );
}