// Brazilian licensed betting houses service
// Information about authorized betting companies in Brazil

export interface BettingHouse {
  id: string;
  name: string;
  brandName: string;
  website: string;
  logo?: string;
  license: {
    number: string;
    issuer: 'SPA/MF'; // Secretaria de Prêmios e Apostas do Ministério da Fazenda
    issuedDate: string;
    validUntil: string;
    status: 'active' | 'suspended' | 'revoked';
  };
  features: {
    esports: boolean;
    lolBetting: boolean;
    liveBetting: boolean;
    streaming: boolean;
    mobileApp: boolean;
    cashOut: boolean;
  };
  paymentMethods: {
    pix: boolean;
    creditCard: boolean;
    debitCard: boolean;
    bankTransfer: boolean;
    digitalWallet: boolean;
  };
  bonuses?: {
    welcomeBonus: string;
    noDepositBonus?: string;
    loyaltyProgram: boolean;
  };
  minDeposit: number; // in BRL
  maxPayout: number; // in BRL
  rating: {
    overall: number; // 1-5
    userInterface: number;
    odds: number;
    customerService: number;
    payoutSpeed: number;
  };
  pros: string[];
  cons: string[];
  description: string;
  foundedYear: number;
  headquarters: string;
  lastUpdated: string;
}

