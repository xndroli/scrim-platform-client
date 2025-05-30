// app/(auth)/reset-password/page.tsx
'use client';

import * as z from 'zod';
import { Suspense } from 'react';
import Loading from '../../loading';
import ResetPasswordForm from '@/components/auth/reset-password';

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  return (
    <div className="relative w-full max-w-md mx-auto z-30">
      <Suspense fallback={ <Loading /> }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
