'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { 
  useChampions, 
  useChampion, 
  useCurrentPatch 
} from '@/hooks/use-data-dragon';
import { 
  useApiChampions, 
  useApiChampion 
} from '@/hooks/use-api-routes';
import { getChampionImageUrl } from '@/services/data-dragon.service';

// Exemplo de componente usando hooks client-side (mais rápido)
export function ChampionsGrid() {
  const t = useTranslations('champions');
  const locale = useLocale();
  const [selectedChampion, setSelectedChampion] = useState<string>('');
  
  // Client-side approach - mais rápido, sem cache server
  const { champions, loading, error } = useChampions(locale);
  const { champion: selectedChampionData } = useChampion(selectedChampion, locale);
  const { patch } = useCurrentPatch();

  if (loading) return <div className="animate-pulse">Carregando campeões...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <span className="text-sm text-gray-500">Patch {patch}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {Object.values(champions).map((champion) => (
          <button
            key={champion.id}
            onClick={() => setSelectedChampion(champion.id)}
            className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <img
              src={getChampionImageUrl(champion.image.full)}
              alt={champion.name}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-sm font-medium truncate">
                {champion.name}
              </p>
              <p className="text-gray-300 text-xs truncate">
                {champion.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedChampionData && (
        <div className="mt-8 p-6 bg-gray-900 rounded-lg">
          <div className="flex items-start gap-6">
            <img
              src={getChampionImageUrl(selectedChampionData.image.full)}
              alt={selectedChampionData.name}
              className="w-32 h-32 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">
                {selectedChampionData.name}
              </h3>
              <p className="text-gray-300 mb-4">
                {selectedChampionData.title}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {selectedChampionData.blurb}
              </p>
              <div className="mt-4 flex gap-2">
                {selectedChampionData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-800 text-purple-200 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Exemplo de componente usando API routes (com cache server-side)
export function CachedChampionsGrid() {
  const t = useTranslations('champions');
  const [selectedChampion, setSelectedChampion] = useState<string>('');
  
  // API routes approach - cache server-side, melhor para SEO
  const { champions, loading, error } = useApiChampions();
  const { champion: selectedChampionData } = useApiChampion(selectedChampion);

  if (loading) return <div className="animate-pulse">Carregando campeões...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('title')} (Cached)</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {Object.values(champions).map((champion) => (
          <button
            key={champion.id}
            onClick={() => setSelectedChampion(champion.id)}
            className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <img
              src={getChampionImageUrl(champion.image.full)}
              alt={champion.name}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-sm font-medium truncate">
                {champion.name}
              </p>
              <p className="text-gray-300 text-xs truncate">
                {champion.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedChampionData && (
        <div className="mt-8 p-6 bg-gray-900 rounded-lg">
          <div className="flex items-start gap-6">
            <img
              src={getChampionImageUrl(selectedChampionData.image.full)}
              alt={selectedChampionData.name}
              className="w-32 h-32 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">
                {selectedChampionData.name}
              </h3>
              <p className="text-gray-300 mb-4">
                {selectedChampionData.title}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {selectedChampionData.blurb}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook combinado que decide quando usar cada abordagem
export function useSmartChampions() {
  const [useServerCache, setUseServerCache] = useState(false);
  
  // Client-side para interações rápidas
  const clientData = useChampions();
  
  // Server-side para SEO e cache
  const serverData = useApiChampions();
  
  const toggleCacheStrategy = () => {
    setUseServerCache(!useServerCache);
  };

  return {
    ...( useServerCache ? serverData : clientData ),
    useServerCache,
    toggleCacheStrategy,
    strategy: useServerCache ? 'server-cache' : 'client-side',
  };
}
