// Services barrel export
// Centralized export for all services

// HTTP Client
export { default as HttpClient } from './http-client';
export * from './http-client';

// Data Dragon Service (Champions, Items, Runes)
export { default as dataDragonService } from './data-dragon.service';
export * from './data-dragon.service';

// LoL Esports Service (Tournaments, Matches, Standings)
export { default as lolEsportsService } from './lol-esports.service';
export * from './lol-esports.service';

// Betting Houses Service (Licensed betting companies in Brazil)
export { default as bettingHousesService } from './betting-houses.service';
export * from './betting-houses.service';

// Player Transfers Service (Transfer market, free agents, rumors)
export { default as playerTransfersService } from './player-transfers.service';
export * from './player-transfers.service';

// Import services for instance exports
import dataDragonServiceInstance from './data-dragon.service';
import lolEsportsServiceInstance from './lol-esports.service';
import bettingHousesServiceInstance from './betting-houses.service';
import playerTransfersServiceInstance from './player-transfers.service';

// Re-export common types
export type {
  ApiResponse,
  ApiError,
  FetchOptions,
} from './http-client';

export type {
  Champion,
  Item,
  RuneTree,
} from './data-dragon.service';

export type {
  Tournament,
  Team,
  Player,
  Match,
  Game,
  Stream,
  Standing,
  LiveGameData,
} from './lol-esports.service';

export type {
  BettingHouse,
} from './betting-houses.service';

export type {
  PlayerTransfer,
  TransferWindow,
  TransferRumor,
} from './player-transfers.service';

// Service instances for easy access
export const services = {
  dataDragon: dataDragonServiceInstance,
  lolEsports: lolEsportsServiceInstance,
  bettingHouses: bettingHousesServiceInstance,
  playerTransfers: playerTransfersServiceInstance,
};

export default services;
