import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { 
  getLiveMatches, 
  getUpcomingMatches, 
  getRecentMatches,
  formatMatchDate,
  getMatchStatusDisplay,
  type ScheduleEvent 
} from '@/services/lol-schedule.service';

type Props = {
  params: Promise<{ locale: string }>;
};

function MatchCard({ match, locale }: { match: ScheduleEvent; locale: string }) {
  const status = getMatchStatusDisplay(match.state, match.startTime);
  const formattedDate = formatMatchDate(match.startTime, locale === 'pt' ? 'pt-BR' : 'en-US');

  // Proteção para match.match indefinido
  const matchData = match.match;

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-slate-600/50 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-xs font-medium text-gray-400 bg-slate-800/50 px-2 py-1 rounded">
            {match.league?.name || '-'}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            {matchData?.strategy?.count ? `MD${matchData.strategy.count}` : ''}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-xs mr-1">{status.icon}</span>
          <span className={`text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-3">
        {Array.isArray(matchData?.teams) && matchData.teams.map((team, index) => (
          <div key={team.code || team.name || index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                {team.image ? (
                  <Image
                    src={team.image.replace(/^http:/, 'https:')}
                    alt={team.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs font-bold text-white">
                    {team.code?.charAt(0) || team.name?.charAt(0) || '?'}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{team.name}</p>
                <p className="text-gray-400 text-xs">{team.code}</p>
              </div>
            </div>
            {/* Score and Record */}
            <div className="text-right">
              {team.result && (
                <div className="flex items-center">
                  <span className={`text-lg font-bold mr-2 ${
                    team.result.outcome === 'win' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {team.result.gameWins}
                  </span>
                </div>
              )}
              {team.record && (
                <p className="text-xs text-gray-500">
                  {team.record.wins}V {team.record.losses}D
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Match Time */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-gray-400 text-center">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('Schedule');
  const tNav = await getTranslations('Navigation');

  // Get all match data
  let liveMatches: ScheduleEvent[] = [];
  let upcomingMatches: ScheduleEvent[] = [];
  let recentMatches: ScheduleEvent[] = [];
  let lastUpdated = '';

  try {
    const [live, upcoming, recent] = await Promise.all([
      getLiveMatches(locale === 'pt' ? 'pt-BR' : 'en-US'),
      getUpcomingMatches(locale === 'pt' ? 'pt-BR' : 'en-US'),
      getRecentMatches(locale === 'pt' ? 'pt-BR' : 'en-US')
    ]);

    liveMatches = live;
    upcomingMatches = upcoming;
    recentMatches = recent;
    
    // Get last updated time from the first successful response
    if (live.length > 0 || upcoming.length > 0 || recent.length > 0) {
      lastUpdated = new Date().toISOString();
    }
  } catch (error) {
    console.error('Error fetching schedule data:', error);
  }

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
            <Link href="/schedule" className="text-slate-300 hover:text-slate-200 transition-colors font-medium">
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6">
            <span className="text-3xl">📅</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          {lastUpdated && (
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-slate-300 text-sm">
                {t('lastUpdated')}: {formatMatchDate(lastUpdated, locale === 'pt' ? 'pt-BR' : 'en-US')}
              </span>
            </div>
          )}
        </div>

        {/* Live Matches */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="text-red-500 mr-2">🔴</span>
              {t('liveMatches')}
            </h2>
            {liveMatches.length > 0 && (
              <span className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-1 rounded-full text-sm">
                {liveMatches.length} ao vivo
              </span>
            )}
          </div>
          
          {liveMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.map((match, idx) => (
                <MatchCard key={match.match?.id || idx} match={match} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⏸️</span>
              </div>
              <p className="text-gray-400">{t('noLiveMatches')}</p>
            </div>
          )}
        </section>

        {/* Upcoming Matches */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="text-blue-400 mr-2">📅</span>
              {t('upcomingMatches')}
            </h2>
            {upcomingMatches.length > 0 && (
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                {upcomingMatches.length} agendadas
              </span>
            )}
          </div>
          
          {upcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((match, idx) => (
                <MatchCard key={match.match?.id || idx} match={match} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📭</span>
              </div>
              <p className="text-gray-400">{t('noUpcomingMatches')}</p>
            </div>
          )}
        </section>

        {/* Recent Matches */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="text-gray-400 mr-2">✅</span>
              {t('recentMatches')}
            </h2>
            {recentMatches.length > 0 && (
              <span className="bg-gray-500/20 border border-gray-500/30 text-gray-300 px-3 py-1 rounded-full text-sm">
                {recentMatches.length} finalizadas
              </span>
            )}
          </div>
          
          {recentMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentMatches.map((match, idx) => (
                <MatchCard key={match.match?.id || idx} match={match} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-gray-400">{t('noRecentMatches')}</p>
            </div>
          )}
        </section>
      </main>

      {/* Language Switcher */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          <div className="flex space-x-2">
            <Link 
              href="/schedule" 
              locale="pt" 
              className={`px-3 py-1 rounded text-sm ${locale === 'pt' ? 'bg-slate-800 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇧🇷 PT
            </Link>
            <Link 
              href="/schedule" 
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
