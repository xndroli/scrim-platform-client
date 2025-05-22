// components/integrations/ApexIntegration.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Target, 
  Unlink, 
  RefreshCw, 
  Trophy, 
  TrendingUp,
  Clock,
  User
} from 'lucide-react';

interface ApexIntegrationProps {
  apexData: {
    linked: boolean;
    playerName?: string;
    platform?: string;
    level?: number;
    rankTier?: string;
    rankScore?: number;
    verified?: boolean;
    linkedAt?: string;
    lastSync?: string;
  };
  onUpdate: () => void;
}

const PLATFORMS = [
  { value: 'PC', label: 'PC (Origin/Steam/EA App)' },
  { value: 'PS4', label: 'PlayStation 4' },
  { value: 'PS5', label: 'PlayStation 5' },
  { value: 'XBOX', label: 'Xbox' },
  { value: 'SWITCH', label: 'Nintendo Switch' },
];

const RANK_COLORS = {
  'Rookie': '#8B5A3C',
  'Bronze': '#CD7F32',
  'Silver': '#C0C0C0',
  'Gold': '#FFD700',
  'Platinum': '#E5E4E2',
  'Diamond': '#B9F2FF',
  'Master': '#FF6B6B',
  'Predator': '#FF0000',
  'Unranked': '#6B7280',
};

export function ApexIntegration({ apexData, onUpdate }: ApexIntegrationProps) {
  const [isLinking, setIsLinking] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [platform, setPlatform] = useState('');

  const handleLinkApex = async () => {
    if (!playerName || !platform) {
      toast.error('Please fill in all Apex information');
      return;
    }

    setIsLinking(true);
    try {
      const response = await fetch('/api/integrations/apex/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apexPlayerName: playerName,
          apexPlatform: platform,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast.success('Apex Legends account linked successfully!');
        onUpdate();
        setPlayerName('');
        setPlatform('');
      } else {
        toast.error(data.message || 'Failed to link Apex account');
      }
    } catch (error) {
      toast.error('An error occurred while linking Apex account');
    } finally {
      setIsLinking(false);
    }
  };

  const handleUnlinkApex = async () => {
    setIsUnlinking(true);
    try {
      const response = await fetch('/api/integrations/apex/unlink', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast.success('Apex Legends account unlinked successfully!');
        onUpdate();
      } else {
        toast.error(data.message || 'Failed to unlink Apex account');
      }
    } catch (error) {
      toast.error('An error occurred while unlinking Apex account');
    } finally {
      setIsUnlinking(false);
    }
  };

  const handleSyncStats = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/integrations/apex/sync', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast.success('Apex stats synchronized successfully!');
        onUpdate();
      } else {
        toast.error(data.message || 'Failed to sync Apex stats');
      }
    } catch (error) {
      toast.error('An error occurred while syncing Apex stats');
    } finally {
      setIsSyncing(false);
    }
  };

  const getRankColor = (rank: string) => {
    return RANK_COLORS[rank as keyof typeof RANK_COLORS] || RANK_COLORS.Unranked;
  };

  const getRankProgress = (rankScore: number) => {
    // Calculate progress within current tier (simplified)
    const tierRanges = {
      0: 1000,      // Rookie
      1000: 2800,   // Bronze  
      2800: 5400,   // Silver
      5400: 8400,   // Gold
      8400: 11400,  // Platinum
      11400: 15000, // Diamond
      15000: 99999, // Master+
    };

    for (const [min, max] of Object.entries(tierRanges)) {
      const minScore = parseInt(min);
      const maxScore = max;
      if (rankScore >= minScore && rankScore < maxScore) {
        return ((rankScore - minScore) / (maxScore - minScore)) * 100;
      }
    }
    return 100;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-orange-500" />
          Apex Legends Integration
        </CardTitle>
        <CardDescription>
          Link your Apex Legends account to verify eligibility and track performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apexData.linked ? (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{apexData.playerName}</p>
                    <p className="text-sm text-muted-foreground">{apexData.platform}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${apexData.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                >
                  {apexData.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Level</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{apexData.level || 0}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" style={{ color: getRankColor(apexData.rankTier || 'Unranked') }} />
                    <span className="text-sm font-medium">Rank</span>
                  </div>
                  <p className="text-lg font-bold" style={{ color: getRankColor(apexData.rankTier || 'Unranked') }}>
                    {apexData.rankTier || 'Unranked'}
                  </p>
                  {apexData.rankScore && apexData.rankScore > 0 && (
                    <div className="space-y-1">
                      <Progress 
                        value={getRankProgress(apexData.rankScore)} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {apexData.rankScore} RP
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {apexData.lastSync && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Last synced: {new Date(apexData.lastSync).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleSyncStats}
                disabled={isSyncing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Stats'}
              </Button>
              <Button
                variant="outline"
                onClick={handleUnlinkApex}
                disabled={isUnlinking}
                className="flex items-center gap-2"
              >
                <Unlink className="h-4 w-4" />
                {isUnlinking ? 'Unlinking...' : 'Unlink'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Required for scrims:</strong> Apex Legends integration is required to verify eligibility and track performance.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Player Name</label>
                <Input
                  placeholder="Enter your Apex Legends player name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleLinkApex}
                disabled={isLinking || !playerName || !platform}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Target className="mr-2 h-4 w-4" />
                {isLinking ? 'Linking...' : 'Link Apex Account'}
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Note:</strong> Make sure your Apex Legends profile is public for verification.</p>
              <p>Your stats will be automatically synchronized to verify eligibility for scrims.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}