// app/(protected)/settings/accounts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { FaDiscord } from 'react-icons/fa';
import { Gamepad2, CheckCircle, XCircle } from 'lucide-react';

export default function AccountsPage() {
  const searchParams = useSearchParams();
  const [discordLinked, setDiscordLinked] = useState(false);
  const [apexLinked, setApexLinked] = useState(false);
  const [apexUsername, setApexUsername] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [verificationCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Check if Discord was just linked
    if (searchParams.get('discord') === 'linked') {
      setDiscordLinked(true);
      toast.success('Discord account linked successfully!');
    }
    
    // Fetch current link status
    fetchAccountStatus();
  }, [searchParams]);

  const fetchAccountStatus = async () => {
    try {
      const response = await fetch('/api/user/linked-accounts');
      const data = await response.json();
      
      setDiscordLinked(data.discord?.linked || false);
      setApexLinked(data.apex?.linked || false);
    } catch (error) {
      console.error('Failed to fetch account status:', error);
    }
  };

  const linkDiscord = () => {
    window.location.href = '/api/oauth/discord';
  };

  const linkApex = async () => {
    if (!apexUsername) {
      toast.error('Please enter your Apex Legends username');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('/api/apex/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: apexUsername,
          platform,
          verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setApexLinked(true);
        toast.success('Apex Legends account linked successfully!');
      } else {
        toast.error(data.message || 'Failed to link account');
      }
    } catch (error) {
      toast.error('Failed to link Apex account');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Linked Accounts</h2>
        <p className="text-muted-foreground">
          Connect your gaming accounts to participate in scrims
        </p>
      </div>

      {/* Discord Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaDiscord className="h-5 w-5 text-[#5865F2]" />
              Discord Account
            </div>
            <Badge variant={discordLinked ? "default" : "secondary"}>
              {discordLinked ? (
                <>
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Linked
                </>
              ) : (
                <>
                  <XCircle className="mr-1 h-3 w-3" />
                  Not Linked
                </>
              )}
            </Badge>
          </CardTitle>
          <CardDescription>
            Required for voice chat and team coordination during scrims
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!discordLinked ? (
            <Button onClick={linkDiscord} className="w-full bg-[#5865F2] hover:bg-[#4752C4]">
              <FaDiscord className="mr-2 h-4 w-4" />
              Link Discord Account
            </Button>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              Your Discord account is linked and ready for scrims
            </div>
          )}
        </CardContent>
      </Card>

      {/* Apex Legends Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-red-600" />
              Apex Legends Account
            </div>
            <Badge variant={apexLinked ? "default" : "secondary"}>
              {apexLinked ? (
                <>
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Verified
                </>
              ) : (
                <>
                  <XCircle className="mr-1 h-3 w-3" />
                  Not Verified
                </>
              )}
            </Badge>
          </CardTitle>
          <CardDescription>
            Link your Apex account to track stats and verify eligibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!apexLinked ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Verification Instructions:</p>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                  <li>Add this code to your club tag: <code className="font-mono">{verificationCode}</code></li>
                  <li>Enter your Apex username below</li>
                  <li>Select your platform</li>
                  <li>Click "Verify Account"</li>
                </ol>
              </div>
              
              <div className="grid gap-4">
                <Input
                  placeholder="Apex Legends Username"
                  value={apexUsername}
                  onChange={(e) => setApexUsername(e.target.value)}
                />
                
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PC">PC (Origin/Steam)</SelectItem>
                    <SelectItem value="PS4">PlayStation</SelectItem>
                    <SelectItem value="X1">Xbox</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={linkApex} 
                  disabled={isVerifying}
                  className="w-full"
                >
                  {isVerifying ? 'Verifying...' : 'Verify Account'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              Your Apex Legends account is verified and linked
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}