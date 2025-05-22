// app/(protected)/settings/integrations/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { DiscordIntegration } from '@/components/integrations/DiscordIntegration';
import { ApexIntegration } from '@/components/integrations/ApexIntegration';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface IntegrationStatus {
  discord: {
    linked: boolean;
    username?: string;
    avatar?: string;
    linkedAt?: string;
  };
  apex: {
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
}

export default function IntegrationsPage() {
  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchIntegrationStatus = async () => {
    try {
      const response = await fetch('/api/integrations/status');
      const data = await response.json();

      if (data.status === 'success') {
        setIntegrationStatus(data.data);
      } else {
        toast.error('Failed to fetch integration status');
      }
    } catch (error) {
      toast.error('An error occurred while fetching integration status');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchIntegrationStatus();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchIntegrationStatus();
  };

  const getCompletionStatus = () => {
    if (!integrationStatus) return { completed: 0, total: 2, percentage: 0 };
    
    let completed = 0;
    const total = 2;

    if (integrationStatus.discord.linked) completed++;
    if (integrationStatus.apex.linked && integrationStatus.apex.verified) completed++;

    return {
      completed,
      total,
      percentage: (completed / total) * 100,
    };
  };

  const completionStatus = getCompletionStatus();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Account Integrations</h1>
          <p className="text-muted-foreground">
            Connect your Discord and Apex Legends accounts to participate in scrims
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {completionStatus.completed === completionStatus.total ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            )}
            Integration Progress
          </CardTitle>
          <CardDescription>
            Complete all integrations to participate in organized scrims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{completionStatus.completed} of {completionStatus.total} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionStatus.percentage}%` }}
              />
            </div>
            
            {completionStatus.completed < completionStatus.total && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You need to complete all integrations before you can join scrims.
                  {!integrationStatus?.discord.linked && ' Link your Discord account.'}
                  {(!integrationStatus?.apex.linked || !integrationStatus?.apex.verified) && ' Link and verify your Apex Legends account.'}
                </AlertDescription>
              </Alert>
            )}

            {completionStatus.completed === completionStatus.total && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  All integrations complete! You can now participate in scrims and tournaments.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Integration Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {integrationStatus && (
          <>
            <DiscordIntegration
              discordData={integrationStatus.discord}
              onUpdate={fetchIntegrationStatus}
            />
            <ApexIntegration
              apexData={integrationStatus.apex}
              onUpdate={fetchIntegrationStatus}
            />
          </>
        )}
      </div>

      {/* Requirements Information */}
      <Card>
        <CardHeader>
          <CardTitle>Why These Integrations?</CardTitle>
          <CardDescription>
            Understanding the requirements for competitive gaming
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#5865F2]" />
                Discord Integration
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Real-time voice communication during matches</li>
                <li>• Automatic team channel assignment</li>
                <li>• Match notifications and updates</li>
                <li>• Community integration and role management</li>
                <li>• Anti-cheat verification through Discord presence</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                Apex Legends Integration
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Skill-based matchmaking and rank verification</li>
                <li>• Performance tracking and statistics</li>
                <li>• Eligibility verification for tournaments</li>
                <li>• Automated result recording</li>
                <li>• Fair team balancing based on skill level</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Privacy & Security</h4>
            <p className="text-sm text-muted-foreground">
              We only access public profile information necessary for tournament organization. 
              Your data is securely stored and never shared with third parties. You can unlink 
              your accounts at any time through this page.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
          <CardDescription>
            Common issues and solutions for account linking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium group-open:text-blue-600">
                Discord account not linking properly
              </summary>
              <div className="mt-2 text-sm text-muted-foreground space-y-2">
                <p>1. Make sure you're a member of our Discord server</p>
                <p>2. Check that your Discord privacy settings allow friend requests</p>
                <p>3. Try refreshing the page and attempting again</p>
                <p>4. Contact support if the issue persists</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer font-medium group-open:text-blue-600">
                Apex Legends stats not updating
              </summary>
              <div className="mt-2 text-sm text-muted-foreground space-y-2">
                <p>1. Ensure your Apex Legends profile is set to public</p>
                <p>2. Check that your player name is spelled correctly</p>
                <p>3. Try manually syncing your stats using the sync button</p>
                <p>4. Stats may take up to 15 minutes to update from EA servers</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer font-medium group-open:text-blue-600">
                Platform selection issues
              </summary>
              <div className="mt-2 text-sm text-muted-foreground space-y-2">
                <p>1. Make sure you select the correct platform (PC, PlayStation, Xbox, etc.)</p>
                <p>2. For PC players: Use the same name across Origin, Steam, and EA App</p>
                <p>3. Console players: Use your gamertag exactly as it appears</p>
                <p>4. Cross-platform accounts: Link using your primary platform</p>
              </div>
            </details>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Still having issues? Contact our support team at{' '}
              <a href="mailto:support@scrimplatform.com" className="text-blue-600 hover:underline">
                support@scrimplatform.com
              </a>{' '}
              or join our Discord server for live help.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}