// components/auth/two-factor-setup.tsx
'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { twoFactor } from '../../lib/auth-client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast } from 'sonner'

export function TwoFactorSetup() {
  const [step, setStep] = useState<'setup' | 'verify'>('setup')
  const [qrCode, setQrCode] = useState<string>('')
  const [secret, setSecret] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateTwoFactor = async () => {
    setIsLoading(true)
    
    try {
      const result = await twoFactor.enable()
      
      if (result.error) {
        toast.error(result.error.message || 'Failed to generate 2FA')
        return
      }
      
      setQrCode(result.data.qrCode)
      setSecret(result.data.secret)
      setStep('verify')
    } catch (error) {
      toast.error('Failed to generate 2FA')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyTwoFactor = async () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await twoFactor.verify({
        code: verificationCode
      })
      
      if (result.error) {
        toast.error(result.error.message || 'Invalid verification code')
        return
      }
      
      setBackupCodes(result.data.backupCodes)
      toast.success('Two-factor authentication enabled successfully!')
    } catch (error) {
      toast.error('Failed to verify 2FA')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'setup') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Enable Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={generateTwoFactor} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Generating...' : 'Generate QR Code'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (backupCodes.length > 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Two-Factor Authentication Enabled</CardTitle>
          <CardDescription>
            Save these backup codes in a safe place. You can use them to access your account if you lose your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 font-mono text-sm">
            {backupCodes.map((code, index) => (
              <div key={index} className="p-2 bg-muted rounded">
                {code}
              </div>
            ))}
          </div>
          <Button 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
        <CardDescription>
          Scan this QR code with your authenticator app, then enter the verification code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <QRCodeSVG value={qrCode} size={200} />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Manual entry key:</p>
          <code className="text-xs bg-muted p-2 rounded">{secret}</code>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium">
            Verification Code
          </label>
          <Input
            id="code"
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            maxLength={6}
          />
        </div>
        
        <Button 
          onClick={verifyTwoFactor}
          disabled={isLoading || !verificationCode}
          className="w-full"
        >
          {isLoading ? 'Verifying...' : 'Verify and Enable'}
        </Button>
      </CardContent>
    </Card>
  )
}