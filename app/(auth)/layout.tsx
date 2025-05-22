import type { ReactNode } from 'react'
import Image from 'next/image';
// import { auth } from '@/auth';
// import { redirect } from 'next/navigation';

const Layout = async ({ children }: { children: ReactNode }) => {
    // Look for active user session
    // const session = await auth();

    // If user is logged in, redirect to home page
    // if (session) redirect("/");

    return (
        <main className="auth-container">
            <section className="auth-form">
                <div className="auth-box">
                    <div className="flex flex-row gap-3">
                        {/* <Image src="/images/logo.png" alt="logo" width={64} height={64} /> */}
                        <h1 className="text-4xl font-zentry font-semibold text-white">V<b>e</b>xus</h1>
                    </div>

                    <div>{children}</div>
                </div>
            </section>

            {/* <section className="auth-illustration">
                <Image 
                    src="/images/swordman.webp" 
                    alt="illustration" 
                    width={1000} 
                    height={1000} 
                    className="size-full object-cover"
                />
            </section> */}

            <footer className="absolute bottom-0 w-screen overflow-x-hidden">
                <div className="w-screen py-4">
                    <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-2 md:flex-row">
                        <Image src="/images/logo.png" alt="logo" width={48} height={48} />
                        
                        <p className="text-center text-sm text-white">
                            © 2025 Raijin. All rights reserved.
                        </p>

                    </div>
                </div>
            </footer>
        </main>
    );
};

export default Layout;