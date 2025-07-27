import { MatchCard } from './MatchCard';
import type { ScheduleEvent } from '@/services/lol-schedule.service';
interface MatchSectionProps {
  title: React.ReactNode;
  matches: ScheduleEvent[];
  locale: string;
  emptyIcon: React.ReactNode;
  emptyText: string;
  badgeColor: string;
  badgeText?: string;
}

export function MatchSection({ title, matches, locale, emptyIcon, emptyText, badgeColor, badgeText }: MatchSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          {title}
        </h2>
        {matches.length > 0 && badgeText && (
          <span className={`px-3 py-1 rounded-full text-sm border ${badgeColor}`}>{badgeText}</span>
        )}
      </div>
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, idx) => (
            <MatchCard key={match.match?.id || idx} match={match} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 text-center">
          <div className="w-16 h-16 bg-gray-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            {emptyIcon}
          </div>
          <p className="text-gray-400">{emptyText}</p>
        </div>
      )}
    </section>
  );
}
