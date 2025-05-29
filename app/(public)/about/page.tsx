// app/(public)/about/page.tsx

'use client';

import { useEffect } from 'react';
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Target,
  Shield,
  Zap,
  Heart,
  Star,
  ChevronRight,
  Globe,
  Rocket
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Active Players', value: '10,000+', icon: Users },
  { label: 'Daily Matches', value: '500+', icon: Gamepad2 },
  { label: 'Prize Pool', value: '$250K+', icon: Trophy },
  { label: 'Countries', value: '45+', icon: Globe },
];

const values = [
  {
    icon: Shield,
    title: 'Fair Play',
    description: 'We ensure a level playing field with strict anti-cheat measures and skill-based matchmaking.'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Building a supportive community where players help each other improve and succeed.'
  },
  {
    icon: Target,
    title: 'Competitive Excellence',
    description: 'Fostering high-level competition while maintaining sportsmanship and respect.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Constantly evolving our platform with cutting-edge features and technology.'
  }
];

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Former pro player turned entrepreneur with a vision for better esports infrastructure.',
    avatar: ''
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Esports',
    bio: 'Tournament organizer with 10+ years experience in competitive gaming.',
    avatar: ''
  },
  {
    name: 'Marcus Williams',
    role: 'Lead Developer',
    bio: 'Full-stack developer passionate about creating seamless gaming experiences.',
    avatar: ''
  },
  {
    name: 'Emily Rodriguez',
    role: 'Community Manager',
    bio: 'Building bridges between players and creating an inclusive gaming environment.',
    avatar: ''
  }
];

export default function AboutPage() {
  useEffect(() => {
    // Hero animation
    gsap.timeline()
      .from('.hero-content > *', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });

    // Stats counter animation
    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
      },
      textContent: 0,
      duration: 2,
      ease: 'power1.out',
      snap: { textContent: 1 },
      stagger: 0.2,
      onUpdate: function() {
        this.targets().forEach((target: any) => {
          const value = target.getAttribute('data-value');
          if (value) {
            target.textContent = Math.floor(this.progress() * parseInt(value.replace(/\D/g, ''))) + value.replace(/[0-9]/g, '');
          }
        });
      }
    });

    // Values animation
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: '.values-section',
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Team animation
    gsap.from('.team-member', {
      scrollTrigger: {
        trigger: '.team-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Mission statement animation
    gsap.from('.mission-content', {
      scrollTrigger: {
        trigger: '.mission-section',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/20 to-black pb-20 pt-32">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-96 h-96 rounded-full bg-indigo-600 blur-[128px] -top-48 left-1/4"></div>
          <div className="absolute w-96 h-96 rounded-full bg-blue-600 blur-[128px] -bottom-48 right-1/4"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="hero-content text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Raijin Ascendancy
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We're building the future of competitive gaming by creating a platform where 
              players of all skill levels can practice, compete, and grow together.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-400 hover:bg-indigo-600/10">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                  <div 
                    className="stat-item text-4xl font-bold text-white mb-2"
                    data-value={stat.value}
                  >
                    0
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-20">
        <div className="container mx-auto px-6">
          <Card className="mission-content bg-gradient-to-r from-indigo-950/50 to-blue-950/50 border-indigo-800/50 p-12 text-center max-w-4xl mx-auto">
            <Rocket className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              To democratize competitive gaming by providing accessible, high-quality practice 
              environments and tournament opportunities for players worldwide. We believe that 
              with the right tools and community, anyone can achieve their esports dreams.
            </p>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-20 bg-gradient-to-b from-black to-indigo-950/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index} 
                  className="value-card bg-zinc-900/50 border-zinc-800 p-6 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Raijin Ascendancy was born from a simple frustration: finding quality practice 
                  matches as a competitive player was unnecessarily difficult. Our founders, 
                  themselves former professional players, experienced firsthand the challenges 
                  of organizing scrims, tracking performance, and building teams.
                </p>
                <p>
                  What started as a Discord server for organizing matches quickly grew into 
                  something bigger. Players wanted better tools, coaches needed analytics, 
                  and teams required proper management systems. We listened, and we built.
                </p>
                <p>
                  Today, Raijin Ascendancy serves thousands of players across multiple games, 
                  facilitating hundreds of matches daily. But we're just getting started. 
                  Our vision extends beyond matchmaking – we're creating an ecosystem where 
                  every player can reach their full potential.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-32 h-32 text-white/20" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-indigo-600 rounded-lg p-6 max-w-xs">
                <Star className="w-8 h-8 text-white mb-2" />
                <p className="text-white font-medium">
                  "The best platform for serious players who want to improve"
                </p>
                <p className="text-indigo-200 text-sm mt-2">- Pro Player Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-20 bg-gradient-to-b from-black to-indigo-950/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-member text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-indigo-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Future of Competitive Gaming</h2>
            <p className="text-xl text-gray-300 mb-8">
              We're constantly innovating to bring you the best competitive gaming experience. 
              Here's what's coming next:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <h3 className="font-semibold mb-2">AI Coaching</h3>
                <p className="text-gray-400 text-sm">
                  Advanced AI analysis to help you improve faster than ever
                </p>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <h3 className="font-semibold mb-2">Mobile App</h3>
                <p className="text-gray-400 text-sm">
                  Manage your team and track stats on the go
                </p>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <h3 className="font-semibold mb-2">More Games</h3>
                <p className="text-gray-400 text-sm">
                  Expanding to support all major competitive titles
                </p>
              </Card>
            </div>
            <Link href="/register">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Be Part of the Journey
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-blue-600/20 to-cyan-600/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you're a casual player looking to improve or a pro seeking quality practice, 
              there's a place for you at Raijin Ascendancy.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/tournaments">
                <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-400 hover:bg-indigo-600/10">
                  View Tournaments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}