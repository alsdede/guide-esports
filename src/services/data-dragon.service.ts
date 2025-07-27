// League of Legends Data Dragon service
// For champion data, items, runes, etc.

import { dataDragonClient } from './http-client';

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  partype: string;
  stats: Record<string, number>;
}

export interface Item {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into?: string[];
  from?: string[];
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: Record<string, boolean>;
  stats: Record<string, number>;
}

export interface RuneTree {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: {
    runes: {
      id: number;
      key: string;
      icon: string;
      name: string;
      shortDesc: string;
      longDesc: string;
    }[];
  }[];
}

// Functional approach for Data Dragon service
let currentPatch = '14.24.1'; // Will be updated dynamically

// Get current patch version
export const getCurrentPatch = async (): Promise<string> => {
  try {
    const response = await dataDragonClient.get<string[]>('/api/versions.json');
    if (response.success && response.data.length > 0) {
      currentPatch = response.data[0];
      return currentPatch;
    }
    return currentPatch;
  } catch (error) {
    console.error('Failed to fetch current patch:', error);
    return currentPatch;
  }
};

// Get formatted patch version (e.g., "14.24.1")
export const getFormattedPatchVersion = (patchVersion?: string): string => {
  const patch = patchVersion || currentPatch;
  const parts = patch.split('.');
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}.1` : patch;
};

// Champions
export const getChampions = async (locale: string = 'pt_BR'): Promise<Record<string, Champion>> => {
  const patch = getFormattedPatchVersion();
  const response = await dataDragonClient.get<{ data: Record<string, Champion> }>(
    `/cdn/${patch}/data/${locale}/champion.json`
  );
  return response.data.data;
};

export const getChampion = async (championName: string, locale: string = 'pt_BR'): Promise<Champion> => {
  const patch = getFormattedPatchVersion();
  const response = await dataDragonClient.get<{ data: Record<string, Champion> }>(
    `/cdn/${patch}/data/${locale}/champion/${championName}.json`
  );
  const champions = response.data.data;
  const champion = Object.values(champions)[0];
  if (!champion) {
    throw new Error(`Champion ${championName} not found`);
  }
  return champion;
};

// Items
export const getItems = async (locale: string = 'pt_BR'): Promise<Record<string, Item>> => {
  const patch = getFormattedPatchVersion();
  const response = await dataDragonClient.get<{ data: Record<string, Item> }>(
    `/cdn/${patch}/data/${locale}/item.json`
  );
  return response.data.data;
};

// Runes
export const getRunes = async (locale: string = 'pt_BR'): Promise<RuneTree[]> => {
  const patch = getFormattedPatchVersion();
  const response = await dataDragonClient.get<RuneTree[]>(
    `/cdn/${patch}/data/${locale}/runesReforged.json`
  );
  return response.data;
};

// URLs for images
export const getChampionImageUrl = (championImage: string, patch?: string): string => {
  const patchVersion = patch || getFormattedPatchVersion();
  return `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${championImage}`;
};

export const getItemImageUrl = (itemImage: string, patch?: string): string => {
  const patchVersion = patch || getFormattedPatchVersion();
  return `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${itemImage}`;
};

export const getRuneImageUrl = (runeIcon: string): string => {
  return `https://ddragon.leagueoflegends.com/cdn/img/${runeIcon}`;
};

export const getSpellImageUrl = (spellImage: string, patch?: string): string => {
  const patchVersion = patch || getFormattedPatchVersion();
  return `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${spellImage}`;
};

// Summoner spells
export const getSummonerSpells = async (locale: string = 'pt_BR'): Promise<Record<string, unknown>> => {
  const patch = getFormattedPatchVersion();
  const response = await dataDragonClient.get<{ data: Record<string, unknown> }>(
    `/cdn/${patch}/data/${locale}/summoner.json`
  );
  return response.data.data || {};
};

// Export all functions as default object for compatibility
const dataDragonService = {
  getCurrentPatch,
  getFormattedPatchVersion,
  getChampions,
  getChampion,
  getItems,
  getRunes,
  getChampionImageUrl,
  getItemImageUrl,
  getRuneImageUrl,
  getSpellImageUrl,
  getSummonerSpells,
};

export default dataDragonService;
