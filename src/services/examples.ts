// Examples of using the League of Legends information services
import {
  dataDragonService,
  lolEsportsService,
  bettingHousesService,
  playerTransfersService,
  type Champion,
  type PlayerTransfer,
  type TransferRumor,
} from '@/services';

// ========================================
// 🎮 DATA DRAGON EXAMPLES (Champions, Items, Runes)
// ========================================

// Get all champions
export async function getAllChampions() {
  try {
    const champions = await dataDragonService.getChampions('pt_BR');
    console.log('Champions:', Object.keys(champions).length);
    return champions;
  } catch (error) {
    console.error('Failed to fetch champions:', error);
    return {};
  }
}

// Get specific champion details
export async function getChampionDetails(championName: string) {
  try {
    const champion = await dataDragonService.getChampion(championName, 'pt_BR');
    console.log('Champion:', champion.name, champion.title);
    
    // Get champion image URL
    const imageUrl = dataDragonService.getChampionImageUrl(champion.image.full);
    console.log('Champion image:', imageUrl);
    
    return { champion, imageUrl };
  } catch (error) {
    console.error('Failed to fetch champion:', error);
    return null;
  }
}

// Get current patch and items
export async function getCurrentPatchItems() {
  try {
    const patch = await dataDragonService.getCurrentPatch();
    const items = await dataDragonService.getItems('pt_BR');
    
    console.log('Current patch:', patch);
    console.log('Items count:', Object.keys(items).length);
    
    return { patch, items };
  } catch (error) {
    console.error('Failed to fetch patch/items:', error);
    return { patch: '', items: {} };
  }
}

// ========================================
// 🏆 LOL ESPORTS EXAMPLES (Tournaments, Matches)
// ========================================

// Get today's LoL matches
export async function getTodayMatches() {
  try {
    const matches = await lolEsportsService.getTodayMatches();
    console.log('Today matches:', matches.length);
    
    matches.forEach(match => {
      console.log(`${match.name}: ${match.startTime} - ${match.state}`);
    });
    
    return matches;
  } catch (error) {
    console.error('Failed to fetch today matches:', error);
    return [];
  }
}

// Get live matches with real-time data
export async function getLiveMatchesWithData() {
  try {
    const liveMatches = await lolEsportsService.getLiveMatches();
    console.log('Live matches:', liveMatches.length);
    
    // Get detailed data for each live game
    const matchesWithData = await Promise.all(
      liveMatches.map(async (match) => {
        if (match.games && match.games.length > 0) {
          const gameData = await lolEsportsService.getLiveGameData(
            match.games[0].id,
            lolEsportsService.getISODateMultiplyOf10()
          );
          return { match, gameData };
        }
        return { match, gameData: null };
      })
    );
    
    return matchesWithData;
  } catch (error) {
    console.error('Failed to fetch live matches:', error);
    return [];
  }
}

// Get tournament standings
export async function getTournamentStandings(tournamentId: string) {
  try {
    const standings = await lolEsportsService.getStandings(tournamentId);
    console.log('Tournament standings:', standings.length);
    
    standings.forEach((team, index) => {
      console.log(`${index + 1}. ${team.teamName}: ${team.wins}W - ${team.losses}L`);
    });
    
    return standings;
  } catch (error) {
    console.error('Failed to fetch standings:', error);
    return [];
  }
}

// ========================================
// 🏠 BETTING HOUSES EXAMPLES (Licensed companies)
// ========================================

// Get all licensed betting houses in Brazil
export async function getBrazilianBettingHouses() {
  try {
    const houses = await bettingHousesService.getAllBettingHouses();
    console.log('Licensed betting houses:', houses.length);
    
    houses.forEach(house => {
      console.log(`${house.name}: ${house.rating.overall}/5 - ${house.features.lolBetting ? 'LoL ✓' : 'LoL ✗'}`);
    });
    
    return houses;
  } catch (error) {
    console.error('Failed to fetch betting houses:', error);
    return [];
  }
}

// Get best betting houses for LoL
export async function getBestLolBettingHouses() {
  try {
    const lolHouses = await bettingHousesService.getLolBettingHouses();
    const topRated = lolHouses
      .sort((a, b) => b.rating.overall - a.rating.overall)
      .slice(0, 3);
    
    console.log('Top LoL betting houses:');
    topRated.forEach((house, index) => {
      console.log(`${index + 1}. ${house.name} (${house.rating.overall}/5)`);
      console.log(`   - Welcome bonus: ${house.bonuses?.welcomeBonus}`);
      console.log(`   - Min deposit: R$ ${house.minDeposit}`);
      console.log(`   - Features: ${Object.entries(house.features).filter(([, v]) => v).map(([k]) => k).join(', ')}`);
    });
    
    return topRated;
  } catch (error) {
    console.error('Failed to fetch LoL betting houses:', error);
    return [];
  }
}

// Compare betting houses
export async function compareBettingHouses(houseIds: string[]) {
  try {
    const houses = await bettingHousesService.compareHouses(houseIds);
    
    console.log('Betting house comparison:');
    houses.forEach(house => {
      console.log(`\n${house.name}:`);
      console.log(`  Rating: ${house.rating.overall}/5`);
      console.log(`  Min deposit: R$ ${house.minDeposit}`);
      console.log(`  Max payout: R$ ${house.maxPayout}`);
      console.log(`  LoL betting: ${house.features.lolBetting ? 'Yes' : 'No'}`);
      console.log(`  Live streaming: ${house.features.streaming ? 'Yes' : 'No'}`);
      console.log(`  Mobile app: ${house.features.mobileApp ? 'Yes' : 'No'}`);
    });
    
    return houses;
  } catch (error) {
    console.error('Failed to compare betting houses:', error);
    return [];
  }
}

