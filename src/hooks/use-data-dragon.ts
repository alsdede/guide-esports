'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getChampions,
  getChampion,
  getItems,
  getRunes,
  getCurrentPatch,
  type Champion,
  type Item,
  type RuneTree,
} from '@/services/data-dragon.service';

// Hook para obter a versão atual do patch
export const useCurrentPatch = () => {
  const [patch, setPatch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatch = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentPatch = await getCurrentPatch();
        setPatch(currentPatch);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar patch');
      } finally {
        setLoading(false);
      }
    };

    fetchPatch();
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const currentPatch = await getCurrentPatch();
      setPatch(currentPatch);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar patch');
    } finally {
      setLoading(false);
    }
  }, []);

  return { patch, loading, error, refetch };
};

// Hook para obter todos os campeões
export const useChampions = (locale: string = 'pt_BR') => {
  const [champions, setChampions] = useState<Record<string, Champion>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChampions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getChampions(locale);
      setChampions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar campeões');
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchChampions();
  }, [fetchChampions]);

  return {
    champions,
    championsList: Object.values(champions),
    loading,
    error,
    refetch: fetchChampions,
  };
};

// Hook para obter um campeão específico
export const useChampion = (championName?: string, locale: string = 'pt_BR') => {
  const [champion, setChampion] = useState<Champion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChampion = useCallback(async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getChampion(name, locale);
      setChampion(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar campeão');
      setChampion(null);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    if (championName) {
      fetchChampion(championName);
    }
  }, [championName, fetchChampion]);

  return {
    champion,
    loading,
    error,
    fetchChampion,
  };
};

// Hook para obter todos os itens
export const useItems = (locale: string = 'pt_BR') => {
  const [items, setItems] = useState<Record<string, Item>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItems(locale);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar itens');
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    itemsList: Object.values(items),
    loading,
    error,
    refetch: fetchItems,
  };
};

// Hook para obter runas
export const useRunes = (locale: string = 'pt_BR') => {
  const [runes, setRunes] = useState<RuneTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRunes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRunes(locale);
      setRunes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar runas');
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchRunes();
  }, [fetchRunes]);

  return {
    runes,
    loading,
    error,
    refetch: fetchRunes,
  };
};

// Hook combinado para dados essenciais da homepage
export const useGameData = (locale: string = 'pt_BR') => {
  const { patch, loading: patchLoading } = useCurrentPatch();
  const { champions, loading: championsLoading } = useChampions(locale);
  const { items, loading: itemsLoading } = useItems(locale);

  const loading = patchLoading || championsLoading || itemsLoading;
  const isReady = patch && Object.keys(champions).length > 0 && Object.keys(items).length > 0;

  return {
    patch,
    champions,
    items,
    loading,
    isReady,
  };
};
