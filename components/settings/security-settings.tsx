// components/settings/security-settings.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { TwoFactorSetup } from '../auth/two-factor-setup'
import { TwoFactorDisable } from '../auth/two-factor-disable'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Shield, Mail, Key } from 'lucide-react'

export function SecuritySettings() {
  const { user, isEmailVerified, hasTwoFactor } = useAuth()
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)
  const [showTwoFactorDisable, setShowTwoFactorDisable] = useState(false)

  if (showTwoFactorSetup) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowTwoFactorSetup(false)}
        >
          ← Back to Security Settings
        </Button>
        <TwoFactorSetup />
      </div>
    )
  }

  if (showTwoFactorDisable) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowTwoFactorDisable(false)}
        >
          ← Back to Security Settings
        </Button>
        <TwoFactorDisable />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-muted-foreground">
          Manage your account security and authentication methods
        </p>
      </div>

      {/* Email Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Verification
          </CardTitle>
          <CardDescription>
            Verify your email address to secure your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{user?.email}</span>
            <Badge variant={isEmailVerified ? "default" : "destructive"}>
              {isEmailVerified ? "Verified" : "Unverified"}
            </Badge>
          </div>
          {!isEmailVerified && (
            <Button size="sm">Resend Verification Email</Button>
          )}
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Two-Factor Authentication</span>
            <Badge variant={hasTwoFactor ? "default" : "secondary"}>
              {hasTwoFactor ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          {hasTwoFactor ? (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowTwoFactorDisable(true)}
            >
              Disable 2FA
            </Button>
          ) : (
            <Button 
              size="sm"
              onClick={() => setShowTwoFactorSetup(true)}
            >
              Enable 2FA
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password
          </CardTitle>
          <CardDescription>
            Change your password regularly to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span>••••••••••••</span>
          <Button variant="outline" size="sm">
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage devices that are currently signed in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">
                  Chrome on Windows • Active now
                </p>
              </div>
              <Badge>Current</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Sign Out All Other Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}