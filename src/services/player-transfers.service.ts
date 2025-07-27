// League of Legends player transfers service
// Transfer market, free agents, rumors, and player movements

export interface PlayerTransfer {
  id: string;
  player: {
    id: string;
    summonerName: string;
    realName?: string;
    nationality: string;
    age: number;
    role: 'top' | 'jungle' | 'middle' | 'bottom' | 'utility';
    image?: string;
  };
  fromTeam?: {
    id: string;
    name: string;
    region: string;
    logo?: string;
  };
  toTeam?: {
    id: string;
    name: string;
    region: string;
    logo?: string;
  };
  transferType: 'permanent' | 'loan' | 'trial' | 'release';
  transferDate: string;
  contractLength?: string; // "2 years", "1 year", etc.
  transferFee?: {
    amount: number;
    currency: string;
    disclosed: boolean;
  };
  officialAnnouncement?: string;
  status: 'completed' | 'pending' | 'rumored';
}

export interface TransferWindow {
  id: string;
  region: string;
  season: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  restrictions?: string[];
}

export interface TransferRumor {
  id: string;
  playerName: string;
  playerId?: string;
  fromTeam: string;
  toTeam: string;
  likelihood: 'low' | 'medium' | 'high' | 'very_high';
  source: string;
  reportDate: string;
  details?: string;
  transferFee?: string;
  contractDetails?: string;
}

// Mock data - In real implementation, this would come from an API or database
const transfers: PlayerTransfer[] = [
  {
    id: 'transfer-001',
    player: {
      id: 'player-faker',
      summonerName: 'Faker',
      realName: 'Lee Sang-hyeok',
      nationality: 'KR',
      age: 28,
      role: 'middle',
      image: '/players/faker.jpg'
    },
    fromTeam: {
      id: 'team-t1',
      name: 'T1',
      region: 'LCK',
      logo: '/teams/t1.png'
    },
    toTeam: {
      id: 'team-t1',
      name: 'T1',
      region: 'LCK',
      logo: '/teams/t1.png'
    },
    transferType: 'permanent',
    transferDate: '2024-11-20',
    contractLength: '3 years',
    officialAnnouncement: 'Faker renova contrato com T1 até 2027',
    status: 'completed'
  }
];

const transferWindows: TransferWindow[] = [
  {
    id: 'lck-2025-spring',
    region: 'LCK',
    season: '2025 Spring',
    startDate: '2024-11-18',
    endDate: '2025-01-08',
    isActive: true,
    restrictions: ['No transfers during playoffs']
  }
];

const rumors: TransferRumor[] = [
  {
    id: 'rumor-001',
    playerName: 'Chovy',
    playerId: 'player-chovy',
    fromTeam: 'Gen.G',
    toTeam: 'T1',
    likelihood: 'medium',
    source: 'ESPN Esports',
    reportDate: '2025-01-15',
    details: 'Possível troca de mid laners entre Gen.G e T1',
    transferFee: 'Não divulgado'
  }
];

// Get recent transfers
export const getRecentTransfers = async (limit: number = 10): Promise<PlayerTransfer[]> => {
  return transfers
    .sort((a, b) => new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime())
    .slice(0, limit);
};

// Get transfers by team
export const getTransfersByTeam = async (teamId: string): Promise<PlayerTransfer[]> => {
  return transfers.filter(transfer =>
    transfer.fromTeam?.id === teamId || transfer.toTeam?.id === teamId
  );
};

// Get transfers by player
export const getTransfersByPlayer = async (playerId: string): Promise<PlayerTransfer[]> => {
  return transfers.filter(transfer => transfer.player.id === playerId);
};

// Get transfers by role
export const getTransfersByRole = async (role: PlayerTransfer['player']['role']): Promise<PlayerTransfer[]> => {
  return transfers.filter(transfer => transfer.player.role === role);
};

// Get free agents (players without teams)
export const getFreeAgents = async (role?: PlayerTransfer['player']['role']): Promise<PlayerTransfer['player'][]> => {
  const freeAgentTransfers = transfers.filter(transfer => 
    transfer.transferType === 'release' && !transfer.toTeam
  );
  
  let players = freeAgentTransfers.map(transfer => transfer.player);
  
  if (role) {
    players = players.filter(player => player.role === role);
  }
  
  return players;
};

// Get transfer windows
export const getTransferWindows = async (region?: string): Promise<TransferWindow[]> => {
  if (region) {
    return transferWindows.filter(window => window.region === region);
  }
  return transferWindows;
};

// Get active transfer windows
export const getActiveTransferWindows = async (): Promise<TransferWindow[]> => {
  return transferWindows.filter(window => window.isActive);
};

// Get transfer rumors
export const getTransferRumors = async (limit: number = 5): Promise<TransferRumor[]> => {
  return rumors
    .sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime())
    .slice(0, limit);
};

