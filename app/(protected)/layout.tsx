// import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/Header";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {

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