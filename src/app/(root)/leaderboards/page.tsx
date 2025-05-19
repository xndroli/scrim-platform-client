'use client';

import { 
  Trophy, 
  Users, 
  Filter, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Medal,
  BarChart3,
  Calendar,
  Gamepad2,
  Info,
  ChevronDown,
  Award,
  Swords
} from 'lucide-react';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useTheme } from 'next-themes';
import type { LucideIcon } from 'lucide-react';
import type { Session } from 'next-auth';
import clsx from 'clsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';

// TypeScript interfaces
interface Game {
  id: string;
  name: string;
}

interface TimePeriod {
  id: string;
  name: string;
}

interface LeaderboardType {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface Player {
  id: number;
  rank: number;
  name: string;
  avatarUrl: string;
  rating: number;
  winRate: string;
  matchesPlayed: number;
  kills: number;
  tournamentWins: number;
  isElite: boolean;
  trend: 'up' | 'down' | 'same';
  teamName: string;
}

// Mock data for the leaderboard
const games: Game[] = [
  { id: 'all', name: 'All Games' },
  { id: 'valorant', name: 'Valorant' },
  { id: 'league', name: 'League of Legends' },
  { id: 'cs2', name: 'Counter-Strike 2' },
  { id: 'fortnite', name: 'Fortnite' },
  { id: 'apex', name: 'Apex Legends' },
  { id: 'rocketleague', name: 'Rocket League' },
];

const timePeriods: TimePeriod[] = [
  { id: 'all', name: 'All Time' },
  { id: 'season', name: 'Current Season' },
  { id: 'month', name: 'This Month' },
  { id: 'week', name: 'This Week' },
];

const leaderboardTypes: LeaderboardType[] = [
  { id: 'overall', name: 'Overall Rating', icon: Trophy },
  { id: 'winrate', name: 'Win Rate', icon: Award },
  { id: 'kills', name: 'Most Kills', icon: Swords },
  { id: 'tournaments', name: 'Tournament Wins', icon: Medal },
];

// Generate mock player data
const generatePlayers = (count: number): Player[] => {
  const players: Player[] = [];
  for (let i = 1; i <= count; i++) {
    const isElite = i <= 3;
    players.push({
      id: i,
      rank: i,
      name: `Player${i}`,
      avatarUrl: '',
      rating: Math.floor(2500 - (i * 27) + Math.random() * 50),
      winRate: Math.floor(90 - (i * 1.5) + Math.random() * 5) + '%',
      matchesPlayed: Math.floor(150 + Math.random() * 200),
      kills: Math.floor(1200 - (i * 25) + Math.random() * 100),
      tournamentWins: Math.floor(10 - (i * 0.5) + Math.random() * 3),
      isElite,
      trend: Math.random() > 0.4 ? 'up' : Math.random() > 0.7 ? 'down' : 'same',
      teamName: `Team ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    });
  }
  return players;
};

const players: Player[] = generatePlayers(50);

export default function LeaderboardsPage() {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('overall');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // GSAP animation when component loads
  useEffect(() => {
    if (!isLoading) {
      const animation = () => {
        gsap.from('.leaderboard-header', {
          y: -20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
        
        gsap.from('.leaderboard-card', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3
        });
        
        gsap.from('.player-row', {
          y: 20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.5
        });
      };
      
      animation();
    }
  }, [isLoading]);

  // Filter players based on search query
  const filteredPlayers: Player[] = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="relative h-16 w-16">
          <div className="absolute animate-ping rounded-full h-16 w-16 bg-violet-700/30"></div>
          <div className="absolute animate-pulse rounded-full h-16 w-16 bg-violet-600/50"></div>
          <div className="absolute inset-3">
            <Trophy className="h-10 w-10 text-violet-100 animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-violet-950 to-indigo-900 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 rounded-full bg-indigo-500 -top-20 -left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 rounded-full bg-violet-500 -bottom-20 -right-20 blur-3xl"></div>
          <div className="absolute w-64 h-64 rounded-full bg-fuchsia-500 top-0 right-1/3 blur-3xl"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center z-10">
          <div className="leaderboard-header">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-fuchsia-300">
              Global Leaderboards
            </h1>
            <p className="text-lg text-zinc-300 mt-2 max-w-2xl">
              Track the highest-ranked players across all games. Climb the ranks and claim your place among the elite.
            </p>
          </div>
        </div>
        
        {/* Decorative Trophy Icons */}
        <div className="absolute -bottom-6 right-6 opacity-10">
          <Trophy className="h-32 w-32" />
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 relative z-10">
        {/* Filters Card */}
        <Card className="leaderboard-card bg-zinc-900/90 border-zinc-800 backdrop-blur-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Game Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Gamepad2 className="h-4 w-4" />
                  <span className="text-sm">Game</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {games.map((game: Game) => (
                    <Button
                      key={game.id}
                      variant={selectedGame === game.id ? "default" : "outline"}
                      size="sm"
                      className={clsx(
                        selectedGame === game.id 
                          ? "bg-violet-700 hover:bg-violet-600 text-white" 
                          : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                      )}
                      onClick={() => setSelectedGame(game.id)}
                    >
                      {game.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Time Period</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {timePeriods.map((period: TimePeriod) => (
                    <Button
                      key={period.id}
                      variant={selectedTimePeriod === period.id ? "default" : "outline"}
                      size="sm"
                      className={clsx(
                        selectedTimePeriod === period.id 
                          ? "bg-violet-700 hover:bg-violet-600 text-white" 
                          : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                      )}
                      onClick={() => setSelectedTimePeriod(period.id)}
                    >
                      {period.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Search */}
            <div className="w-full lg:w-60">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input 
                  className="bg-zinc-800 border-zinc-700 pl-10 text-white placeholder:text-zinc-500"
                  placeholder="Search players..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Leaderboard Types */}
        <div className="mb-8 flex flex-wrap gap-4">
          {leaderboardTypes.map((type: LeaderboardType) => {
            const IconComponent = type.icon;
            return (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                size="lg"
                className={clsx(
                  "flex gap-2",
                  selectedType === type.id 
                    ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-600" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                )}
                onClick={() => setSelectedType(type.id)}
              >
                <IconComponent className="h-5 w-5" />
                {type.name}
              </Button>
            );
          })}
        </div>
        
        {/* Leaderboard Table */}
        <Card className="leaderboard-card bg-zinc-900/90 border-zinc-800 backdrop-blur-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 bg-zinc-950 text-zinc-400 text-sm">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4 md:col-span-3">Player</div>
            <div className="col-span-3 md:col-span-2 text-center hidden md:block">Team</div>
            <div className="col-span-2 text-center">
              {selectedType === 'overall' && 'Rating'}
              {selectedType === 'winrate' && 'Win Rate'}
              {selectedType === 'kills' && 'Kills'}
              {selectedType === 'tournaments' && 'Wins'}
            </div>
            <div className="col-span-2 text-center">Matches</div>
            <div className="col-span-2 text-center hidden md:block">Trend</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-zinc-800/50">
            {filteredPlayers.slice(0, 25).map((player: Player) => (
              <div 
                key={player.id} 
                className={clsx(
                  "player-row grid grid-cols-12 gap-4 p-4 items-center hover:bg-zinc-800/50 cursor-pointer transition-colors",
                  player.isElite && "bg-zinc-800/30"
                )}
              >
                {/* Rank */}
                <div className="col-span-1 text-center flex justify-center">
                  {player.rank <= 3 ? (
                    <div className={clsx(
                      "flex items-center justify-center w-8 h-8 rounded-full",
                      player.rank === 1 ? "bg-amber-500" : 
                      player.rank === 2 ? "bg-zinc-400" : 
                      "bg-amber-800"
                    )}>
                      <span className="font-bold">{player.rank}</span>
                    </div>
                  ) : (
                    <span className="text-zinc-400">{player.rank}</span>
                  )}
                </div>
                
                {/* Player */}
                <div className="col-span-4 md:col-span-3 flex items-center gap-3">
                  <Avatar className={clsx(
                    "h-9 w-9 ring-1",
                    player.rank === 1 ? "ring-amber-500" : 
                    player.rank === 2 ? "ring-zinc-400" : 
                    player.rank === 3 ? "ring-amber-800" : 
                    "ring-zinc-700"
                  )}>
                    <AvatarImage src={player.avatarUrl} alt={player.name} />
                    <AvatarFallback className="bg-violet-950 text-violet-200">
                      {player.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{player.name}</div>
                    {player.isElite && (
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <Award className="h-3 w-3" />
                        <span>Elite</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Team */}
                <div className="col-span-3 md:col-span-2 text-center text-zinc-300 hidden md:block">
                  {player.teamName}
                </div>
                
                {/* Stats */}
                <div className="col-span-2 text-center font-semibold">
                  {selectedType === 'overall' && formatNumber(player.rating)}
                  {selectedType === 'winrate' && player.winRate}
                  {selectedType === 'kills' && formatNumber(player.kills)}
                  {selectedType === 'tournaments' && player.tournamentWins}
                </div>
                
                <div className="col-span-2 text-center text-zinc-400">
                  {formatNumber(player.matchesPlayed)}
                </div>
                
                {/* Trend */}
                <div className="col-span-2 text-center hidden md:flex justify-center">
                  {player.trend === 'up' && (
                    <div className="flex items-center text-green-500">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>+{Math.floor(Math.random() * 50) + 10}</span>
                    </div>
                  )}
                  {player.trend === 'down' && (
                    <div className="flex items-center text-red-500">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span>-{Math.floor(Math.random() * 30) + 5}</span>
                    </div>
                  )}
                  {player.trend === 'same' && (
                    <div className="text-zinc-500">-</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Table Footer */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex justify-between items-center">
            <div className="text-zinc-400 text-sm">
              Showing <span className="text-white">{filteredPlayers.slice(0, 25).length}</span> of <span className="text-white">{filteredPlayers.length}</span> players
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                Next
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Player Location Section */}
        {session && (
          <div className="mt-8 p-6 bg-gradient-to-r from-violet-950 to-indigo-900 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <Avatar className="h-14 w-14 ring-2 ring-violet-500/50">
                  <AvatarImage src={session?.user?.image || ''} alt="Profile" />
                  <AvatarFallback className="bg-violet-950 text-violet-200 text-xl">
                    {session?.user?.name?.charAt(0) || 'G'}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-semibold text-white">{session?.user?.name || 'Your'} Position</h3>
                  <p className="text-zinc-300">Keep competing to improve your ranking!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-zinc-400 text-sm">Current Rank</div>
                  <div className="text-3xl font-bold text-white">#{Math.floor(Math.random() * 1000) + 100}</div>
                </div>
                
                <Button className="bg-violet-700 hover:bg-violet-600 text-white">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}