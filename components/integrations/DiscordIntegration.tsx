// components/integrations/DiscordIntegration.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { MessageSquare, Unlink, ExternalLink } from 'lucide-react';

interface DiscordIntegrationProps {
  discordData: {
    linked: boolean;
    username?: string;
    avatar?: string;
    linkedAt?: string;
  };
  onUpdate: () => void;
}

export function DiscordIntegration({ discordData, onUpdate }: DiscordIntegrationProps) {
  const [isLinking, setIsLinking] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [discordId, setDiscordId] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');

  const handleLinkDiscord = async () => {
    if (!discordId || !discordUsername) {
      toast.error('Please fill in all Discord information');
      return;
    }

    setIsLinking(true);
    try {
      const response = await fetch('/api/integrations/discord/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discordId,
          discordUsername,
          discordAvatar: `https://cdn.discordapp.com/avatars/${discordId}/avatar.png`,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast.success('Discord account linked successfully!');
        onUpdate();
        setDiscordId('');
        setDiscordUsername('');
      } else {
        toast.error(data.message || 'Failed to link Discord account');
      }
    } catch (error) {
      toast.error('An error occurred while linking Discord account');
    } finally {
      setIsLinking(false);
    }
  };

  const handleUnlinkDiscord = async () => {
    setIsUnlinking(true);
    try {
      const response = await fetch('/api/integrations/discord/unlink', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast.success('Discord account unlinked successfully!');
        onUpdate();
      } else {
        toast.error(data.message || 'Failed to unlink Discord account');
      }
    } catch (error) {
      toast.error('An error occurred while unlinking Discord account');
    } finally {
      setIsUnlinking(false);
    }
  };

  const openDiscordOAuth = () => {
    // Discord OAuth2 URL - replace with your actual Discord app credentials
    const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/discord/callback')}&response_type=code&scope=identify%20guilds`;
    window.open(discordOAuthUrl, 'discord-oauth', 'width=500,height=700');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#5865F2]" />
          Discord Integration
        </CardTitle>
        <CardDescription>
          Link your Discord account to participate in voice channels and receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {discordData.linked ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={discordData.avatar} alt={discordData.username} />
                  <AvatarFallback className="bg-[#5865F2] text-white">
                    {discordData.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{discordData.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Linked {discordData.linkedAt ? new Date(discordData.linkedAt).toLocaleDateString() : 'recently'}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleUnlinkDiscord}
                disabled={isUnlinking}
                className="flex items-center gap-2"
              >
                <Unlink className="h-4 w-4" />
                {isUnlinking ? 'Unlinking...' : 'Unlink Discord'}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://discord.gg/your-server', '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Join Discord Server
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Required for scrims:</strong> Discord integration is required to participate in organized matches.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={openDiscordOAuth}
                disabled={isLinking}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {isLinking ? 'Linking...' : 'Link with Discord OAuth'}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                or manually enter your Discord information
              </div>
              
              <div className="space-y-2">
                <Input
                  placeholder="Discord User ID (e.g., 123456789012345678)"
                  value={discordId}
                  onChange={(e) => setDiscordId(e.target.value)}
                />
                <Input
                  placeholder="Discord Username (e.g., YourUsername#1234)"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                />
                <Button
                  onClick={handleLinkDiscord}
                  disabled={isLinking || !discordId || !discordUsername}
                  className="w-full"
                  variant="outline"
                >
                  {isLinking ? 'Linking...' : 'Link Manually'}
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>To find your Discord User ID:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Enable Developer Mode in Discord settings</li>
                <li>Right-click your username and select "Copy ID"</li>
              </ol>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}