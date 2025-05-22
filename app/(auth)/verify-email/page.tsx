// app/(auth)/verify-email/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setIsVerifying(false)
        return
      }
      
      try {
        const result = await authClient.verifyEmail({
          query: {
            token
          }
        })
        
        if (result.error) {
          toast.error(result.error.message || 'Email verification failed')
        } else {
          setIsVerified(true)
          toast.success('Email verified successfully!')
        }
      } catch (error) {
        toast.error('An unexpected error occurred')
      } finally {
        setIsVerifying(false)
      }
    }
    
    verifyEmail()
  }, [token])
  
  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">Verifying Email</CardTitle>
            <CardDescription className="text-center">
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }
  
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">Invalid Verification Link</CardTitle>
            <CardDescription className="text-center">
              This email verification link is invalid or has expired
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm">
              <Link href="/login" className="text-primary hover:underline">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            {isVerified ? 'Email Verified!' : 'Verification Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {isVerified 
              ? 'Your email has been successfully verified. You can now sign in to your account.'
              : 'There was an error verifying your email address. Please try again or contact support.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => router.push('/login')}
            className="w-full"
          >
            {isVerified ? 'Continue to Login' : 'Back to Login'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}