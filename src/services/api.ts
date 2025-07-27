// Services for betting and esports data
import { internalApiClient } from './http-client';
import { cacheService, createCacheKey, cached } from './cache';

// Types for betting data
export interface Game {
  id: string;
  name: string;
  slug: string;
  category: 'moba' | 'fps' | 'battle-royale' | 'rts' | 'fighting';
  image?: string;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  country: string;
  region: string;
  games: string[];
  isActive: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  game: Game;
  startDate: string;
  endDate: string;
  prizePool?: number;
  location?: string;
  isLive: boolean;
  image?: string;
}

export interface Match {
  id: string;
  title: string;
  tournament: Tournament;
  team1: Team;
  team2: Team;
  startTime: string;
  status: 'scheduled' | 'live' | 'finished' | 'cancelled';
  score1?: number;
  score2?: number;
  odds1?: number;
  odds2?: number;
  streamUrl?: string;
}

export interface Bet {
  id: string;
  userId: string;
  matchId: string;
  teamId: string;
  amount: number;
  odds: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  placedAt: string;
}

export interface BetPlacement {
  matchId: string;
  teamId: string;
  amount: number;
  odds: number;
}

// Games Service
export class GamesService {
  private basePath = '/games';

  // Get all active games
  getGames = cached(
    async (): Promise<Game[]> => {
      const response = await internalApiClient.get<Game[]>(this.basePath);
      return response.data;
    },
    () => createCacheKey('games', 'all'),
    10 * 60 * 1000 // 10 minutes cache
  );

  // Get game by slug
  getGameBySlug = cached(
    async (slug: string): Promise<Game | null> => {
      try {
        const response = await internalApiClient.get<Game>(`${this.basePath}/${slug}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch game:', error);
        return null;
      }
    },
    (slug) => createCacheKey('games', 'slug', slug),
    15 * 60 * 1000 // 15 minutes cache
  );

  // Get featured games
  getFeaturedGames = cached(
    async (): Promise<Game[]> => {
      const response = await internalApiClient.get<Game[]>(`${this.basePath}/featured`);
      return response.data;
    },
    () => createCacheKey('games', 'featured'),
    5 * 60 * 1000 // 5 minutes cache
  );
}

// Teams Service
export class TeamsService {
  private basePath = '/teams';

  getTeams = cached(
    async (gameId?: string): Promise<Team[]> => {
      const url = gameId ? `${this.basePath}?game=${gameId}` : this.basePath;
      const response = await internalApiClient.get<Team[]>(url);
      return response.data;
    },
    (gameId) => createCacheKey('teams', gameId || 'all'),
    10 * 60 * 1000
  );

  getTeamBySlug = cached(
    async (slug: string): Promise<Team | null> => {
      try {
        const response = await internalApiClient.get<Team>(`${this.basePath}/${slug}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch team:', error);
        return null;
      }
    },
    (slug) => createCacheKey('teams', 'slug', slug),
    15 * 60 * 1000
  );
}

// Tournaments Service
export class TournamentsService {
  private basePath = '/tournaments';

  getTournaments = cached(
    async (gameId?: string, isLive?: boolean): Promise<Tournament[]> => {
      const params = new URLSearchParams();
      if (gameId) params.append('game', gameId);
      if (isLive !== undefined) params.append('live', String(isLive));
      
      const url = `${this.basePath}?${params.toString()}`;
      const response = await internalApiClient.get<Tournament[]>(url);
      return response.data;
    },
    (gameId, isLive) => createCacheKey('tournaments', gameId || 'all', isLive || 'all'),
    5 * 60 * 1000
  );

