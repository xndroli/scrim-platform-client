interface Event {
    id: string;
    title: string;
    creator: string;
    game: string;
    rating: number;
    totalSlots: number;
    availableSlots: number;
    description: string;
    coverColor: string;
    coverUrl: string;
    videoUrl: string;
    summary: string;
    createdAt: Date | null;
};

interface Team {
    id: string;
    teamId: string;
    teamName: string;
    captainId: string;
    captainName: string;
    createdAt: Date | null;
};

interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
    teamId: number;
};

interface EventParams {
    title: string;
    creator: string;
    game: string;
    rating: number;
    coverUrl: string;
    coverColor: string;
    description: string;
    totalSlots: number;
    videoUrl: string;
    summary: string;
};

interface AttendTournamentParams {
    tournamentId: string;
    userId: string;
    teamId: string;
};

type AuthCredentials = {
  fullName: string;
  email: string;
  teamId?: number;
  password: string;
};

type AttendTournamentParams = {
  tournamentId: string;
  userId: string;
  teamId?: string;
};

// Add API response types
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};