// Mock data - Based on SPA/MF licensed companies in Brazil
const bettingHouses: BettingHouse[] = [
  {
    id: 'betnacional',
    name: 'Betnacional',
    brandName: 'Betnacional',
    website: 'https://www.betnacional.com.br',
    license: {
      number: 'SPA/MF-012-2024',
      issuer: 'SPA/MF',
      issuedDate: '2024-01-01',
      validUntil: '2025-12-31',
      status: 'active'
    },
    features: {
      esports: true,
      lolBetting: true,
      liveBetting: true,
      streaming: false,
      mobileApp: true,
      cashOut: true
    },
    paymentMethods: {
      pix: true,
      creditCard: true,
      debitCard: true,
      bankTransfer: true,
      digitalWallet: false
    },
    bonuses: {
      welcomeBonus: 'Bônus de 100% até R$ 200',
      loyaltyProgram: true
    },
    minDeposit: 1,
    maxPayout: 100000,
    rating: {
      overall: 4.2,
      userInterface: 4.3,
      odds: 4.1,
      customerService: 4.0,
      payoutSpeed: 4.4
    },
    pros: [
      'Casa 100% brasileira',
      'Depósito mínimo baixo (R$ 1)',
      'Interface em português',
      'Suporte nacional especializado'
    ],
    cons: [
      'Sem streaming ao vivo',
      'Cobertura de esports limitada'
    ],
    description: 'Casa de apostas brasileira licenciada pela SPA/MF, focada no mercado nacional com interface totalmente em português.',
    foundedYear: 2018,
    headquarters: 'Brasil',
    lastUpdated: '2025-01-20'
  },
  {
    id: 'pixbet',
    name: 'Pixbet',
    brandName: 'Pixbet',
    website: 'https://www.pixbet.com.br',
    license: {
      number: 'SPA/MF-028-2024',
      issuer: 'SPA/MF',
      issuedDate: '2024-01-01',
      validUntil: '2025-12-31',
      status: 'active'
    },
    features: {
      esports: true,
      lolBetting: true,
      liveBetting: true,
      streaming: false,
      mobileApp: true,
      cashOut: false
    },
    paymentMethods: {
      pix: true,
      creditCard: false,
      debitCard: false,
      bankTransfer: false,
      digitalWallet: false
    },
    bonuses: {
      welcomeBonus: 'Primeira aposta grátis',
      loyaltyProgram: false
    },
    minDeposit: 1,
    maxPayout: 50000,
    rating: {
      overall: 3.9,
      userInterface: 4.1,
      odds: 3.8,
      customerService: 3.7,
      payoutSpeed: 4.5
    },
    pros: [
      'Saques via PIX instantâneos',
      'Depósito mínimo de R$ 1',
      'Interface simples',
      'Foco no mercado brasileiro'
    ],
    cons: [
      'Apenas PIX como pagamento',
      'Sem cashout',
      'Cobertura limitada de esports'
    ],
    description: 'Casa de apostas brasileira conhecida pelos saques instantâneos via PIX.',
    foundedYear: 2021,
    headquarters: 'Brasil',
    lastUpdated: '2025-01-20'
  },
  {
    id: 'betano',
    name: 'Betano',
    brandName: 'Betano',
    website: 'https://www.betano.com.br',
    license: {
      number: 'SPA/MF-045-2024',
      issuer: 'SPA/MF',
      issuedDate: '2024-01-01',
      validUntil: '2025-12-31',
      status: 'active'
    },
    features: {
      esports: true,
      lolBetting: true,
      liveBetting: true,
      streaming: true,
      mobileApp: true,
      cashOut: true
    },
    paymentMethods: {
      pix: true,
      creditCard: true,
      debitCard: true,
      bankTransfer: true,
      digitalWallet: true
    },
    bonuses: {
      welcomeBonus: 'Bônus de 100% até R$ 500',
      loyaltyProgram: true
    },
    minDeposit: 20,
    maxPayout: 100000,
    rating: {
      overall: 4.4,
      userInterface: 4.5,
      odds: 4.3,
      customerService: 4.2,
      payoutSpeed: 4.6
    },
    pros: [
      'Streaming ao vivo',
      'Excelente cobertura de LoL',
      'Cashout disponível',
      'App móvel bem desenvolvido'
    ],
    cons: [
      'Depósito mínimo mais alto',
      'Interface pode ser complexa'
    ],
    description: 'Casa de apostas internacional licenciada no Brasil, com forte presença em esports e League of Legends.',
    foundedYear: 2013,
    headquarters: 'Malta',
    lastUpdated: '2025-01-20'
  },
  {
    id: 'sportingbet',
    name: 'Sportingbet',
    brandName: 'Sportingbet',
    website: 'https://www.sportingbet.com.br',
    license: {
      number: 'SPA/MF-067-2024',
      issuer: 'SPA/MF',
      issuedDate: '2024-01-01',
      validUntil: '2025-12-31',
      status: 'active'
    },
    features: {
      esports: true,
      lolBetting: true,
      liveBetting: true,
      streaming: false,
      mobileApp: true,
      cashOut: true
    },
    paymentMethods: {
      pix: true,
      creditCard: true,
      debitCard: true,
      bankTransfer: true,
      digitalWallet: true
    },
    bonuses: {
      welcomeBonus: '100% até R$ 750',
      loyaltyProgram: true
    },
    minDeposit: 10,
    maxPayout: 75000,
    rating: {
      overall: 4.1,
      userInterface: 4.0,
      odds: 4.2,
      customerService: 4.0,
      payoutSpeed: 4.3
    },
    pros: [
      'Marca tradicional no mercado',
      'Boa cobertura de esports',
      'Cashout disponível',
      'Múltiplos métodos de pagamento'
    ],
    cons: [
      'Sem streaming ao vivo',
      'Interface menos moderna'
    ],
    description: 'Casa de apostas tradicional com operação licenciada no Brasil e boa cobertura de esports.',
    foundedYear: 1998,
    headquarters: 'Reino Unido',
    lastUpdated: '2025-01-20'
  },
  {
    id: 'betfair',
    name: 'Betfair',
    brandName: 'Betfair',
    website: 'https://www.betfair.com.br',
    license: {
      number: 'SPA/MF-089-2024',
      issuer: 'SPA/MF',
      issuedDate: '2024-01-01',
      validUntil: '2025-12-31',
      status: 'active'
    },
    features: {
      esports: true,
      lolBetting: true,
      liveBetting: true,
      streaming: false,
      mobileApp: true,
      cashOut: true
    },
    paymentMethods: {
      pix: true,
      creditCard: true,
      debitCard: true,
      bankTransfer: true,
      digitalWallet: false
    },
    bonuses: {
      welcomeBonus: 'Até R$ 300 em apostas grátis',
      loyaltyProgram: true
    },
    minDeposit: 15,
    maxPayout: 200000,
    rating: {
      overall: 4.3,
      userInterface: 4.0,
      odds: 4.7,
      customerService: 4.1,
      payoutSpeed: 4.4
    },
    pros: [
      'Exchange de apostas único',
      'Odds excelentes',
      'Boa cobertura de LoL',
      'Cashout disponível'
    ],
    cons: [
      'Sem streaming ao vivo',
      'Interface pode confundir iniciantes'
    ],
    description: 'Pioneira em exchange de apostas, oferece modelo único de apostas entre usuários com licença no Brasil.',
    foundedYear: 1999,
    headquarters: 'Reino Unido',
    lastUpdated: '2025-01-20'
  }
];