  getTournamentBySlug = cached(
    async (slug: string): Promise<Tournament | null> => {
      try {
        const response = await internalApiClient.get<Tournament>(`${this.basePath}/${slug}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch tournament:', error);
        return null;
      }
    },
    (slug) => createCacheKey('tournaments', 'slug', slug),
    10 * 60 * 1000
  );

  getLiveTournaments = async (): Promise<Tournament[]> => {
    return this.getTournaments(undefined, true);
  };
}

// Matches Service
export class MatchesService {
  private basePath = '/matches';

  getMatches = cached(
    async (
      tournamentId?: string,
      status?: Match['status'],
      limit?: number
    ): Promise<Match[]> => {
      const params = new URLSearchParams();
      if (tournamentId) params.append('tournament', tournamentId);
      if (status) params.append('status', status);
      if (limit) params.append('limit', String(limit));
      
      const url = `${this.basePath}?${params.toString()}`;
      const response = await internalApiClient.get<Match[]>(url);
      return response.data;
    },
    (tournamentId, status, limit) => createCacheKey('matches', tournamentId || 'all', status || 'all', limit || 'all'),
    2 * 60 * 1000 // 2 minutes cache for matches
  );

  getMatchById = cached(
    async (id: string): Promise<Match | null> => {
      try {
        const response = await internalApiClient.get<Match>(`${this.basePath}/${id}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch match:', error);
        return null;
      }
    },
    (id) => createCacheKey('matches', 'id', id),
    1 * 60 * 1000 // 1 minute cache for individual matches
  );

  getLiveMatches = async (): Promise<Match[]> => {
    return this.getMatches(undefined, 'live', undefined);
  };

  getUpcomingMatches = async (limit: number = 10): Promise<Match[]> => {
    return this.getMatches(undefined, 'scheduled', limit);
  };

  // Real-time match updates (no cache)
  async getMatchUpdates(matchId: string): Promise<Match | null> {
    try {
      const response = await internalApiClient.get<Match>(`${this.basePath}/${matchId}/live`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch match updates:', error);
      return null;
    }
  }
}

// Betting Service
export class BettingService {
  private basePath = '/bets';

  // Place a bet
  async placeBet(bet: BetPlacement): Promise<Bet> {
    // Clear relevant caches when placing bets
    cacheService.delete(createCacheKey('bets', 'user'));
    
    const response = await internalApiClient.post<Bet>(this.basePath, bet);
    return response.data;
  }

  // Get user's bets
  getUserBets = cached(
    async (status?: Bet['status']): Promise<Bet[]> => {
      const params = status ? `?status=${status}` : '';
      const response = await internalApiClient.get<Bet[]>(`${this.basePath}/user${params}`);
      return response.data;
    },
    (status) => createCacheKey('bets', 'user', status || 'all'),
    30 * 1000 // 30 seconds cache for user bets
  );

  // Get bet by ID
  async getBetById(id: string): Promise<Bet | null> {
    try {
      const response = await internalApiClient.get<Bet>(`${this.basePath}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch bet:', error);
      return null;
    }
  }

  // Cancel a bet
  async cancelBet(id: string): Promise<boolean> {
    try {
      await internalApiClient.delete(`${this.basePath}/${id}`);
      // Clear caches
      cacheService.delete(createCacheKey('bets', 'user'));
      return true;
    } catch (error) {
      console.error('Failed to cancel bet:', error);
      return false;
    }
  }

  // Get betting statistics
  getUserBettingStats = cached(
    async (): Promise<{
      totalBets: number;
      totalWagered: number;
      totalWon: number;
      winRate: number;
    }> => {
      const response = await internalApiClient.get<{
        totalBets: number;
        totalWagered: number;
        totalWon: number;
        winRate: number;
      }>(`${this.basePath}/user/stats`);
      return response.data;
    },
    () => createCacheKey('bets', 'user', 'stats'),
    60 * 1000 // 1 minute cache
  );
}

// Create service instances
export const gamesService = new GamesService();
export const teamsService = new TeamsService();
export const tournamentsService = new TournamentsService();
export const matchesService = new MatchesService();
export const bettingService = new BettingService();
