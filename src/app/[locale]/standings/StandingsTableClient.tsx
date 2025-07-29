"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getStandingsV3, getTournamentsForLeague } from "@/services/lol-esports.service";


interface Tournament {
  id: string;
  name: string;
}

interface League {
  id: string;
  name: string;
  image?: string;
  tournaments: Tournament[];
}

interface Props {
  leagues: League[];
}

export default function StandingsTableClient({ leagues }: Props) {
  // Seleção única de liga, padrão LCK se existir
  const lckLeague = leagues.find((l) => l.name.toLowerCase().includes("lck"));
  const defaultLeagueId = lckLeague ? lckLeague.id : leagues[0]?.id || "";
  const [selectedLeague, setSelectedLeague] = useState<string>(defaultLeagueId);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [standings, setStandings] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // Atualiza torneios ao mudar seleção de ligas
  useEffect(() => {
    if (!selectedLeague) {
      setTournaments([]);
      setSelectedTournament("");
      return;
    }
    console.log("select league aqui",selectedLeague)
    getTournamentsForLeague(selectedLeague, "pt-BR").then((tournaments) => {
         console.log("DATA tournmanet",tournaments)
      setTournaments(tournaments);
      setSelectedTournament(tournaments[0]?.id || "");
    });
  }, [selectedLeague]);

  // Atualiza standings ao mudar torneio
  useEffect(() => {
    if (!selectedTournament) {
      setStandings([]);
      return;
    }
    setLoading(true);
    getStandingsV3(selectedTournament).then((data) => {
        console.log("DATA STANDING",data)
      setStandings(data);
      setLoading(false);
    });
  }, [selectedTournament]);
    console.log("selectedTournament",selectedTournament)
        console.log("standings",standings)
        console.log("tournaments",tournaments)
  // Renderização dinâmica dos standings
  const renderStandings = () => {
    if (!standings || !standings.standings || standings.standings.length === 0) {
      return <div className="text-white text-center py-8">Nenhum dado encontrado.</div>;
    }
    // Corrigido: acessar stages corretamente
    const stages = standings.standings[0].stages || [];
    if (!Array.isArray(stages) || stages.length === 0) {
      return <div className="text-white text-center py-8">Nenhuma seção encontrada.</div>;
    }
    if (stages.length > 1) {
      return (
        <Tabs defaultValue={stages[0]?.id} className="w-full">
          <TabsList className="mb-4">
            {stages.map((stage: any) => (
              <TabsTrigger key={stage.id} value={stage.id} className="capitalize">
                {stage.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {stages.map((stage: any) => {
            const groupSections = Array.isArray(stage.sections)
              ? stage.sections.filter((section: any) => section.type === "group")
              : [];
            return (
              <TabsContent key={stage.id} value={stage.id}>
                {groupSections.length > 0 ? (
                  groupSections.map((section: any) => (
                    <div key={section.id} className="mb-8">
                      <h2 className="text-xl font-bold text-white mb-2">{section.name}</h2>
                      <Table className="bg-black/30 rounded-xl overflow-hidden">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-white">Posição</TableHead>
                            <TableHead className="text-white">Time</TableHead>
                            <TableHead className="text-white">Vitórias</TableHead>
                            <TableHead className="text-white">Derrotas</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {section.rankings
                            .sort((a: any, b: any) => a.ordinal - b.ordinal)
                            .map((ranking: any) =>
                              ranking.teams.map((team: any) => (
                                <TableRow key={team.id}>
                                  <TableCell className="text-white">{ranking.ordinal}</TableCell>
                                  <TableCell className="flex items-center gap-2 text-white">
                                    <Image src={team.image} alt={team.name} width={32} height={32} className="rounded-full" />
                                    <span className="font-bold">{team.name}</span>
                                  </TableCell>
                                  <TableCell className="text-white">{team.record.wins}</TableCell>
                                  <TableCell className="text-white">{team.record.losses}</TableCell>
                                </TableRow>
                              ))
                            )}
                        </TableBody>
                      </Table>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center py-8">Nenhuma seção encontrada.</div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      );
    }
    // Só um stage
    const stage = stages[0];
    const groupSections = Array.isArray(stage.sections)
      ? stage.sections.filter((section: any) => section.type === "group")
      : [];
    if (groupSections.length === 0) {
      return <div className="text-white text-center py-8">Nenhuma seção encontrada.</div>;
    }
    return (
      <div>
        {groupSections.map((section: any) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">{section.name}</h2>
            <Table className="bg-black/30 rounded-xl overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Posição</TableHead>
                  <TableHead className="text-white">Time</TableHead>
                  <TableHead className="text-white">Vitórias</TableHead>
                  <TableHead className="text-white">Derrotas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.rankings
                  .sort((a: any, b: any) => a.ordinal - b.ordinal)
                  .map((ranking: any) =>
                    ranking.teams.map((team: any) => (
                      <TableRow key={team.id}>
                        <TableCell className="text-white">{ranking.ordinal}</TableCell>
                        <TableCell className="flex items-center gap-2 text-white">
                          <Image src={team.image} alt={team.name} width={32} height={32} className="rounded-full" />
                          <span className="font-bold">{team.name}</span>
                        </TableCell>
                        <TableCell className="text-white">{team.record.wins}</TableCell>
                        <TableCell className="text-white">{team.record.losses}</TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-slate-900 border-slate-700 rounded-xl p-4 mb-4 md:mb-0">
          <h2 className="text-white text-lg font-bold mb-2">Selecione a liga</h2>
          <ul className="h-full">
            {leagues.map((l) => {
              const selected = selectedLeague === l.id;
              return (
                <li
                  key={l.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition border border-transparent ${selected ? "bg-slate-700 text-white border-slate-500" : "hover:bg-slate-800 text-white"}`}
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
                  {selected && (
                    <span className="ml-auto text-green-400 font-bold">✓</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {loading ? (
          <div className="text-white text-center py-8">Carregando classificação...</div>
        ) : (
          renderStandings()
        )}
      </div>
    </div>
  );
}
