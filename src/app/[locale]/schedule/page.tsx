import { getTranslations } from "next-intl/server";
import { MatchCard } from "@/components/MatchCard";
import { MatchSection } from "@/components/MatchSection";
import ScheduleClient from "./ScheduleClient";

import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getLiveMatches,
  getUpcomingMatches,
  getRecentMatches,
  formatMatchDate,
  getMatchStatusDisplay,
  type ScheduleEvent,
  getLeagues,
} from "@/services/lol-schedule.service";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Schedule");
  const tNav = await getTranslations("Navigation");

  // Get all match data
  let liveMatches: ScheduleEvent[] = [];
  let upcomingMatches: ScheduleEvent[] = [];
  let recentMatches: ScheduleEvent[] = [];
  let lastUpdated = "";
  let leagues: { id: string; name: string; image:string; }[] = [];

  try {
    const [live, upcoming, recent, leaguesData] = await Promise.all([
      getLiveMatches(locale === "pt" ? "pt-BR" : "en-US"),
      getUpcomingMatches(locale === "pt" ? "pt-BR" : "en-US"),
      getRecentMatches(locale === "pt" ? "pt-BR" : "en-US"),
      getLeagues(),
    ]);
    liveMatches = live;
    upcomingMatches = upcoming;
    recentMatches = recent;
    leagues = leaguesData.map((l: any) => ({ id: l.id, name: l.name,image:l.image }));
    if (live.length > 0 || upcoming.length > 0 || recent.length > 0) {
      lastUpdated = new Date().toISOString();
    }
  } catch (error) {
    console.error("Error fetching schedule data:", error);
  }
  console.log("leagues",leagues)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <main className="container mx-auto px-4 py-16">
        <ScheduleClient
          liveMatches={liveMatches}
          upcomingMatches={upcomingMatches}
          recentMatches={recentMatches}
          leagues={leagues}
          locale={locale}
          lastUpdated={lastUpdated}
          title={t("title")}
          subtitle={t("subtitle")}
          lastUpdatedLabel={t("lastUpdated")}
          liveLabel={t("liveMatches")}
          noLiveLabel={t("noLiveMatches")}
          upcomingLabel={t("upcomingMatches")}
          noUpcomingLabel={t("noUpcomingMatches")}
          recentLabel={t("recentMatches")}
          noRecentLabel={t("noRecentMatches")}
        />
      </main>
    </div>
  );
}
