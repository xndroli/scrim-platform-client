// app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    // <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
    //   <AnimatePresence>
    //     {!showForm && (
    //       <motion.button
    //         key="enter-btn"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         exit={{ opacity: 0, y: -20 }}
    //         transition={{ duration: 0.7, ease: 'easeOut' }}
    //         className="px-8 py-4 rounded-lg bg-primary text-white text-2xl font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
    //         onClick={() => setShowForm(true)}
    //       >
    //         Enter
    //       </motion.button>
    //     )}
    //   </AnimatePresence>
    //   <AnimatePresence>
    //     {showForm && (
    //       <motion.div
    //         key="register-form"
    //         initial={{ opacity: 0, y: 40 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         exit={{ opacity: 0, y: 40 }}
    //         transition={{ duration: 0.7, ease: 'easeOut' }}
    //         className="w-full max-w-md"
    //       >
    //         <Card>
    //           <CardHeader className="space-y-1">
    //             <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
    //             <CardDescription className="text-center">
    //               Join Scrim Platform to organize matches and track your gaming performance
    //             </CardDescription>
    //           </CardHeader>
    //           <CardContent className="space-y-4">
    //             <RegisterForm />
    //             <div className="text-center text-sm">
    //               Already have an account?{' '}
    //               <Link href="/login" className="text-primary hover:underline">
    //                 Sign in
    //               </Link>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </motion.div>
    //     )}
    //   </AnimatePresence>
    // </div>
    <div className="flex flex-col items-center justify-center w-full h-full">


      {/* Enter Button */}
      <AnimatePresence>
        {!showForm && (
          <motion.button
            key="enter-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="
              px-8 py-3
              rounded-2xl
              border border-white/30
              bg-gradient-to-r from-[#23244a]/80 to-[#2e2e5e]/80
              text-white
              font-bold
              text-lg
              shadow-lg
              backdrop-blur
              transition
              hover:scale-105
              focus:outline-none
              focus:ring-2
              focus:ring-white/40
            "
            onClick={() => setShowForm(true)}
          >
            Enter Nexus
          </motion.button>
        )}
      </AnimatePresence>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="register-form"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center z-20"
          >
            {/* Modal overlay */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowForm(false)}
            />
            <div className="relative w-full max-w-md mx-auto z-30">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
                  <CardDescription className="text-center">
                    Join Scrim Platform to organize matches and track your gaming performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RegisterForm />
                  <div className="text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}