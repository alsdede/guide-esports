import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScheduleEvent, Team, League, Match } from '@/services/lol-schedule.service';

interface MatchData {
  id: string;
  state: string;
  startTime: string;
  blockName: string;
  league: League;
  teams: Team[];
  strategy: Match['strategy'];
  liveData?: Record<string, unknown>;
  games?: Record<string, unknown>[];
}

interface MatchStore {
  currentMatch: MatchData | null;
  matchesCache: Map<string, MatchData>;
  
  setCurrentMatch: (match: ScheduleEvent) => void;
  getCurrentMatch: () => MatchData | null;
  cacheMatch: (matchId: string, match: MatchData) => void;
  getCachedMatch: (matchId: string) => MatchData | null;
  clearCurrentMatch: () => void;
}

export const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      currentMatch: null,
      matchesCache: new Map(),

      setCurrentMatch: (match: ScheduleEvent) => {
        const matchData: MatchData = {
          id: match.match?.id || 'unknown',
          state: match.state,
          startTime: match.startTime,
          blockName: match.blockName,
          league: match.league,
          teams: match.match?.teams || [],
          strategy: match.match?.strategy || { count: 1, type: 'bestOf' },
        };

        set((state) => {
          const newCache = new Map(state.matchesCache);
          newCache.set(matchData.id, matchData);
          
          return {
            currentMatch: matchData,
            matchesCache: newCache,
          };
        });
      },

      getCurrentMatch: () => get().currentMatch,

      cacheMatch: (matchId: string, match: MatchData) => {
        set((state) => {
          const newCache = new Map(state.matchesCache);
          newCache.set(matchId, match);
          return { matchesCache: newCache };
        });
      },

      getCachedMatch: (matchId: string) => {
        return get().matchesCache.get(matchId) || null;
      },

      clearCurrentMatch: () => set({ currentMatch: null }),
    }),
    {
      name: 'match-store',
      partialize: (state) => ({
        currentMatch: state.currentMatch,
      }),
    }
  )
);