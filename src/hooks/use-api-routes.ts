'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import type { Champion } from '@/services/data-dragon.service';

// Hook para usar API routes quando precisar de cache server-side
export const useApiChampions = () => {
  const locale = useLocale();
  const [champions, setChampions] = useState<Record<string, Champion>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChampions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/champions?locale=${locale}`, {
        next: { revalidate: 3600 }, // Cache por 1 hora
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar campeões');
      }

      const data = await response.json();
      setChampions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
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

// Hook para obter um campeão específico via API route
export const useApiChampion = (championName?: string) => {
  const locale = useLocale();
  const [champion, setChampion] = useState<Champion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChampion = useCallback(async (name: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/champions/${name}?locale=${locale}`, {
        next: { revalidate: 7200 }, // Cache por 2 horas
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Campeão não encontrado');
        }
        throw new Error('Erro ao buscar campeão');
      }

      const data = await response.json();
      setChampion(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
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

// Hook para obter patch via API route
export const useApiPatch = () => {
  const [patch, setPatch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatch = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/patch', {
          next: { revalidate: 1800 }, // Cache por 30 minutos
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar patch');
        }

        const data = await response.json();
        setPatch(data.patch);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
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

      const response = await fetch('/api/patch', {
        cache: 'no-cache', // Force refetch
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar patch');
      }

      const data = await response.json();
      setPatch(data.patch);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  return { patch, loading, error, refetch };
};
