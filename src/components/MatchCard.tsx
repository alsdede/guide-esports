import Image from 'next/image';
import { formatMatchDate, getMatchStatusDisplay, type ScheduleEvent } from '@/services/lol-schedule.service';
import { Link } from '@/i18n/navigation';
import { useMatchStore } from '@/stores/matchStore';

export function MatchCard({ match, locale }: { match: ScheduleEvent; locale: string }) {
  const setCurrentMatch = useMatchStore((state) => state.setCurrentMatch);
  const status = getMatchStatusDisplay(match.state, match.startTime);
  const formattedDate = formatMatchDate(match.startTime, locale === 'pt' ? 'pt-BR' : 'en-US');
  const matchData = match.match;
  
  // Verificar se a partida está ao vivo ou finalizada para permitir o link
  const isClickable = match.state === 'inProgress' || match.state === 'completed';
  const matchId = match.match?.id || 'unknown';

  const handleMatchClick = () => {
    if (isClickable) {
      setCurrentMatch(match);
    }
  };

  const MatchContent = () => (
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
      {/* Live Indicator */}
      {isClickable && (
        <div className="mt-2 text-center">
          <span className="text-xs text-green-400 font-medium">
            {match.state === 'inProgress' ? '🔴 Clique para assistir' : '📺 Ver detalhes'}
          </span>
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return (
      <Link 
        href={`/live/${matchId}`} 
        className="block hover:scale-105 transition-transform"
        onClick={handleMatchClick}
      >
        <MatchContent />
      </Link>
    );
  }

  return <MatchContent />;
}