// ========================================
// � PLAYER TRANSFERS EXAMPLES
// ========================================

// Get recent player transfers
export async function getRecentTransfers() {
  try {
    const transfers = await playerTransfersService.getRecentTransfers(10);
    console.log('Recent transfers:', transfers.length);
    
    transfers.forEach((transfer: PlayerTransfer) => {
      const from = transfer.fromTeam?.name || 'Free agent';
      const to = transfer.toTeam?.name || 'Released';
      console.log(`${transfer.player.summonerName} (${transfer.player.role}): ${from} → ${to}`);
      console.log(`  Date: ${transfer.transferDate} | Type: ${transfer.transferType}`);
    });
    
    return transfers;
  } catch (error) {
    console.error('Failed to fetch recent transfers:', error);
    return [];
  }
}

// Get free agents by role
export async function getFreeAgentsByRole(role: PlayerTransfer['player']['role']) {
  try {
    const freeAgents = await playerTransfersService.getFreeAgents(role);
    console.log(`Free agent ${role}s:`, freeAgents.length);
    
    freeAgents.forEach((player: PlayerTransfer['player']) => {
      console.log(`${player.summonerName} (${player.nationality}, ${player.age} years old)`);
    });
    
    return freeAgents;
  } catch (error) {
    console.error('Failed to fetch free agents:', error);
    return [];
  }
}

// Get transfer rumors
export async function getTransferRumors() {
  try {
    const rumors = await playerTransfersService.getTransferRumors(5);
    const highLikelihood = await playerTransfersService.getHighLikelihoodRumors();
    
    console.log('Latest transfer rumors:', rumors.length);
    console.log('High likelihood rumors:', highLikelihood.length);
    
    highLikelihood.forEach((rumor: TransferRumor) => {
      console.log(`${rumor.playerName}: ${rumor.fromTeam} → ${rumor.toTeam} (${rumor.likelihood})`);
      console.log(`  Source: ${rumor.source} | ${rumor.reportDate}`);
    });
    
    return { rumors, highLikelihood };
  } catch (error) {
    console.error('Failed to fetch transfer rumors:', error);
    return { rumors: [], highLikelihood: [] };
  }
}

// Get transfer statistics
export async function getTransferStats() {
  try {
    const stats = await playerTransfersService.getTransferStats('2025');
    
    console.log('Transfer statistics for 2025:');
    console.log(`Total transfers: ${stats.totalTransfers}`);
    console.log(`Free agents: ${stats.freeAgents}`);
    console.log('By region:', stats.byRegion);
    console.log('By role:', stats.byRole);
    console.log('Most active teams:', stats.mostActiveTeams.slice(0, 5));
    
    return stats;
  } catch (error) {
    console.error('Failed to fetch transfer stats:', error);
    return null;
  }
}

// ========================================
// � COMBINED EXAMPLES
// ========================================

// Get complete match information with champions
export async function getCompleteMatchInfo(matchId: string) {
  try {
    const match = await lolEsportsService.getEventDetails(matchId);
    if (!match) return null;
    
    // Get live data if match is in progress
    let liveData = null;
    if (match.state === 'inProgress' && match.games && match.games.length > 0) {
      liveData = await lolEsportsService.getLiveGameData(
        match.games[0].id,
        lolEsportsService.getISODateMultiplyOf10()
      );
    }
    
    // Get champion data for players
    let championData = {};
    if (liveData?.gameMetadata) {
      const championIds = [
        ...liveData.gameMetadata.blueTeamMetadata.participantMetadata.map(p => p.championId),
        ...liveData.gameMetadata.redTeamMetadata.participantMetadata.map(p => p.championId),
      ];
      
      const champions = await dataDragonService.getChampions('pt_BR');
      championData = Object.fromEntries(
        Object.entries(champions).filter(([, champion]) => 
          championIds.includes((champion as Champion).key)
        )
      );
    }
    
    return {
      match,
      liveData,
      championData,
    };
  } catch (error) {
    console.error('Failed to get complete match info:', error);
    return null;
  }
}

// Get dashboard data (homepage information)
export async function getDashboardData() {
  try {
    const [
      liveMatches,
      upcomingMatches,
      recentTransfers,
      topBettingHouses,
      transferRumors,
    ] = await Promise.allSettled([
      lolEsportsService.getLiveMatches(),
      lolEsportsService.getUpcomingMatches(5),
      playerTransfersService.getRecentTransfers(5),
      bettingHousesService.getTopRatedHouses(3),
      playerTransfersService.getTransferRumors(3),
    ]);
    
    return {
      liveMatches: liveMatches.status === 'fulfilled' ? liveMatches.value : [],
      upcomingMatches: upcomingMatches.status === 'fulfilled' ? upcomingMatches.value : [],
      recentTransfers: recentTransfers.status === 'fulfilled' ? recentTransfers.value : [],
      topBettingHouses: topBettingHouses.status === 'fulfilled' ? topBettingHouses.value : [],
      transferRumors: transferRumors.status === 'fulfilled' ? transferRumors.value : [],
    };
  } catch (error) {
    console.error('Failed to get dashboard data:', error);
    return {
      liveMatches: [],
      upcomingMatches: [],
      recentTransfers: [],
      topBettingHouses: [],
      transferRumors: [],
    };
  }
}

const exampleServices = {
  getAllChampions,
  getChampionDetails,
  getCurrentPatchItems,
  getTodayMatches,
  getLiveMatchesWithData,
  getTournamentStandings,
  getBrazilianBettingHouses,
  getBestLolBettingHouses,
  compareBettingHouses,
  getRecentTransfers,
  getFreeAgentsByRole,
  getTransferRumors,
  getTransferStats,
  getCompleteMatchInfo,
  getDashboardData,
};

export default exampleServices;
