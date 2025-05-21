import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/Header";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth();
  
  // If user is not logged in, redirect to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">
          {children}
        </div>
      </div>
    </main>
  );
};

export default ProtectedLayout;