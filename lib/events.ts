// // lib/events.ts
// import { apiClient } from './api/client';
// import { AttendTournamentParams } from '../../scrim/events';

// export const eventsApi = {
//   attendTournament: (params: AttendTournamentParams) => 
//     apiClient('/events/attend', {
//       method: 'POST',
//       body: params,
//     }),
    
//   getTournaments: () => 
//     apiClient('/events/tournaments'),
    
//   getTournamentById: (id: string) => 
//     apiClient(`/events/tournaments/${id}`),
// };