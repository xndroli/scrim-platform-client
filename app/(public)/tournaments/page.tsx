// app/(public)/tournaments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  Gamepad2,
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  Crown,
  Medal,
  Swords
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface Tournament {
  id: string;
  title: string;
  game: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  teams: number;
  maxTeams: number;
  format: string;
  status: 'upcoming' | 'active' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  image: string;
}

const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Apex Legends Championship Series',
    game: 'Apex Legends',
    startDate: '2025-06-15',
    endDate: '2025-06-17',
    prizePool: '$50,000',
    teams: 18,
    maxTeams: 20,
    format: 'Battle Royale',
    status: 'upcoming',
    difficulty: 'pro',
    image: '/images/apex-tournament.jpg'
  },
  {
    id: '2',
    title: 'Call of Duty Summer Showdown',
    game: 'Call of Duty',
    startDate: '2025-06-20',
    endDate: '2025-06-22',
    prizePool: '$25,000',
    teams: 14,
    maxTeams: 16,
    format: 'Search & Destroy',
    status: 'upcoming',
    difficulty: 'advanced',
    image: '/images/cod-tournament.jpg'
  },
  {
    id: '3',
    title: 'Marvel Rivals Mayhem',
    game: 'Marvel Rivals',
    startDate: '2025-06-10',
    endDate: '2025-06-10',
    prizePool: '$10,000',
    teams: 32,
    maxTeams: 32,
    format: '6v6 Elimination',
    status: 'active',
    difficulty: 'intermediate',
    image: '/images/marvel-tournament.jpg'
  },
  {
    id: '4',
    title: 'Fortnite Friday Finals',
    game: 'Fortnite',
    startDate: '2025-06-25',
    endDate: '2025-06-25',
    prizePool: '$15,000',
    teams: 45,
    maxTeams: 50,
    format: 'Solos',
    status: 'upcoming',
    difficulty: 'intermediate',
    image: '/images/fortnite-tournament.jpg'
  }
];

const games = ['All Games', 'Apex Legends', 'Call of Duty', 'Marvel Rivals', 'Fortnite'];
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Pro'];
const statuses = ['All Status', 'Upcoming', 'Active', 'Completed'];

export default function TournamentsPage() {
  const [selectedGame, setSelectedGame] = useState('All Games');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTournaments, setFilteredTournaments] = useState(mockTournaments);

  useEffect(() => {
    // Hero animation
    gsap.timeline()
      .from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.hero-stats > div', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');

    // Tournament cards animation
    gsap.from('.tournament-card', {
      scrollTrigger: {
        trigger: '.tournaments-grid',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Floating animation for decorative elements
    gsap.to('.floating-trophy', {
      y: -20,
      rotation: 15,
      duration: 3,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });
  }, []);

  useEffect(() => {
    // Filter tournaments
    let filtered = mockTournaments;

    if (selectedGame !== 'All Games') {
      filtered = filtered.filter(t => t.game === selectedGame);
    }

    if (selectedDifficulty !== 'All Levels') {
      filtered = filtered.filter(t => t.difficulty === selectedDifficulty.toLowerCase());
    }

    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(t => t.status === selectedStatus.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.game.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTournaments(filtered);
  }, [selectedGame, selectedDifficulty, selectedStatus, searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'intermediate': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'advanced': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      case 'pro': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-violet-500/20 text-violet-300 border-violet-500/50';
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'completed': return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-950/20 to-black pb-20 pt-32">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-96 h-96 rounded-full bg-violet-600 blur-[128px] -top-48 left-1/4"></div>
          <div className="absolute w-96 h-96 rounded-full bg-purple-600 blur-[128px] -bottom-48 right-1/4"></div>
        </div>

        {/* Floating Trophy */}
        <div className="floating-trophy absolute top-20 right-10 opacity-10">
          <Trophy className="w-32 h-32" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Epic Tournaments
            </h1>
            <p className="hero-subtitle text-xl text-gray-300 max-w-2xl mx-auto">
              Compete in high-stakes tournaments across multiple games. 
              Win prizes, earn glory, and become a legend.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-violet-400">$150K+</div>
              <div className="text-gray-400 mt-2">Total Prize Pool</div>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-purple-400">500+</div>
              <div className="text-gray-400 mt-2">Active Teams</div>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-pink-400">50+</div>
              <div className="text-gray-400 mt-2">Monthly Tournaments</div>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-orange-400">5</div>
              <div className="text-gray-400 mt-2">Supported Games</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                {games.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tournaments Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="tournaments-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTournaments.map((tournament, index) => (
              <Card 
                key={tournament.id} 
                className="tournament-card group bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-violet-500/50 transition-all duration-300"
              >
                {/* Tournament Image */}
                <div className="relative h-48 bg-gradient-to-br from-violet-600/20 to-purple-600/20 overflow-hidden">
                  {/* Placeholder for tournament image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gamepad2 className="w-20 h-20 text-white/20" />
                  </div>
                  
                  {/* Status Badge */}
                  <Badge 
                    className={`absolute top-4 right-4 ${getStatusColor(tournament.status)}`}
                  >
                    {tournament.status}
                  </Badge>

                  {/* Prize Pool Highlight */}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold text-white">{tournament.prizePool}</div>
                    <div className="text-xs text-gray-300">Prize Pool</div>
                  </div>
                </div>

                {/* Tournament Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                    {tournament.title}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Gamepad2 className="w-4 h-4" />
                      <span className="text-sm">{tournament.game}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{tournament.teams}/{tournament.maxTeams} Teams</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Swords className="w-4 h-4" />
                      <span className="text-sm">{tournament.format}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getDifficultyColor(tournament.difficulty)}`}>
                      {tournament.difficulty}
                    </Badge>

                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full ${
                            i < (tournament.difficulty === 'beginner' ? 1 : 
                                 tournament.difficulty === 'intermediate' ? 2 : 
                                 tournament.difficulty === 'advanced' ? 3 : 4)
                              ? 'bg-violet-500' 
                              : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <Link href="/register">
                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white group">
                      Join Tournament
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {filteredTournaments.length === 0 && (
            <div className="text-center py-20">
              <Trophy className="w-20 h-20 text-gray-700 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-500 mb-2">No tournaments found</h3>
              <p className="text-gray-600">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Ready to Practice Like a Pro?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of competitive players and take your skills to the next level.
              Practice makes perfect!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Start Scrimming
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}