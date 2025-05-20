// src/app/(protected)/admin/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '../../../src/components/ui/button';
import api from '../../../src/lib/api';
import { LucideUsers, LucideUserPlus, LucideShield, LucideGamepad2 } from 'lucide-react';

export default function AdminDashboardPage() {
  // Fetch admin statistics
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await api.get('/admin/stats');
      return response.data.data;
    },
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <LucideUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.userCount || 0}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <LucideUserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.newUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <LucideShield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.teamCount || 0}</div>
            <p className="text-xs text-muted-foreground">Active teams</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Scrims</CardTitle>
            <LucideGamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeScrimCount || 0}</div>
            <p className="text-xs text-muted-foreground">Scheduled scrims</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent>
            {/* User list would go here */}
            <div className="text-center">
              <Link href="/admin/users">
                <Button variant="outline" size="sm">View All Users</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Scrims</CardTitle>
            <CardDescription>Recently created scrims</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Scrim list would go here */}
            <div className="text-center">
              <Link href="/admin/scrims">
                <Button variant="outline" size="sm">View All Scrims</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}