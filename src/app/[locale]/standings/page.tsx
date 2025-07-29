


"use client";
import { useEffect, useState } from "react";
import { getLeagues } from "@/services/lol-esports.service";
import StandingsTableClient from "./StandingsTableClient";

export default function StandingsPage() {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
    console.log("LEagues",leagues)
  useEffect(() => {
    getLeagues().then((leagues) => {
      const leaguesWithTournaments = leagues.map((l: any) => ({
        id: l.id,
        name: l.name,
        image: l.image,
        tournaments: l.tournaments,
      }));
      setLeagues(leaguesWithTournaments);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Classificação 2025</h1>
      {loading ? (
        <div className="text-white text-center py-8">Carregando ligas...</div>
      ) : (
        <StandingsTableClient leagues={leagues} />
      )}
    </div>
  );
}
