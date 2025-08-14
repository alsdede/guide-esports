// Serviço para buscar dados de transferências
export interface Transfer {
  type: 'Join' | 'Leave' | 'Renew' | 'Inactive' | 'Removed';
  playerName: string;
  playerRole?: string;
  teamName: string;
  teamCode: string;
  teamLogo?: string;
  description: string;
  region: string;
}

export interface TransferDay {
  date: string;
  transfers: Transfer[];
}

export interface TransfersResponse {
  success: boolean;
  data: TransferDay[];
  count: number;
  cached?: boolean;
  source?: string;
  error?: string;
}

export async function getTransfers(options?: {
  region?: string;
  limit?: number;
}): Promise<TransfersResponse> {
  try {
    const params = new URLSearchParams();
    
    if (options?.region) {
      params.set('region', options.region);
    }
    
    if (options?.limit) {
      params.set('limit', options.limit.toString());
    }
    
    const response = await fetch(`/api/transfers?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TransfersResponse = await response.json();
    return data;
    
  } catch (error) {
    console.error('Erro ao buscar transferências:', error);
    
    return {
      success: false,
      data: [],
      count: 0,
      error: 'Falha ao buscar dados de transferências'
    };
  }
}

// Cache simples em memória para evitar múltiplas requisições
let cachedData: TransfersResponse | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export async function getCachedTransfers(options?: {
  region?: string;
  limit?: number;
  forceRefresh?: boolean;
}): Promise<TransfersResponse> {
  const now = Date.now();
  
  // Verificar se o cache é válido
  if (!options?.forceRefresh && cachedData && cacheTime && (now - cacheTime) < CACHE_DURATION) {
    return cachedData;
  }
  
  // Buscar novos dados
  const freshData = await getTransfers(options);
    console.log("frashdata",freshData)
  // Atualizar cache apenas se a requisição foi bem sucedida
  if (freshData.success) {
    cachedData = freshData;
    cacheTime = now;
  }
  
  return freshData;
}
