// components/auth/two-factor-login.tsx
'use client'

import { useState } from 'react'
import { twoFactor } from '../../lib/auth-client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface TwoFactorLoginProps {
  email: string
  password: string
}

export function TwoFactorLogin({ email, password }: TwoFactorLoginProps) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [useBackupCode, setUseBackupCode] = useState(false)
  const router = useRouter()

  const handleVerification = async () => {
    if (!code) {
      toast.error('Please enter the verification code')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await twoFactor.verify({
        code,
        isBackupCode: useBackupCode
      })
      
      if (result.error) {
        toast.error(result.error.message || 'Invalid verification code')
        return
      }
      
      toast.success('Logged in successfully')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to verify code')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          {useBackupCode 
            ? 'Enter one of your backup codes'
            : 'Enter the 6-digit code from your authenticator app'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium">
            {useBackupCode ? 'Backup Code' : 'Verification Code'}
          </label>
          <Input
            id="code"
            placeholder={useBackupCode ? 'xxxxxxxx' : '123456'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={useBackupCode ? 8 : 6}
          />
        </div>
        
        <Button 
          onClick={handleVerification}
          disabled={isLoading || !code}
          className="w-full"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          onClick={() => setUseBackupCode(!useBackupCode)}
          className="w-full"
        >
          {useBackupCode ? 'Use authenticator app' : 'Use backup code'}
        </Button>
      </CardContent>
    </Card>
  )
}