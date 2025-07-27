// League of Legends Esports Schedule API Service

// API Configuration
const API_BASE_URL = 'https://esports-api.lolesports.com/persisted/gw';
const API_KEY = '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z';

// Common headers for API requests
const getApiHeaders = (): HeadersInit => ({
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
});

// Utility function to make authenticated API calls
const makeApiRequest = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  try {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      headers: getApiHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Error making API request to ${endpoint}:`, error);
    throw error;
  }
};

export interface Team {
  code: string;
  image: string;
  name: string;
  result?: {
    gameWins: number;
    outcome: 'win' | 'loss';
  };
  record?: {
    losses: number;
    wins: number;
  };
}

export interface Match {
  teams: Team[];
  id: string;
  strategy: {
    count: number;
    type: 'bestOf';
  };
}

export interface League {
  name: string;
  slug: string;
}

export interface ScheduleEvent {
  startTime: string;
  blockName: string;
  match: Match;
  state: 'unstarted' | 'inProgress' | 'completed';
  type: 'match';
  league: League;
}

export interface SchedulePages {
  older?: string;
  newer?: string;
}

export interface Schedule {
  updated: string;
  pages: SchedulePages;
  events: ScheduleEvent[];
}

export interface ScheduleResponse {
  data: {
    schedule: Schedule;
  };
}

// Get schedule from LoL Esports API
export const getSchedule = async (hl: string = 'pt-BR'): Promise<Schedule> => {
  try {
    const data = await makeApiRequest<ScheduleResponse>('getSchedule', { hl });
    return data.data.schedule;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw new Error('Failed to fetch schedule');
  }
};

// Get schedule for specific league
export const getScheduleByLeague = async (
  leagueId: string,
  hl: string = 'pt-BR'
): Promise<Schedule> => {
  try {
    const data = await makeApiRequest<ScheduleResponse>('getSchedule', { hl, leagueId });
    return data.data.schedule;
  } catch (error) {
    console.error('Error fetching schedule by league:', error);
    throw new Error('Failed to fetch schedule for league');
  }
};

// Get schedule for date range
export const getScheduleByDate = async (
  pageToken?: string,
  hl: string = 'pt-BR'
): Promise<Schedule> => {
  try {
    const params: Record<string, string> = { hl };
    if (pageToken) {
      params.pageToken = pageToken;
    }
    
    const data = await makeApiRequest<ScheduleResponse>('getSchedule', params);
    return data.data.schedule;
  } catch (error) {
    console.error('Error fetching schedule by date:', error);
    throw new Error('Failed to fetch schedule by date');
  }
};

// Get leagues data
export interface LeagueData {
  id: string;
  slug: string;
  name: string;
  region: string;
  image: string;
  priority: number;
}

export interface LeaguesResponse {
  data: {
    leagues: LeagueData[];
  };
}

export const getLeagues = async (hl: string = 'pt-BR'): Promise<LeagueData[]> => {
  try {
    const data = await makeApiRequest<LeaguesResponse>('getLeagues', { hl });
    return data.data.leagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw new Error('Failed to fetch leagues');
  }
};

// Get live match details
export interface LiveMatchDetails {
  data: {
    event: {
      match: Match;
      streams: Array<{
        mediaLocale: {
          locale: string;
          englishName: string;
        };
        source: string;
        url: string;
      }>;
    };
  };
}

export const getLiveMatchDetails = async (
  matchId: string,
  hl: string = 'pt-BR'
): Promise<LiveMatchDetails> => {
  try {
    const data = await makeApiRequest<LiveMatchDetails>('getLive', { hl, id: matchId });
    return data;
  } catch (error) {
    console.error('Error fetching live match details:', error);
    throw new Error('Failed to fetch live match details');
  }
};

// Filter events by state
export const filterEventsByState = (
  events: ScheduleEvent[],
  state: ScheduleEvent['state']
): ScheduleEvent[] => {
  return events.filter(event => event.state === state);
};

// Filter events by league
export const filterEventsByLeague = (
  events: ScheduleEvent[],
  leagueSlug: string
): ScheduleEvent[] => {
  return events.filter(event => event.league.slug === leagueSlug);
};

// Get upcoming matches (next 24 hours)
export const getUpcomingMatches = async (hl: string = 'pt-BR'): Promise<ScheduleEvent[]> => {
  try {
    const schedule = await getSchedule(hl);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return schedule.events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= now && eventDate <= tomorrow && event.state === 'unstarted';
    });
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw new Error('Failed to fetch upcoming matches');
  }
};

// Get live matches
export const getLiveMatches = async (hl: string = 'pt-BR'): Promise<ScheduleEvent[]> => {
  try {
    const schedule = await getSchedule(hl);
    return filterEventsByState(schedule.events, 'inProgress');
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw new Error('Failed to fetch live matches');
  }
};

// Get completed matches (last 24 hours)
export const getRecentMatches = async (hl: string = 'pt-BR'): Promise<ScheduleEvent[]> => {
  try {
    const schedule = await getSchedule(hl);
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return schedule.events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= yesterday && eventDate <= now && event.state === 'completed';
    });
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    throw new Error('Failed to fetch recent matches');
  }
};

// Format date for display
export const formatMatchDate = (dateString: string, locale: string = 'pt-BR'): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Check if match is today
export const isMatchToday = (dateString: string): boolean => {
  const matchDate = new Date(dateString);
  const today = new Date();
  
  return matchDate.toDateString() === today.toDateString();
};

// Get match status display
export const getMatchStatusDisplay = (
  state: ScheduleEvent['state'],
  startTime: string
): { text: string; color: string; icon: string } => {
  const now = new Date();
  const matchTime = new Date(startTime);

  switch (state) {
    case 'inProgress':
      return { text: 'AO VIVO', color: 'text-red-400', icon: '🔴' };
    case 'completed':
      return { text: 'FINALIZADA', color: 'text-gray-400', icon: '✅' };
    case 'unstarted':
      if (matchTime <= now) {
        return { text: 'INICIANDO', color: 'text-yellow-400', icon: '⏰' };
      }
      return { text: 'AGENDADA', color: 'text-blue-400', icon: '📅' };
    default:
      return { text: 'DESCONHECIDO', color: 'text-gray-400', icon: '❓' };
  }
};
