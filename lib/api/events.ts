// lib/api/events.ts
import { apiClient } from './client';
import { AttendTournamentParams } from '@/types';

export const eventsApi = {
  attendTournament: (params: AttendTournamentParams) => 
    apiClient('/events/attend', {
      method: 'POST',
      body: params,
    }),
    
  getTournaments: () => 
    apiClient('/events/tournaments'),
    
  getTournamentById: (id: string) => 
    apiClient(`/events/tournaments/${id}`),
};