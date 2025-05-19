// app/(dashboard)/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { eventsApi } from '../../../lib/api/events';
import { useAuth } from '../../../lib/auth/AuthContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Activity, 
  TrendingUp, 
  Gamepad2, 
  Bell, 
  Crown
} from 'lucide-react';
import { toast } from 'sonner';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
// import { UserStats } from '@/components/features/dashboard/UserStats';
// import { UpcomingMatches } from '@/components/features/dashboard/UpcomingMatches';
// import { RecommendedTournaments } from '@/components/features/dashboard/RecommendedTournaments';
// import { ActivityFeed } from '@/components/features/dashboard/ActivityFeed';

// Temporarily mocked data (would come from API)
const mockedStats = {
  wins: 24,
  matchesPlayed: 46,
  winRate: '52%',
  ranking: 1420,
  tournamentWins: 2
};

const mockedUpcomingMatches = [
  { id: 1, game: 'Apex Legends', opponent: 'Team Nexus', time: '2025-05-18T18:00:00', type: 'Tournament' },
  { id: 2, game: 'Call of Duty', opponent: 'Shadow Esports', time: '2025-05-19T20:30:00', type: 'Ranked' }
];

const mockedTournaments = [
  { id: 1, name: 'Summer Showdown', game: 'Warzone', startDate: '2025-05-25T00:00:00', prizePool: '$5,000', participants: 32, difficulty: 'Pro' },
  { id: 2, name: 'Weekly Warriors', game: 'Apex Legends', startDate: '2025-05-20T00:00:00', prizePool: '$1,000', participants: 24, difficulty: 'Intermediate' },
  { id: 3, name: 'Midnight Mayhem', game: 'Rocket League', startDate: '2025-05-22T00:00:00', prizePool: '$2,500', participants: 16, difficulty: 'Advanced' }
];

