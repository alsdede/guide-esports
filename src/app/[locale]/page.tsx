import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');
  const tNav = await getTranslations('Navigation');
  const tGames = await getTranslations('Games');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            🎮 BetEsports
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-purple-300 transition-colors">
              {tNav('home')}
            </Link>
            <Link href="/games" className="text-white hover:text-purple-300 transition-colors">
              {tNav('games')}
            </Link>
            <Link href="/live" className="text-white hover:text-purple-300 transition-colors">
              {tNav('live')}
            </Link>
            <Link href="/tournaments" className="text-white hover:text-purple-300 transition-colors">
              {tNav('tournaments')}
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {tNav('register')}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <Link 
            href="/games" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            {t('cta')}
          </Link>
        </div>

        {/* Featured Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t('featuredGames')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* League of Legends */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {tGames('lol')}
              </h3>
              <p className="text-gray-400 mb-4">
                World Championship 2025
              </p>
              <Link 
                href="/games/lol" 
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Ver Apostas →
              </Link>
            </div>

            {/* CS2 */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg mb-4 flex items-center justify-center text-2xl">
                🔫
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {tGames('csgo')}
              </h3>
              <p className="text-gray-400 mb-4">
                Major Championship
              </p>
              <Link 
                href="/games/cs2" 
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Ver Apostas →
              </Link>
            </div>

            {/* Valorant */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-600 rounded-lg mb-4 flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {tGames('valorant')}
              </h3>
              <p className="text-gray-400 mb-4">
                Champions Tour
              </p>
              <Link 
                href="/games/valorant" 
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Ver Apostas →
              </Link>
            </div>
          </div>
        </section>

        {/* Live Matches */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t('liveMatches')}
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <p>Nenhuma partida ao vivo no momento</p>
              <p className="text-sm mt-2">Volte em breve para ver as partidas ao vivo!</p>
            </div>
          </div>
        </section>
      </main>

      {/* Language Switcher */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          <div className="flex space-x-2">
            <Link 
              href="/" 
              locale="pt" 
              className={`px-3 py-1 rounded text-sm ${locale === 'pt' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇧🇷 PT
            </Link>
            <Link 
              href="/" 
              locale="en" 
              className={`px-3 py-1 rounded text-sm ${locale === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇺🇸 EN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
