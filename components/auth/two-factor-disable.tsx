// components/auth/two-factor-disable.tsx
'use client'

import { useState } from 'react'
import { twoFactor } from '../../lib/auth-client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast } from 'sonner'

export function TwoFactorDisable() {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDisable = async () => {
    if (!password) {
      toast.error('Please enter your password')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await twoFactor.disable({
        password
      })
      
      if (result.error) {
        toast.error(result.error.message || 'Failed to disable 2FA')
        return
      }
      
      toast.success('Two-factor authentication disabled')
      window.location.reload()
    } catch (error) {
      toast.error('Failed to disable 2FA')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-destructive">Disable Two-Factor Authentication</CardTitle>
        <CardDescription>
          This will remove the extra security layer from your account. Enter your password to confirm.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleDisable}
          disabled={isLoading || !password}
          variant="destructive"
          className="w-full"
        >
          {isLoading ? 'Disabling...' : 'Disable 2FA'}
        </Button>
      </CardContent>
    </Card>
  )
}