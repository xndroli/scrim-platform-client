// src/hooks/useTeams.ts
import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Team } from '../types/team';

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await api.get('/teams');
        setTeams(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch teams');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const createTeam = async (teamData: Partial<Team>) => {
    try {
      setLoading(true);
      const response = await api.post('/teams', teamData);
      setTeams([...teams, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create team');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Additional methods for updating, deleting teams, etc.

  return {
    teams,
    loading,
    error,
    createTeam,
    // Other methods
  };
}
