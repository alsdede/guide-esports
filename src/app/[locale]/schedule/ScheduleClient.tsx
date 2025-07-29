"use client";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { MatchSection } from "@/components/MatchSection";
import { Card } from "@/components/ui/card";

interface Team {
  id: string;
  name: string;
}

interface League {
  id: string;
  name: string;
  image?: string;
}

interface Match {
  id: string;
  teams: Team[];
  league: League;
  state: "inProgress" | "unstarted" | "completed";
  startTime?: string;
}

interface Props {
  liveMatches: Match[];
  upcomingMatches: Match[];
  recentMatches: Match[];
  leagues: League[];
  locale: string;
  lastUpdated: string;
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  liveLabel: string;
  noLiveLabel: string;
  upcomingLabel: string;
  noUpcomingLabel: string;
  recentLabel: string;
  noRecentLabel: string;
}

export default function ScheduleClient({
  liveMatches,
  upcomingMatches,
  recentMatches,
  leagues,
  locale,
  lastUpdated,
  title,
  subtitle,
  lastUpdatedLabel,
  liveLabel,
  noLiveLabel,
  upcomingLabel,
  noUpcomingLabel,
  recentLabel,
  noRecentLabel,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>(
    undefined
  );
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Clear all filters
  function clearFilters() {
    setSearch("");
    setSelectedLeague(undefined);
    setStatus(undefined);
    setSelectedDate(undefined);
  }

  // Filter matches by search, league, status and date
  function filterMatches(matches: Match[]) {
    return matches.filter((match) => {
      // Search filter (team or league name)
      const searchLower = search.trim().toLowerCase();
      const teamNames = (
        match.teams?.map((t) => t.name).join(" ") || ""
      ).toLowerCase();
      const leagueName = (match.league?.name || "").toLowerCase();
      const bySearch =
        !searchLower ||
        teamNames.includes(searchLower) ||
        leagueName.includes(searchLower);
      // League filter
      const byLeague = !selectedLeague || match.league?.id === selectedLeague;
      // Status filter
      let byStatus = true;
      if (status === "live") byStatus = match.state === "inProgress";
      if (status === "upcoming") byStatus = match.state === "unstarted";
      if (status === "finished") byStatus = match.state === "completed";
      // Date filter
      let byDate = true;
      if (selectedDate && match.startTime) {
        const matchDate = new Date(match.startTime);
        byDate =
          matchDate.getFullYear() === selectedDate.getFullYear() &&
          matchDate.getMonth() === selectedDate.getMonth() &&
          matchDate.getDate() === selectedDate.getDate();
      }
      return bySearch && byLeague && byStatus && byDate;
    });
  }
  console.log(leagues);
  return (
    <div>
      {/* Header e atualizações */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6">
          <span className="text-3xl">📅</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        {lastUpdated && (
          <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-slate-300 text-sm">
              {lastUpdatedLabel}:{" "}
              {new Date(lastUpdated).toLocaleDateString(
                locale === "pt" ? "pt-BR" : "en-US",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          </div>
        )}
      </div>
      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-10">
        <div className="flex-1 flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="flex flex-col gap-1 md:w-72">
              <Label htmlFor="search" className="text-white">
                Pesquisar
              </Label>
              <Input
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Time ou liga..."
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-1 md:w-48">
              <Label htmlFor="status" className="text-white">
                Status
              </Label>
              <Select
                value={status ?? ""}
                onValueChange={(v) => setStatus(v || undefined)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Ao vivo</SelectItem>
                  <SelectItem value="upcoming">Agendado</SelectItem>
                  <SelectItem value="finished">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-center md:w-48">
              <Button
                variant="secondary"
                onClick={clearFilters}
                className="self-center"
              >
                Limpar filtros
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-4 md:items-start md:justify-end">
            <div className="flex flex-col gap-1 md:w-64">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg border bg-slate-800 text-white h-full"
              />
            </div>
            <Card className="md:w-64 h-full max-h-[300px] overflow-y-auto bg-slate-900 border-slate-700">
              {/* League selection list */}
              <Label className="text-white mb-2 px-3 pt-3">Ligas</Label>
              <ul className="h-full">
                <li
                  key="all"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition border border-transparent ${!selectedLeague ? "bg-slate-700 text-white border-slate-500" : "hover:bg-slate-800 text-white"}`}
                  onClick={() => setSelectedLeague(undefined)}
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-slate-600 rounded-full text-lg font-bold">
                    🌐
                  </span>
                  <span className="font-medium">Todas as ligas</span>
                </li>
                {leagues.map((l) => (
                  <li
                    key={l.id}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition border border-transparent ${selectedLeague === l.id ? "bg-slate-700 text-white border-slate-500" : "hover:bg-slate-800 text-white"}`}
                    onClick={() => setSelectedLeague(l.id)}
                  >
                    <Image
                      src={l.image || "/league.svg"}
                      alt={l.name}
                      width={32}
                      height={32}
                      className="rounded-full object-contain bg-slate-600"
                    />
                    <span className="font-medium">{l.name}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
      {/* Seções filtradas */}
      <MatchSection
        title={
          <>
            <span className="text-red-500 mr-2">🔴</span>
            {liveLabel}
          </>
        }
        matches={filterMatches(liveMatches)}
        locale={locale}
        emptyIcon={<span className="text-2xl">⏸️</span>}
        emptyText={noLiveLabel}
        badgeColor="bg-red-500/20 border border-red-500/30 text-red-300"
        badgeText={
          filterMatches(liveMatches).length > 0
            ? `${filterMatches(liveMatches).length} ao vivo`
            : undefined
        }
      />
      <MatchSection
        title={
          <>
            <span className="text-blue-400 mr-2">📅</span>
            {upcomingLabel}
          </>
        }
        matches={filterMatches(upcomingMatches)}
        locale={locale}
        emptyIcon={<span className="text-2xl">📅</span>}
        emptyText={noUpcomingLabel}
        badgeColor="bg-blue-500/20 border border-blue-500/30 text-blue-300"
        badgeText={
          filterMatches(upcomingMatches).length > 0
            ? `${filterMatches(upcomingMatches).length} agendadas`
            : undefined
        }
      />
      <MatchSection
        title={
          <>
            <span className="text-gray-400 mr-2">✅</span>
            {recentLabel}
          </>
        }
        matches={filterMatches(recentMatches)}
        locale={locale}
        emptyIcon={<span className="text-2xl">📊</span>}
        emptyText={noRecentLabel}
        badgeColor="bg-gray-500/20 border border-gray-500/30 text-gray-300"
        badgeText={
          filterMatches(recentMatches).length > 0
            ? `${filterMatches(recentMatches).length} finalizadas`
            : undefined
        }
      />
    </div>
  );
}
