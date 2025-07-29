import { getTranslations } from "next-intl/server";
import { MatchCard } from "@/components/MatchCard";
import { MatchSection } from "@/components/MatchSection";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getLiveMatches,
  getUpcomingMatches,
  getRecentMatches,
  formatMatchDate,
  getMatchStatusDisplay,
  type ScheduleEvent,
} from "@/services/lol-schedule.service";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("Schedule");
  const tNav = await getTranslations("Navigation");

  // Get all match data
  let liveMatches: ScheduleEvent[] = [];
  let upcomingMatches: ScheduleEvent[] = [];
  let recentMatches: ScheduleEvent[] = [];
  let lastUpdated = "";

  try {
    const [live, upcoming, recent] = await Promise.all([
      getLiveMatches(locale === "pt" ? "pt-BR" : "en-US"),
      getUpcomingMatches(locale === "pt" ? "pt-BR" : "en-US"),
      getRecentMatches(locale === "pt" ? "pt-BR" : "en-US"),
    ]);

    liveMatches = live;
    upcomingMatches = upcoming;
    recentMatches = recent;

    // Get last updated time from the first successful response
    if (live.length > 0 || upcoming.length > 0 || recent.length > 0) {
      lastUpdated = new Date().toISOString();
    }
  } catch (error) {
    console.error("Error fetching schedule data:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6">
            <span className="text-3xl">📅</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
          {lastUpdated && (
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-slate-300 text-sm">
                {t("lastUpdated")}:{" "}
                {formatMatchDate(
                  lastUpdated,
                  locale === "pt" ? "pt-BR" : "en-US"
                )}
              </span>
            </div>
          )}
        </div>

        {/* Live Matches */}
        <MatchSection
          title={
            <>
              <span className="text-red-500 mr-2">🔴</span>
              {t("liveMatches")}
            </>
          }
          matches={liveMatches}
          locale={locale}
          emptyIcon={<span className="text-2xl">⏸️</span>}
          emptyText={t("noLiveMatches")}
          badgeColor="bg-red-500/20 border border-red-500/30 text-red-300"
          badgeText={
            liveMatches.length > 0 ? `${liveMatches.length} ao vivo` : undefined
          }
        />

        {/* Upcoming Matches */}
        <MatchSection
          title={
            <>
              <span className="text-blue-400 mr-2">📅</span>
              {t("upcomingMatches")}
            </>
          }
          matches={upcomingMatches}
          locale={locale}
          emptyIcon={<span className="text-2xl">�</span>}
          emptyText={t("noUpcomingMatches")}
          badgeColor="bg-blue-500/20 border border-blue-500/30 text-blue-300"
          badgeText={
            upcomingMatches.length > 0
              ? `${upcomingMatches.length} agendadas`
              : undefined
          }
        />

        {/* Recent Matches */}
        <MatchSection
          title={
            <>
              <span className="text-gray-400 mr-2">✅</span>
              {t("recentMatches")}
            </>
          }
          matches={recentMatches}
          locale={locale}
          emptyIcon={<span className="text-2xl">📊</span>}
          emptyText={t("noRecentMatches")}
          badgeColor="bg-gray-500/20 border border-gray-500/30 text-gray-300"
          badgeText={
            recentMatches.length > 0
              ? `${recentMatches.length} finalizadas`
              : undefined
          }
        />
      </main>
    </div>
  );
}
