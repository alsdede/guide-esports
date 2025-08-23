'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCachedTransfers, type Transfer, type TransferDay } from '@/services/transfers.service';

// Componente para o ícone do jogador baseado na role
const PlayerIcon = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-[14px] h-[14px] text-gray-300"
    >
      <g fillRule="evenodd">
        <g fillRule="nonzero">
          <g>
            <path d="M5.14 2c1.58 1.21 5.58 5.023 6.976 9.953s0 10.047 0 10.047c-2.749-3.164-5.893-5.2-6.18-5.382l-.02-.013C5.45 13.814 3 8.79 3 8.79c3.536.867 4.93 4.279 4.93 4.279C7.558 8.698 5.14 2 5.14 2zm14.976 5.907s-1.243 2.471-1.814 4.604c-.235.878-.285 2.2-.29 3.058v.282c.003.347.01.568.01.568s-1.738 2.397-3.38 3.678c.088-1.601.062-3.435-.208-5.334.928-2.023 2.846-5.454 5.682-6.856zm-2.124-5.331s-2.325 3.052-2.836 6.029c-.11.636-.201 1.194-.284 1.695-.379.584-.73 1.166-1.05 1.733-.033-.125-.06-.25-.095-.375-.302-1.07-.704-2.095-1.16-3.08.053-.146.103-.29.17-.438 0 0 1.814-3.78 5.255-5.564z" 
              transform="translate(-2164.000000, -763.000000) translate(2164.000000, 763.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

// Componente para o badge do tipo de transferência
const TransferBadge = ({ type }: { type: Transfer['type'] }) => {
  const params = useParams();
  const locale = params?.locale as string || 'pt';

  const getBadgeConfig = (transferType: Transfer['type']) => {
    const translations = {
      pt: {
        Join: 'ENTROU',
        Leave: 'SAIU',
        Renew: 'RENOVOU',
        Inactive: 'INATIVO',
        Removed: 'REMOVIDO'
      },
      en: {
        Join: 'JOIN',
        Leave: 'LEAVE',
        Renew: 'RENEW',
        Inactive: 'INACTIVE',
        Removed: 'REMOVED'
      }
    };

    const currentLang = locale.startsWith('pt') ? 'pt' : 'en';
    
    switch (transferType) {
      case 'Join':
        return {
          bg: 'bg-[#2662d9]',
          text: translations[currentLang].Join
        };
      case 'Leave':
        return {
          bg: 'bg-[#e23670]',
          text: translations[currentLang].Leave
        };
      case 'Renew':
        return {
          bg: 'bg-[#8b5cf6]',
          text: translations[currentLang].Renew
        };
      case 'Inactive':
        return {
          bg: 'bg-[#6b7280]',
          text: translations[currentLang].Inactive
        };
      case 'Removed':
        return {
          bg: 'bg-[#dc2626]',
          text: translations[currentLang].Removed
        };
    }
  };

  const config = getBadgeConfig(type);

  return (
    <div className={`text-[8px] min-w-[30px] text-center font-black px-2 rounded text-white uppercase ${config.bg}`}>
      {config.text}
    </div>
  );
};

// Função para obter cor baseada na região
const getRegionColor = (region: string) => {
  switch (region) {
    case 'LCK':
      return 'bg-red-600'; // Coreia do Sul - Vermelho
    case 'LEC':
      return 'bg-blue-600'; // Europa - Azul
    case 'LCS':
      return 'bg-green-600'; // América do Norte - Verde
    case 'LPL':
      return 'bg-yellow-600'; // China - Amarelo
    case 'PCS':
      return 'bg-purple-600'; // Pacífico - Roxo
    case 'VCS':
      return 'bg-orange-600'; // Vietnã - Laranja
    default:
      return 'bg-gray-600'; // Padrão - Cinza
  }
};

