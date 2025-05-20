import { getStoredUser } from "../../src/lib/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { after } from "next/server";
import type { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  // Look for active user session
  const session = await getStoredUser();

  // If user is not logged in, redirect to sign-in page
  if (!session) redirect("/login");

  after(async () => {
    if (!session?.id) return;

    // Get the user and see if last activity date is today
    // const user = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.user_id, session?.user?.id))
    //   .limit(1);

    // If last activity date is today, return (do not perform update)
    // if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
    //   return;

  //   await db
  //     .update(users)
  //     .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
  //     .where(eq(users.user_id, session?.user?.id));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;