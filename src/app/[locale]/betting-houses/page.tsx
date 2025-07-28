import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

import { Card } from '@/components/ui/card';
import BettingHousesTableWrapper from '@/components/BettingHousesTableWrapper';
import NewsCard from '@/components/NewsCard';
// import { cn } from '@/lib/utils';
import { getAllBettingHouses } from '@/services/betting-houses.service';



export default async function BettingHousesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('BettingHouses');
  const tNav = await getTranslations('Navigation');
  const bettingHouses = await getAllBettingHouses();

  // Objeto de traduções para Client Component
  const translations = {
    name: t('name'),
    rating: t('rating'),
    paymentMethods: t('paymentMethods'),
    licensed: t('licensed'),
    notLicensed: t('notLicensed'),
    coupon: t('coupon'),
    hasCoupon: t('hasCoupon'),
    noCoupon: t('noCoupon'),
    actions: t('actions'),
    visitSite: t('visitSite'),
    searchByName: t('searchByName'),
    pix: t('pix'),
    creditCard: t('creditCard'),
    debitCard: t('debitCard'),
    bankTransfer: t('bankTransfer'),
    digitalWallet: t('digitalWallet'),
  };
  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
    
      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col items-center">
      
        {/* Page Header */}
        <div className="text-center mb-12">
       
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-400 font-medium">
              {bettingHouses.length} {t('licensed')} • SPA/MF
            </span>
          </div>
        </div>

        {/* Tabela interativa Client Component */}
        <BettingHousesTableWrapper houses={bettingHouses} translations={translations} locale={locale} />


        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg max-w-3xl w-full">
          <div className="flex items-start">
            <div className="w-6 h-6 text-yellow-400 mr-3 mt-0.5">⚠️</div>
            <div>
              <h3 className="text-yellow-300 font-semibold mb-2">Aviso Importante</h3>
              <p className="text-yellow-100 text-sm leading-relaxed">
                Aposte com responsabilidade. O jogo pode causar dependência. Procure ajuda se necessário. 
                Apenas maiores de 18 anos podem apostar. Estas casas de apostas são licenciadas pela 
                Secretaria de Prêmios e Apostas do Ministério da Fazenda (SPA/MF) do Brasil.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Language Switcher */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          <div className="flex space-x-2">
            <Link 
              href="/betting-houses" 
              locale="pt" 
              className={`px-3 py-1 rounded text-sm ${locale === 'pt' ? 'bg-slate-800 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇧🇷 PT
            </Link>
            <Link 
              href="/betting-houses" 
              locale="en" 
              className={`px-3 py-1 rounded text-sm ${locale === 'en' ? 'bg-slate-800 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇺🇸 EN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