export default function TransfersSection() {
  const params = useParams();
  const locale = params?.locale as string || 'pt';
  const [transfersData, setTransfersData] = useState<TransferDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Traduções para as strings da interface
  const t = {
    pt: {
      rosterChanges: 'MUDANÇAS DE ROSTER',
      loading: 'Carregando transferências...',
      cacheData: 'Dados de cache',
      noTransfers: 'Nenhuma transferência encontrada'
    },
    en: {
      rosterChanges: 'ROSTER CHANGES',
      loading: 'Loading transfers...',
      cacheData: 'Cache data',
      noTransfers: 'No transfers found'
    }
  };

  const currentLang = locale.startsWith('pt') ? 'pt' : 'en';
  console.log(transfersData.length)
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getCachedTransfers({
          limit: 20 // Limitar a 20 transferências para não sobrecarregar
        });
        
        if (response.success) {
          setTransfersData(response.data);
        } else {
          setError(response.error || 'Erro ao carregar transferências');
          // Usar dados de fallback em caso de erro
          setTransfersData(getFallbackData());
        }
      } catch (err) {
        console.error('Erro ao buscar transferências:', err);
        setError('Erro ao carregar transferências');
        // Usar dados de fallback em caso de erro
        setTransfersData(getFallbackData());
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  // Dados de fallback em caso de erro na API
  const getFallbackData = (): TransferDay[] => [
    {
      date: "12 de Agosto",
      transfers: [
        {
          type: "Join",
          playerName: "Lark",
          playerRole: "AD Carry",
          teamName: "MVKE",
          teamCode: "MVKE",
          teamLogo: undefined,
          description: "joins the team",
          region: "APAC"
        },
        {
          type: "Join",
          playerName: "Shrimp",
          playerRole: "Jungle",
          teamName: "FlyQuest",
          teamCode: "FLY",
          teamLogo: undefined,
          description: "joins the team",
          region: "AME"
        }
      ]
    },
    {
      date: "11 de Agosto",
      transfers: [
        {
          type: "Join",
          playerName: "NuQ",
          playerRole: "Support",
          teamName: "Boss DP",
          teamCode: "BDP",
          teamLogo: undefined,
          description: "joins the team",
          region: "EMEA"
        },
        {
          type: "Leave",
          playerName: "Ersin",
          playerRole: "Support",
          teamName: "Boss DP",
          teamCode: "BDP",
          teamLogo: undefined,
          description: "leaves the team",
          region: "EMEA"
        }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center rounded-lg bg-purple-200/[0.06] border border-black/10 py-8">
        <span className="font-black text-sm text-gray-200 uppercase">{t[currentLang].rosterChanges}</span>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-3 text-gray-300">{t[currentLang].loading}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center rounded-lg bg-purple-200/[0.06] border border-black/10 py-8 ">
      <div className="flex flex-col items-center gap-2">
        <span className="font-black text-sm text-gray-200 uppercase">{t[currentLang].rosterChanges}</span>
        {error && (
          <span className="text-xs text-yellow-400">
            {t[currentLang].cacheData} • {error}
          </span>
        )}
        {/* {dataSource && (
          <span className="text-xs text-gray-400">
            Fonte: {dataSource === 'real' ? '🌐 Scraping LoL Wiki' : 
                   dataSource === 'mock' ? '📝 Dados de exemplo' : 
                   dataSource === 'fallback' ? '⚠️ Fallback' : 
                   '💾 Cache'}
          </span>
        )} */}
      </div>
      
      <div className="w-full max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="flex flex-col gap-8">
          {transfersData
            .filter(day => day.transfers.length > 0) // Só mostrar dias com transferências
            .map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col gap-4 w-full">
              <span className="font-black text-xs text-white uppercase px-5">
                {day.date}
              </span>
              
              {day.transfers.map((transfer, transferIndex) => (
                <div 
                  key={transferIndex}
                  className="flex items-center text-xs justify-between w-full hover:bg-gray-800/50 px-8 py-[6px] rounded duration-200 cursor-pointer"
                  title={transfer.description}
                >
                  <div className="flex items-center gap-3">
                    <TransferBadge type={transfer.type} />
                    
                    <span className="font-black flex items-center gap-4 text-gray-200 uppercase">
                      <PlayerIcon />
                      {transfer.playerName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-200 uppercase">
                      {transfer.teamCode}
                    </span>
                    
                    <div className="w-[22px] h-[22px] bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                      {transfer.teamLogo ? (
                        <Image
                          src={transfer.teamLogo}
                          alt={transfer.teamName}
                          width={22}
                          height={22}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center text-xs font-bold text-white ${getRegionColor(transfer.region)}`}>
                          {transfer.teamCode.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {transfersData.filter(day => day.transfers.length > 0).length === 0 && !loading && (
        <div className="py-8 text-center">
          <span className="text-gray-400">{t[currentLang].noTransfers}</span>
        </div>
      )}
    </div>
  );
}