// Get high likelihood rumors
export const getHighLikelihoodRumors = async (): Promise<TransferRumor[]> => {
  return rumors.filter(rumor => 
    rumor.likelihood === 'high' || rumor.likelihood === 'very_high'
  );
};

// Get rumors by team
export const getRumorsByTeam = async (teamName: string): Promise<TransferRumor[]> => {
  return rumors.filter(rumor => 
    rumor.fromTeam.toLowerCase().includes(teamName.toLowerCase()) ||
    rumor.toTeam.toLowerCase().includes(teamName.toLowerCase())
  );
};

// Get transfer statistics
export const getTransferStats = async (season?: string): Promise<{
  totalTransfers: number;
  permanentTransfers: number;
  loans: number;
  releases: number;
  freeAgents: number;
  byRegion: Record<string, number>;
  byRole: Record<string, number>;
  mostActiveTeams: Array<{ teamName: string; transfers: number }>;
}> => {
  let filteredTransfers = transfers;
  
  if (season) {
    // Filter by season if provided
    filteredTransfers = transfers.filter(transfer => 
      transfer.transferDate.includes(season)
    );
  }
  
  const byRegion: Record<string, number> = {};
  const byRole: Record<string, number> = {};
  const teamActivity: Record<string, number> = {};
  
  filteredTransfers.forEach(transfer => {
    // Count by region
    if (transfer.toTeam?.region) {
      byRegion[transfer.toTeam.region] = (byRegion[transfer.toTeam.region] || 0) + 1;
    }
    
    // Count by role
    byRole[transfer.player.role] = (byRole[transfer.player.role] || 0) + 1;
    
    // Count team activity
    if (transfer.fromTeam) {
      teamActivity[transfer.fromTeam.name] = (teamActivity[transfer.fromTeam.name] || 0) + 1;
    }
    if (transfer.toTeam) {
      teamActivity[transfer.toTeam.name] = (teamActivity[transfer.toTeam.name] || 0) + 1;
    }
  });
  
  const mostActiveTeams = Object.entries(teamActivity)
    .map(([teamName, transfers]) => ({ teamName, transfers }))
    .sort((a, b) => b.transfers - a.transfers);
  
  const freeAgentsCount = (await getFreeAgents()).length;
  
  return {
    totalTransfers: filteredTransfers.length,
    permanentTransfers: filteredTransfers.filter(t => t.transferType === 'permanent').length,
    loans: filteredTransfers.filter(t => t.transferType === 'loan').length,
    releases: filteredTransfers.filter(t => t.transferType === 'release').length,
    freeAgents: freeAgentsCount,
    byRegion,
    byRole,
    mostActiveTeams,
  };
};

// Search transfers
export const searchTransfers = async (query: string): Promise<PlayerTransfer[]> => {
  const searchTerm = query.toLowerCase();
  return transfers.filter(transfer => 
    transfer.player.summonerName.toLowerCase().includes(searchTerm) ||
    transfer.player.realName?.toLowerCase().includes(searchTerm) ||
    transfer.fromTeam?.name.toLowerCase().includes(searchTerm) ||
    transfer.toTeam?.name.toLowerCase().includes(searchTerm)
  );
};

// Get transfer by ID
export const getTransferById = async (transferId: string): Promise<PlayerTransfer | null> => {
  return transfers.find(transfer => transfer.id === transferId) || null;
};

// Get transfer timeline for a player
export const getPlayerTransferHistory = async (playerId: string): Promise<PlayerTransfer[]> => {
  return transfers
    .filter(transfer => transfer.player.id === playerId)
    .sort((a, b) => new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime());
};

// Get current team roster changes
export const getTeamRosterChanges = async (teamId: string, season?: string): Promise<{
  arrivals: PlayerTransfer[];
  departures: PlayerTransfer[];
}> => {
  let teamTransfers = transfers.filter(transfer =>
    transfer.fromTeam?.id === teamId || transfer.toTeam?.id === teamId
  );
  
  if (season) {
    teamTransfers = teamTransfers.filter(transfer => 
      transfer.transferDate.includes(season)
    );
  }
  
  const arrivals = teamTransfers.filter(transfer => transfer.toTeam?.id === teamId);
  const departures = teamTransfers.filter(transfer => transfer.fromTeam?.id === teamId);
  
  return { arrivals, departures };
};

// Export all functions as default object for compatibility
const playerTransfersService = {
  getRecentTransfers,
  getTransfersByTeam,
  getTransfersByPlayer,
  getTransfersByRole,
  getFreeAgents,
  getTransferWindows,
  getActiveTransferWindows,
  getTransferRumors,
  getHighLikelihoodRumors,
  getRumorsByTeam,
  getTransferStats,
  searchTransfers,
  getTransferById,
  getPlayerTransferHistory,
  getTeamRosterChanges,
};

export default playerTransfersService;
