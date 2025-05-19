import React from 'react'

const page = () => {
    return (
        <main className="root-container flex min-h-screen flex-col items-center justify-center">
            <h1 className="font-general text-5xl font-bold text-blue-100">
                Whoa, slow down there, speedy!
            </h1>

            <p className="mt-3 max-w-xl text-center text-blue-400">
                Looks like you&apos;ve been a little too eager. We&apos;ve put a 
                temporary pause in your excitement. 🚦 Chill for a bit, and try again shortly.
            </p>
        </main>
    );
};

export default page;