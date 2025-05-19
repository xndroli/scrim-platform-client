import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  // Look for active user session
  const session = await auth();

  // If user is not logged in, redirect to sign-in page
  if (session) redirect("/dashboard");

  return (
    <main className="root-container">
      {children}
    </main>
  );
};

export default Layout;