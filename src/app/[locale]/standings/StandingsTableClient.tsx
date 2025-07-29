"use client";

import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Image from "next/image";
import { getStandings, getTournamentsForLeague, Standing } from "@/services/lol-esports.service";

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
  // Seleciona LCK por padrão, senão a primeira liga
  const lckLeague = leagues.find((l) => l.name.toLowerCase().includes("lck"));
  const defaultLeague = lckLeague || leagues[0];
  const [selectedLeague, setSelectedLeague] = useState(defaultLeague?.id || "");
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(false);
    console.log("SELECTEDLEAGUE",selectedLeague)
      console.log("SELECTED TOURNAMENT",selectedTournament)
  // Busca torneios ao trocar de liga
  useEffect(() => {
    if (!selectedLeague) {
      setTournaments([]);
      setSelectedTournament("");
      return;
    }
    getTournamentsForLeague(selectedLeague, "pt-BR").then((tournaments: Tournament[]) => {
        console.log("torneio selecionado",tournaments[0] )
      setTournaments(tournaments);
      setSelectedTournament(tournaments[0]?.id || "");
    });
  }, [selectedLeague]);

  // Busca standings ao trocar de torneio
  useEffect(() => {
    if (!selectedTournament) {
      setStandings([]);
      return;
    }
    setLoading(true);
    console.log("Buscando standings para:", selectedTournament);
    getStandings(selectedTournament).then((data) => {
 
      setStandings(data);
      setLoading(false);
    });
  }, [selectedTournament]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-8">
        <Select value={selectedLeague} onValueChange={setSelectedLeague}>
          <SelectTrigger className="w-40 mb-2 md:mb-0">
            <SelectValue placeholder="Região" />
          </SelectTrigger>
          <SelectContent>
            {leagues.length > 0 && leagues.map((l) => (
              <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTournament} onValueChange={setSelectedTournament} disabled={tournaments.length === 0}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Torneio" />
          </SelectTrigger>
          <SelectContent>
            {tournaments.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="text-white text-center py-8">Carregando classificação...</div>
      ) : (
        <Table className="bg-black/30 rounded-xl overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Vitórias</TableHead>
              <TableHead>Derrotas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-white">Nenhum dado encontrado.</TableCell>
              </TableRow>
            ) : (
              standings.map((team) => (
                <TableRow key={team.teamId}>
                  <TableCell>{team.position}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {/* Se tiver imagem do time, exibe */}
                    {/* <Image src={team.image} alt={team.teamName} width={32} height={32} className="rounded-full" /> */}
                    {team.teamName}
                  </TableCell>
                  <TableCell>{team.wins}</TableCell>
                  <TableCell>{team.losses}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
