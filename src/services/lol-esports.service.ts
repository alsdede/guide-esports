// LoL Esports API service
// For tournaments, matches, schedules, standings

import { lolesportsApiClient, feedClient } from './http-client';

export interface Tournament {
  id: string;
  slug: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  image?: string;
  region?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  code: string;
  image?: string;
  region?: string;
  players?: Player[];
}

export interface Player {
  id: string;
  summonerName: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  role: 'top' | 'jungle' | 'middle' | 'bottom' | 'utility';
  team?: {
    id: string;
    name: string;
  };
}

export interface Match {
  id: string;
  name: string;
  startTime: string;
  state: 'unstarted' | 'inProgress' | 'completed';
  type: 'show' | 'match';
  blockName?: string;
  league: {
    id: string;
    name: string;
    slug: string;
  };
  tournament: {
    id: string;
    name: string;
  };
  teams: Team[];
  games?: Game[];
  streams?: Stream[];
}

export interface Game {
  id: string;
  number: number;
  state: 'unstarted' | 'inProgress' | 'completed';
  teams: {
    id: string;
    side: 'blue' | 'red';
    result?: {
      outcome: 'win' | 'loss';
      gameWins: number;
    };
  }[];
  vods?: {
    id: string;
    parameter: string;
    locale: string;
    mediaLocale: {
      locale: string;
      englishName: string;
      translatedName: string;
    };
    provider: string;
    offset: number;
  }[];
}

export interface Stream {
  mediaLocale: {
    locale: string;
    englishName: string;
    translatedName: string;
  };
  parameter: string;
  provider: string;
}

export interface Standing {
  teamId: string;
  teamName: string;
  teamSlug: string;
  wins: number;
  losses: number;
  ties?: number;
  gameWins?: number;
  gameLosses?: number;
  position: number;
}

export interface LiveGameData {
  gameMetadata: {
    gameId: string;
    state: string;
    blueTeamMetadata: {
      teamID: string;
      participantMetadata: Array<{
        participantID: number;
        summonerName: string;
        championId: string;
        role: string;
      }>;
    };
    redTeamMetadata: {
      teamID: string;
      participantMetadata: Array<{
        participantID: number;
        summonerName: string;
        championId: string;
        role: string;
      }>;
    };
  };
  gameData?: {
    gameTime: number;
    blueTeam: {
      totalGold: number;
      inhibitors: number;
      towers: number;
      barons: number;
      dragons: number;
      participants: Array<{
        participantID: number;
        totalGold: number;
        level: number;
        kills: number;
        deaths: number;
        assists: number;
        creepScore: number;
        currentHealth: number;
        maxHealth: number;
      }>;
    };
    redTeam: {
      totalGold: number;
      inhibitors: number;
      towers: number;
      barons: number;
      dragons: number;
      participants: Array<{
        participantID: number;
        totalGold: number;
        level: number;
        kills: number;
        deaths: number;
        assists: number;
        creepScore: number;
        currentHealth: number;
        maxHealth: number;
      }>;
    };
  };
}

// Get tournament schedule
export const getSchedule = async (region?: string): Promise<Match[]> => {
  try {
    const params = new URLSearchParams({
      'hl': 'pt-BR',
    });

    if (region) {
      params.append('leagueId', region);
    }

    const response = await lolesportsApiClient.get<{
      data: {
        schedule: {
          events: Match[];
        };
      };
    }>(`/getSchedule?${params}`);

    return response.data.data.schedule.events;
  } catch (error) {
    console.error('Failed to fetch schedule:', error);
    return [];
  }
};

// Get live matches
export const getLiveMatches = async (): Promise<Match[]> => {
  const allMatches = await getSchedule();
  return allMatches.filter(match => match.state === 'inProgress');
};

// Get upcoming matches
export const getUpcomingMatches = async (limit: number = 10): Promise<Match[]> => {
  const allMatches = await getSchedule();
  const upcoming = allMatches
    .filter(match => match.state === 'unstarted')
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  return upcoming.slice(0, limit);
};

// Get today's matches
export const getTodayMatches = async (): Promise<Match[]> => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const allMatches = await getSchedule();
  return allMatches.filter(match => {
    const matchDate = new Date(match.startTime);
    return matchDate >= startOfDay && matchDate < endOfDay;
  });
};

// Get event details
export const getEventDetails = async (eventId: string): Promise<Match | null> => {
  try {
    const response = await lolesportsApiClient.get<{
      data: {
        event: Match;
      };
    }>(`/getEventDetails?hl=pt-BR&id=${eventId}`);

    return response.data.data.event;
  } catch (error) {
    console.error('Failed to fetch event details:', error);
    return null;
  }
};

// Get tournament standings
export const getStandings = async (tournamentId: string): Promise<Standing[]> => {
  try {
    const response = await lolesportsApiClient.get<{
      data: {
        standings: {
          stages: Array<{
            sections: Array<{
              rankings: Standing[];
            }>;
          }>;
        };
      };
    }>(`/getStandings?hl=pt-BR&tournamentId=${tournamentId}`);

    // Flatten the nested structure
    const standings: Standing[] = [];
    response.data.data.standings.stages.forEach(stage => {
      stage.sections.forEach(section => {
        standings.push(...section.rankings);
      });
    });

    return standings;
  } catch (error) {
    console.error('Failed to fetch standings:', error);
    return [];
  }
};

// Get live game data
export const getLiveGameData = async (gameId: string, startTime?: string): Promise<LiveGameData | null> => {
  try {
    const params = new URLSearchParams();
    if (startTime) {
      params.append('startingTime', startTime);
    }

    const response = await feedClient.get<LiveGameData>(
      `/details/${gameId}?${params}`
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch live game data:', error);
    return null;
  }
};

// Get game window data (timeline)
export const getGameWindow = async (gameId: string, startTime?: string): Promise<unknown> => {
  try {
    const params = new URLSearchParams();
    if (startTime) {
      params.append('startingTime', startTime);
    }

    const response = await feedClient.get(
      `/window/${gameId}?${params}`
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch game window:', error);
    return null;
  }
};

// Utility functions
export const getISODateMultiplyOf10 = (delaySeconds: number = 60): string => {
  const date = new Date();
  date.setMilliseconds(0);

  if (date.getSeconds() % 10 !== 0) {
    date.setSeconds(date.getSeconds() - (date.getSeconds() % 10));
  }

  date.setSeconds(date.getSeconds() - delaySeconds);
  return date.toISOString();
};

// Get leagues/tournaments
export const getLeagues = async (): Promise<Tournament[]> => {
  try {
    const response = await lolesportsApiClient.get<{
      data: {
        leagues: Tournament[];
      };
    }>('/getLeagues?hl=pt-BR');

    return response.data.data.leagues;
  } catch (error) {
    console.error('Failed to fetch leagues:', error);
    return [];
  }
};

// Get teams
export const getTeams = async (tournamentId?: string): Promise<Team[]> => {
  try {
    const params = new URLSearchParams({ 'hl': 'pt-BR' });
    if (tournamentId) {
      params.append('tournamentId', tournamentId);
    }

    const response = await lolesportsApiClient.get<{
      data: {
        teams: Team[];
      };
    }>(`/getTeams?${params}`);

    return response.data.data.teams;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    return [];
  }
};

// Export all functions as default object for compatibility
const lolEsportsService = {
  getSchedule,
  getLiveMatches,
  getUpcomingMatches,
  getTodayMatches,
  getEventDetails,
  getStandings,
  getLiveGameData,
  getGameWindow,
  getISODateMultiplyOf10,
  getLeagues,
  getTeams,
};

export default lolEsportsService;
