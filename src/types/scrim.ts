// types/scrim.ts
export interface Scrim {
  id: number;
  title: string;
  game: string;
  scheduledAt: string;
  creatorId: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  maxTeams: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScrimParticipant {
  id: number;
  teamId: number;
  teamName: string;
  teamLogo?: string;
  status: 'confirmed' | 'pending' | 'rejected';
  joinedAt: string;
}

export interface Match {
  id: number;
  scrimId: number;
  mapName?: string;
  startTime?: string;
  endTime?: string;
  createdAt: string;
}

export interface MatchResult {
  id: number;
  matchId: number;
  teamId: number;
  teamName: string;
  placement: number;
  score: number;
}

export interface PlayerMatchStat {
  id: number;
  matchId: number;
  userId: number;
  username: string;
  profileImage?: string;
  kills: number;
  deaths: number;
  assists: number;
  damageDealt: number;
}

export interface ScrimWithDetails extends Scrim {
  participants: ScrimParticipant[];
  matches: Match[];
}

export interface MatchWithDetails extends Match {
  results: MatchResult[];
  playerStats: PlayerMatchStat[];
}