const mockedActivity = [
  { id: 1, type: 'match', result: 'win', game: 'Valorant', opponent: 'Phantom Force', date: '2025-05-16T14:35:00', score: '13-7' },
  { id: 2, type: 'tournament', name: 'Spring Rivalry', result: 'quarter-finals', date: '2025-05-15T00:00:00' },
  { id: 3, type: 'team', action: 'joined', teamName: 'Velocity Gaming', date: '2025-05-14T10:23:00' }
];

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Animation setup using GSAP
  const { contextSafe } = useGSAP({
    scope: '.dashboard-container',
  });

  const animateIn = contextSafe(() => {
    const tl = gsap.timeline();
    
    tl.from('.dashboard-welcome', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
    .from('.dashboard-card', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3');
  });

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      animateIn();
    }
  }, [isLoading, animateIn]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative h-16 w-16">
          <div className="absolute animate-ping rounded-full h-16 w-16 bg-violet-700/30"></div>
          <div className="absolute animate-pulse rounded-full h-16 w-16 bg-violet-600/50"></div>
          <div className="absolute inset-3">
            <Gamepad2 className="h-10 w-10 text-violet-100 animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container min-h-screen bg-black p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="dashboard-welcome mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Gamer'}
          </h1>
          <p className="text-zinc-400 mt-2">Your gaming headquarters. Ready to dominate today?</p>
        </div>

        {/* Stats Overview */}
        <div className="dashboard-card mb-10">
          <Card className="bg-zinc-900/70 border-zinc-800 overflow-hidden backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Crown className="h-5 w-5 text-amber-500 mr-2" />
                <h2 className="text-lg font-semibold text-white">Your Gaming Profile</h2>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-20 w-20 ring-2 ring-violet-500/50">
                  <AvatarImage src={session?.user?.image || ''} alt="Profile" />
                  <AvatarFallback className="bg-violet-950 text-violet-200 text-xl">
                    {session?.user?.name?.charAt(0) || 'G'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 w-full">
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-sm">Win Rate</span>
                    <span className="text-2xl font-bold text-white">{mockedStats.winRate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-sm">Wins</span>
                    <span className="text-2xl font-bold text-white">{mockedStats.wins}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-sm">Matches</span>
                    <span className="text-2xl font-bold text-white">{mockedStats.matchesPlayed}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-sm">Ranking</span>
                    <span className="text-2xl font-bold text-white">{mockedStats.ranking}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-sm">Trophies</span>
                    <span className="text-2xl font-bold text-white">{mockedStats.tournamentWins}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Matches */}
            <div className="dashboard-card">
              <Card className="bg-zinc-900/70 border-zinc-800 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-violet-500 mr-2" />
                      <h2 className="text-lg font-semibold text-white">Upcoming Matches</h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                      View All
                    </Button>
                  </div>
                  
                  {mockedUpcomingMatches.length > 0 ? (
                    <div className="space-y-4">
                      {mockedUpcomingMatches.map(match => (
                        <div key={match.id} className="flex items-center p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 cursor-pointer transition-colors">
                          <div className="h-10 w-10 rounded-full bg-violet-900 flex items-center justify-center mr-4">
                            <Gamepad2 className="h-5 w-5 text-violet-200" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-white">{match.game}</h3>
                            <p className="text-sm text-zinc-400">vs {match.opponent} • {match.type}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-white">{new Date(match.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            <div className="text-xs text-zinc-400">{new Date(match.time).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-zinc-500">
                      <Calendar className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>No upcoming matches</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Activity Feed */}
            <div className="dashboard-card">
              <Card className="bg-zinc-900/70 border-zinc-800 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-violet-500 mr-2" />
                      <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {mockedActivity.map(activity => (
                      <div key={activity.id} className="border-l-2 border-violet-600 pl-4 py-1">
                        {activity.type === 'match' && (
                          <div>
                            <p className="text-white">
                              <span className={activity.result === 'win' ? 'text-green-500' : 'text-red-500'}>
                                {activity.result === 'win' ? 'Won' : 'Lost'}
                              </span>
                              {' match in '}{activity.game}{' vs '}{activity.opponent}
                            </p>
                            <div className="flex justify-between">
                              <span className="text-sm text-zinc-400">Score: {activity.score}</span>
                              <span className="text-xs text-zinc-500">{new Date(activity.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )}
                        
                        {activity.type === 'tournament' && (
                          <div>
                            <p className="text-white">Reached {activity.result} in {activity.name}</p>
                            <div className="text-xs text-zinc-500 text-right">{new Date(activity.date).toLocaleDateString()}</div>
                          </div>
                        )}
                        
                        {activity.type === 'team' && (
                          <div>
                            <p className="text-white">{activity.action!.charAt(0).toUpperCase() + activity.action!.slice(1)} team {activity.teamName}</p>
                            <div className="text-xs text-zinc-500 text-right">{new Date(activity.date).toLocaleDateString()}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recommended Tournaments */}
            <div className="dashboard-card">
              <Card className="bg-zinc-900/70 border-zinc-800 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-violet-500 mr-2" />
                      <h2 className="text-lg font-semibold text-white">Tournaments For You</h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                      Browse All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {mockedTournaments.map(tournament => (
                      <div 
                        key={tournament.id} 
                        className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 cursor-pointer transition-colors border-l-4 border-violet-600"
                      >
                        <h3 className="font-semibold text-white">{tournament.name}</h3>
                        <div className="flex items-center mt-1 text-zinc-400 text-sm">
                          <Gamepad2 className="h-3.5 w-3.5 mr-1" />
                          <span>{tournament.game}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <div>
                            <div className="text-xs text-zinc-500">Prize</div>
                            <div className="text-white font-medium">{tournament.prizePool}</div>
                          </div>
                          <div>
                            <div className="text-xs text-zinc-500">Teams</div>
                            <div className="text-white font-medium">{tournament.participants}</div>
                          </div>
                          <div>
                            <div className="text-xs text-zinc-500">Difficulty</div>
                            <div className="text-white font-medium">{tournament.difficulty}</div>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-3 bg-violet-700 hover:bg-violet-600 text-white" 
                          onClick={() => toast.success(`Registered for ${tournament.name}`)}
                        >
                          Register
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <Card className="bg-zinc-900/70 border-zinc-800 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex flex-col h-auto py-4">
                      <Users className="h-5 w-5 mb-1" />
                      <span>Create Team</span>
                    </Button>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex flex-col h-auto py-4">
                      <Trophy className="h-5 w-5 mb-1" />
                      <span>Host Tournament</span>
                    </Button>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex flex-col h-auto py-4">
                      <TrendingUp className="h-5 w-5 mb-1" />
                      <span>View Stats</span>
                    </Button>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex flex-col h-auto py-4">
                      <Bell className="h-5 w-5 mb-1" />
                      <span>Notifications</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;