import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import NewsCard from '@/components/NewsCard';
import Image from 'next/image';

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
            <Link href="/schedule" className="text-white hover:text-slate-300 transition-colors">
              {tNav('schedule')}
            </Link>
            <Link href="/betting-houses" className="text-white hover:text-slate-300 transition-colors">
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


      {/* Hero Section + News */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center w-full mb-16">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
          {/* News Area */}
          <div className="flex flex-col md:flex-row w-full gap-8 items-center justify-center">
            {/* Lateral News Card Left */}
            <NewsCard
              imageUrl="/news-lol.jpg"
              title="Final do CBLOL: Pain x Fluxo"
              description="A grande final do CBLOL acontece neste domingo, com Pain e Fluxo disputando o título."
              date="27/07/2025"
              tag="LOL"
              tagColor="bg-purple-600"
              className="hidden md:block w-64"
            />
            {/* Central News Card (maior) */}
            <NewsCard
              imageUrl="/news-bet.jpg"
              title="Apostas esportivas legalizadas no Brasil!"
              description="SPA/MF concede licenças para as principais casas de apostas. Veja a lista completa e aposte com segurança."
              date="27/07/2025"
              tag="BET"
              tagColor="bg-green-600"
              className="w-full md:w-[420px] shadow-2xl scale-105"
            />
            {/* Lateral News Card Right */}
            <NewsCard
              imageUrl="/news-dota.jpg"
              title="Dota 2: Major de Singapura"
              description="O Major de Dota 2 em Singapura reúne as melhores equipes do mundo em busca do título."
              date="26/07/2025"
              tag="DOTA"
              tagColor="bg-red-600"
              className="hidden md:block w-64"
            />
          </div>
        </div>

        {/* Featured Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t('featuredGames')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* League of Legends */}
            <div className="flex flex-col items-center">
              <Image src="/imgs/logos/LOL.webp" alt="League of Legends" width={108} height={108} className="object-contain w-20 h-20 mb-2" />
              <span className="text-lg font-semibold text-white">{tGames('lol')}</span>
            </div>

            {/* CS2 */}
            <div className="flex flex-col items-center">
              <Image src="/imgs/logos/CSGO.png" alt="CS2" width={108} height={108} className="object-contain w-20 h-20 mb-2" />
              <span className="text-lg font-semibold text-white">{tGames('csgo')}</span>
            </div>

            {/* Valorant (usando logo do DOTA2 como exemplo, ajuste se tiver logo do Valorant) */}
            <div className="flex flex-col items-center">
              <Image src="/imgs/logos/DOTA2.png" alt="Valorant" width={108} height={108} className="object-contain w-20 h-20 mb-2" />
              <span className="text-lg font-semibold text-white">{tGames('valorant')}</span>
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
              className={`px-3 py-1 rounded text-sm ${locale === 'pt' ? 'bg-slate-800 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇧🇷 PT
            </Link>
            <Link 
              href="/" 
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
