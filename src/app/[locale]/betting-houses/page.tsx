import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllBettingHouses } from '@/services/betting-houses.service';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BettingHousesPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('BettingHouses');
  const tNav = await getTranslations('Navigation');

  // Get all licensed betting houses
  const bettingHouses = await getAllBettingHouses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-sm border-b border-white/10">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            🎮 BetEsports
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-slate-300 transition-colors">
              {tNav('home')}
            </Link>
            <Link href="/games" className="text-white hover:text-slate-300 transition-colors">
              {tNav('games')}
            </Link>
            <Link href="/live" className="text-white hover:text-slate-300 transition-colors">
              {tNav('live')}
            </Link>
            <Link href="/tournaments" className="text-white hover:text-slate-300 transition-colors">
              {tNav('tournaments')}
            </Link>
            <Link href="/betting-houses" className="text-slate-300 hover:text-slate-200 transition-colors font-medium">
              {tNav('bettingHouses')}
            </Link>
          </div>
          <div className="flex space-x-3">
            <Link 
              href="/login" 
              className="px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              {tNav('login')}
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
            >
              {tNav('register')}
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
            <span className="text-3xl">🏛️</span>
          </div>
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

        {/* Betting Houses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bettingHouses.map((house) => (
            <div 
              key={house.id} 
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                    {house.brandName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {house.brandName}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(house.rating.overall) ? 'text-yellow-400' : 'text-gray-600'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">
                        {house.rating.overall}/5
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    {t('licensed')}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 line-clamp-2">
                {house.description}
              </p>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-400 text-sm">{t('minDeposit')}</span>
                  <p className="text-white font-semibold">R$ {house.minDeposit}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">{t('maxPayout')}</span>
                  <p className="text-white font-semibold">R$ {house.maxPayout.toLocaleString()}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">{t('features')}</h4>
                <div className="flex flex-wrap gap-2">
                  {house.features.esports && (
                    <span className="px-2 py-1 bg-slate-700/30 border border-slate-600/30 rounded text-slate-300 text-xs">
                      {t('esports')}
                    </span>
                  )}
                  {house.features.liveBetting && (
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-xs">
                      {t('liveBetting')}
                    </span>
                  )}
                  {house.features.streaming && (
                    <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-xs">
                      {t('streaming')}
                    </span>
                  )}
                  {house.features.mobileApp && (
                    <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-300 text-xs">
                      {t('mobileApp')}
                    </span>
                  )}
                  {house.features.cashOut && (
                    <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-300 text-xs">
                      {t('cashOut')}
                    </span>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">{t('paymentMethods')}</h4>
                <div className="flex flex-wrap gap-2">
                  {house.paymentMethods.pix && (
                    <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-300 text-xs">
                      {t('pix')}
                    </span>
                  )}
                  {house.paymentMethods.creditCard && (
                    <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-xs">
                      {t('creditCard')}
                    </span>
                  )}
                  {house.paymentMethods.debitCard && (
                    <span className="px-2 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-300 text-xs">
                      {t('debitCard')}
                    </span>
                  )}
                  {house.paymentMethods.bankTransfer && (
                    <span className="px-2 py-1 bg-gray-500/20 border border-gray-500/30 rounded text-gray-300 text-xs">
                      {t('bankTransfer')}
                    </span>
                  )}
                  {house.paymentMethods.digitalWallet && (
                    <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded text-orange-300 text-xs">
                      {t('digitalWallet')}
                    </span>
                  )}
                </div>
              </div>

              {/* Bonus Info */}
              {house.bonuses && (
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">{t('bonuses')}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{t('welcomeBonus')}</span>
                      <span className="text-slate-300 font-medium">{house.bonuses.welcomeBonus}</span>
                    </div>
                    {house.bonuses.noDepositBonus && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{t('noDepositBonus')}</span>
                        <span className="text-green-300 font-medium">{house.bonuses.noDepositBonus}</span>
                      </div>
                    )}
                    {house.bonuses.loyaltyProgram && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{t('loyaltyProgram')}</span>
                        <span className="text-yellow-300 font-medium">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex space-x-3">
                <a 
                  href={house.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all text-center"
                >
                  {t('visitSite')} →
                </a>
              </div>

              {/* License Info */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Licença: {house.license.number}</span>
                  <span>{t('founded')} {house.foundedYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
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
