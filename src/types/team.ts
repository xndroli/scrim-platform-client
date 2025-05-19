// types/team.ts
import { User } from './auth';

export interface Team {
  id: number;
  name: string;
  logo?: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: number;
  userId: number;
  username: string;
  profileImage?: string;
  role: 'owner' | 'manager' | 'player';
  joinedAt: string;
}

export interface TeamWithMembers extends Team {
  members: TeamMember[];
}