// Get all licensed betting houses
export const getAllBettingHouses = async (): Promise<BettingHouse[]> => {
  return bettingHouses.filter(house => house.license.status === 'active');
};

// Get betting houses that offer LoL betting
export const getLolBettingHouses = async (): Promise<BettingHouse[]> => {
  return bettingHouses.filter(
    house => house.license.status === 'active' && house.features.lolBetting
  );
};

// Get betting houses by rating
export const getTopRatedHouses = async (limit: number = 5): Promise<BettingHouse[]> => {
  return bettingHouses
    .filter(house => house.license.status === 'active')
    .sort((a, b) => b.rating.overall - a.rating.overall)
    .slice(0, limit);
};

// Get betting house by ID
export const getBettingHouse = async (id: string): Promise<BettingHouse | null> => {
  return bettingHouses.find(house => house.id === id) || null;
};

// Get houses with specific features
export const getHousesWithFeatures = async (features: Partial<BettingHouse['features']>): Promise<BettingHouse[]> => {
  return bettingHouses.filter(house => {
    if (house.license.status !== 'active') return false;
    
    return Object.entries(features).every(([key, value]) => {
      if (value === true) {
        return house.features[key as keyof BettingHouse['features']] === true;
      }
      return true;
    });
  });
};

// Get houses with live streaming
export const getHousesWithStreaming = async (): Promise<BettingHouse[]> => {
  return getHousesWithFeatures({ streaming: true });
};

// Get houses with mobile app
export const getHousesWithMobileApp = async (): Promise<BettingHouse[]> => {
  return getHousesWithFeatures({ mobileApp: true });
};

// Compare houses
export const compareHouses = async (houseIds: string[]): Promise<BettingHouse[]> => {
  return bettingHouses.filter(house => houseIds.includes(house.id));
};

// Get houses by minimum deposit range
export const getHousesByDepositRange = async (minDeposit: number, maxDeposit: number): Promise<BettingHouse[]> => {
  return bettingHouses.filter(house => 
    house.license.status === 'active' &&
    house.minDeposit >= minDeposit && 
    house.minDeposit <= maxDeposit
  );
};

// Get statistics
export const getBettingHousesStats = async (): Promise<{
  total: number;
  withEsports: number;
  withLol: number;
  withStreaming: number;
  withMobileApp: number;
  averageRating: number;
}> => {
  const active = bettingHouses.filter(house => house.license.status === 'active');
  
  return {
    total: active.length,
    withEsports: active.filter(h => h.features.esports).length,
    withLol: active.filter(h => h.features.lolBetting).length,
    withStreaming: active.filter(h => h.features.streaming).length,
    withMobileApp: active.filter(h => h.features.mobileApp).length,
    averageRating: active.reduce((sum, h) => sum + h.rating.overall, 0) / active.length,
  };
};

// Check license status
export const checkLicenseStatus = async (houseId: string): Promise<{
  valid: boolean;
  status: string;
  expiresIn?: number; // days
}> => {
  const house = bettingHouses.find(h => h.id === houseId);
  
  if (!house) {
    return { valid: false, status: 'not_found' };
  }

  const now = new Date();
  const expiry = new Date(house.license.validUntil);
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return {
    valid: house.license.status === 'active' && daysUntilExpiry > 0,
    status: house.license.status,
    expiresIn: daysUntilExpiry > 0 ? daysUntilExpiry : undefined,
  };
};

// Export all functions as default object for compatibility
const bettingHousesService = {
  getAllBettingHouses,
  getLolBettingHouses,
  getTopRatedHouses,
  getBettingHouse,
  getHousesWithFeatures,
  getHousesWithStreaming,
  getHousesWithMobileApp,
  compareHouses,
  getHousesByDepositRange,
  getBettingHousesStats,
  checkLicenseStatus,
};

export default bettingHousesService;
