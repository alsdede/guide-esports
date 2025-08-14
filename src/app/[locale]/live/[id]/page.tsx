"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMatchStore } from "@/stores/matchStore";
import MatchHeader from "@/components/live/MatchHeader";
import GameTabs from "@/components/live/GameTabs";
import GameDetails from "@/components/live/GameDetails";
import StreamPlayer from "@/components/live/StreamPlayer";
import UpcomingMatches from "@/components/live/UpcomingMatches";
import RecentResults from "@/components/live/RecentResults";
import { getLiveGameData, getEventDetails, type EventDetails } from "@/services";

// Mock data para demonstração
const mockMatchData = {
  id: "113487190606782008",
  team1: {
    name: "100 Thieves",
    shortName: "100T",
    logo: "http://static.lolesports.com/teams/1631819887423_100t-2021-worlds.png",
    wins: 0,
    losses: 1,
  },
  team2: {
    name: "FlyQuest",
    shortName: "FLY",
    logo: "http://static.lolesports.com/teams/flyquest-new-on-dark.png",
    wins: 1,
    losses: 0,
  },
  score: { team1: 0, team2: 0 },
  status: "live",
  games: [
    {
      id: 1,
      duration: "29:43",
      status: "finished",
      winner: "team2",
      kills: { team1: 8, team2: 18 },
      gold: { team1: 49625, team2: 62746 },
      objectives: {
        team1: { inhibitors: 0, barons: 0, towers: 1, dragons: ["chemtech"] },
        team2: {
          inhibitors: 2,
          barons: 1,
          towers: 10,
          dragons: ["mountain", "hextech", "hextech", "hextech"],
        },
      },
      players: {
        team1: [
          {
            champion: "Gwen",
            playerName: "100T Sniper",
            level: 15,
            health: { current: 1091, max: 2688 },
            items: ["4633", "3158", "3115", "2055", "1052", null, "3340"],
            cs: 217,
            kills: 0,
            deaths: 4,
            assists: 1,
            gold: 9034,
            goldDiff: -4875,
            isAlive: false,
          },
          {
            champion: "MonkeyKing",
            playerName: "100T River",
            level: 13,
            health: { current: 0, max: 2742 },
            items: ["3111", "3078", "3071", "2021", null, null, "3364"],
            cs: 159,
            kills: 4,
            deaths: 6,
            assists: 1,
            gold: 9941,
            goldDiff: -2179,
            isAlive: false,
          },
          {
            champion: "Azir",
            playerName: "100T Quid",
            level: 16,
            health: { current: 0, max: 2662 },
            items: ["6653", "4630", "3157", "3115", "3020", "1052", "3363"],
            cs: 273,
            kills: 3,
            deaths: 3,
            assists: 4,
            gold: 12911,
            goldDiff: -1088,
            isAlive: false,
          },
          {
            champion: "Jhin",
            playerName: "100T FBI",
            level: 15,
            health: { current: 0, max: 2304 },
            items: ["3142", "3094", "3036", "3009", "2055", "1055", "3363"],
            cs: 294,
            kills: 1,
            deaths: 1,
            assists: 4,
            gold: 11155,
            goldDiff: -2594,
            isAlive: false,
          },
          {
            champion: "Rakan",
            playerName: "100T Eyla",
            level: 12,
            health: { current: 0, max: 2389 },
            items: ["3222", "3111", "3067", "2055", "1029", null, "3364"],
            cs: 26,
            kills: 0,
            deaths: 4,
            assists: 8,
            gold: 6584,
            goldDiff: -2385,
            isAlive: false,
          },
        ],
        team2: [
          {
            champion: "Rumble",
            playerName: "FLY Bwipo",
            level: 18,
            health: { current: 1108, max: 3460 },
            items: ["6653", "4633", "3157", "3020", "2055", "1082", "3363"],
            cs: 286,
            kills: 4,
            deaths: 1,
            assists: 7,
            gold: 13909,
            goldDiff: 4875,
            isAlive: true,
          },
          {
            champion: "Sejuani",
            playerName: "FLY Inspired",
            level: 16,
            health: { current: 1888, max: 4150 },
            items: ["3174", "3110", "3084", "2504", "1082", null, null],
            cs: 217,
            kills: 2,
            deaths: 1,
            assists: 9,
            gold: 12120,
            goldDiff: 2179,
            isAlive: true,
          },
          {
            champion: "Yone",
            playerName: "FLY Quad",
            level: 18,
            health: { current: 0, max: 2470 },
            items: ["6673", "3172", "3153", "3140", "3031", null, "3363"],
            cs: 291,
            kills: 5,
            deaths: 2,
            assists: 4,
            gold: 13999,
            goldDiff: 1088,
            isAlive: false,
          },
          {
            champion: "Ezreal",
            playerName: "FLY Massu",
            level: 16,
            health: { current: 418, max: 3004 },
            items: ["3161", "3158", "3078", "1055", "1038", null, "3363"],
            cs: 267,
            kills: 5,
            deaths: 1,
            assists: 4,
            gold: 13749,
            goldDiff: 2594,
            isAlive: true,
          },
          {
            champion: "Neeko",
            playerName: "FLY Busio",
            level: 13,
            health: { current: 729, max: 2313 },
            items: ["3170", "3152", "2055", null, null, null, "3364"],
            cs: 45,
            kills: 2,
            deaths: 3,
            assists: 7,
            gold: 8969,
            goldDiff: 2385,
            isAlive: true,
          },
        ],
      },
    },
  ],
  patch: "15.15.1",
  streamUrl:
    "https://player.twitch.tv/?channel=ltanorth&parent=hub.maisesports.com.br&autoplay=false",
};

export default function LiveMatchPage() {
  const params = useParams();
  const { currentMatch, getCachedMatch } = useMatchStore();
  const [activeGame, setActiveGame] = useState(1);
  const [matchData, setMatchData] = useState(mockMatchData);
  const [activeGameId, setActiveGameId] = useState("");
  const [gameStatus, setGameStatus] = useState<'loading' | 'unstarted' | 'inProgress' | 'completed'>('loading');
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [allGames, setAllGames] = useState<EventDetails['match']['games']>([]);

  // useEffect para buscar detalhes do evento e determinar o jogo ativo
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!params.id) return;

      try {
        setGameStatus('loading');
        const eventDetails = await getEventDetails(String(params.id));
        console.log("RES EVENTO", eventDetails);
        
        if (eventDetails && eventDetails.match.games) {
          const games = eventDetails.match.games;
          console.log("Games encontrados:", games)
          setAllGames(games); // Armazenar todos os jogos
          
          // Encontrar jogo em andamento
          const inProgressGame = games.find((game) => game.state === 'inProgress');
          
          if (inProgressGame) {
            // Há um jogo em andamento
            setActiveGame(inProgressGame.number); // Define a tab ativa baseada no número do jogo
            setGameStatus('inProgress');
            setStatusMessage(`Jogo ${inProgressGame.number} em andamento`);
          } else {
            // Verificar se há jogos não iniciados
            const unstartedGame = games.find((game) => game.state === 'unstarted');
            
            if (unstartedGame) {
              // Há jogos que ainda não começaram
              setGameStatus('unstarted');
              setStatusMessage(`Aguardando início do jogo ${unstartedGame.number}`);
              setActiveGame(unstartedGame.number); // Define a tab do próximo jogo
            } else {
              // Todos os jogos estão completos - pegar o último jogo
              const lastGame = games[games.length - 1];
              if (lastGame) {
                setGameStatus('completed');
                setStatusMessage(`Partida finalizada - Jogo ${lastGame.number}`);
                setActiveGame(lastGame.number); // Define a tab do último jogo
              }
            }
          }

          // Atualizar dados da partida com informações reais
          if (eventDetails.match && eventDetails.match.teams) {
            setMatchData(prevData => ({
              ...prevData,
              id: eventDetails.id,
              team1: {
                name: eventDetails.match.teams[0]?.name || prevData.team1.name,
                shortName: eventDetails.match.teams[0]?.code || prevData.team1.shortName,
                logo: eventDetails.match.teams[0]?.image || prevData.team1.logo,
                wins: eventDetails.match.teams[0]?.result?.gameWins || 0,
                losses: 0,
              },
              team2: {
                name: eventDetails.match.teams[1]?.name || prevData.team2.name,
                shortName: eventDetails.match.teams[1]?.code || prevData.team2.shortName,
                logo: eventDetails.match.teams[1]?.image || prevData.team2.logo,
                wins: eventDetails.match.teams[1]?.result?.gameWins || 0,
                losses: 0,
              },
              status: inProgressGame ? "live" : "completed",
              league: eventDetails.league?.name || "Unknown League",
            }));
          }
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do evento:", error);
        setGameStatus('completed');
        setStatusMessage("Erro ao carregar dados da partida");
      }
    };

    fetchEventDetails();
  }, [params.id]);

  // useEffect para atualizar activeGameId quando activeGame ou allGames mudam
  useEffect(() => {
    console.log("allGames",allGames, "activegame",activeGame,"allGames")
    if (allGames.length > 0 && activeGame > 0 ) {
      const selectedGame = allGames[activeGame - 1]; // Array é 0-indexed, tab é 1-indexed
      setActiveGameId(selectedGame.id);
      console.log(`Tab ativa: ${activeGame}, Game ID: ${selectedGame.id}`);
    }
  }, [activeGame, allGames]);

  // useEffect para buscar dados do jogo ao vivo
  useEffect(() => {
    if (!activeGameId) return;

    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const fetchLiveData = () => {
      console.log("activeGameId",activeGameId)
      getLiveGameData(activeGameId).then((res) => {
        console.log(`Live data para jogo ${activeGame} (ID: ${activeGameId}):`, res);
        // Aqui você pode processar os dados do jogo ao vivo
        // e atualizar o estado da UI conforme necessário
      });
    };

    // Fazer primeira requisição imediatamente (exceto para jogos não iniciados)
    if (gameStatus !== 'unstarted') {
      fetchLiveData();
    }

    // Só configurar intervalo se o jogo estiver em andamento
    if (gameStatus === 'inProgress') {
      // Calcular quanto tempo falta para o próximo múltiplo de 10 segundos
      const now = new Date();
      const seconds = now.getSeconds();
      const millisecondsIntoSecond = now.getMilliseconds();
      
      // Próximo múltiplo de 10 segundos
      const nextRoundSeconds = Math.ceil(seconds / 10) * 10;
      const delayToNextRound = (nextRoundSeconds - seconds) * 1000 - millisecondsIntoSecond;

      // Timeout para sincronizar com o próximo múltiplo de 10 segundos
      timeoutId = setTimeout(() => {
        fetchLiveData(); // Fazer requisição no tempo "redondo"
        
        // Agora configurar intervalo regular de 10 segundos
        intervalId = setInterval(fetchLiveData, 10000);
      }, delayToNextRound);
    }

    // Cleanup: limpar timeout e intervalo
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeGameId, gameStatus, activeGame]); // Adicionado activeGame como dependência

  useEffect(() => {
    const matchId = Array.isArray(params.id) ? params.id[0] : params.id;

    // Primeiro tenta pegar da store
    if (currentMatch && currentMatch.id === matchId) {
      console.log("Dados da partida vindos da store:", currentMatch);

      // Atualizar o estado com os dados reais da partida do Zustand
      setMatchData((prevData) => ({
        ...prevData,
        id: currentMatch.id,
        team1: {
          name: currentMatch.teams[0]?.name || prevData.team1.name,
          shortName: currentMatch.teams[0]?.code || prevData.team1.shortName,
          logo: currentMatch.teams[0]?.image || prevData.team1.logo,
          wins: currentMatch.teams[0]?.record?.wins || prevData.team1.wins,
          losses:
            currentMatch.teams[0]?.record?.losses || prevData.team1.losses,
        },
        team2: {
          name: currentMatch.teams[1]?.name || prevData.team2.name,
          shortName: currentMatch.teams[1]?.code || prevData.team2.shortName,
          logo: currentMatch.teams[1]?.image || prevData.team2.logo,
          wins: currentMatch.teams[1]?.record?.wins || prevData.team2.wins,
          losses:
            currentMatch.teams[1]?.record?.losses || prevData.team2.losses,
        },
        status: currentMatch.state === "inProgress" ? "live" : "completed",
        league: currentMatch.league.name,
      }));
    } else {
      // Tenta pegar do cache
      const cachedMatch = getCachedMatch(matchId || "");
      if (cachedMatch) {
        console.log("Dados da partida vindos do cache:", cachedMatch);
        // Atualizar com dados do cache (similar ao bloco acima)
        setMatchData((prevData) => ({
          ...prevData,
          id: cachedMatch.id,
          team1: {
            name: cachedMatch.teams[0]?.name || prevData.team1.name,
            shortName: cachedMatch.teams[0]?.code || prevData.team1.shortName,
            logo: cachedMatch.teams[0]?.image || prevData.team1.logo,
            wins: cachedMatch.teams[0]?.record?.wins || prevData.team1.wins,
            losses:
              cachedMatch.teams[0]?.record?.losses || prevData.team1.losses,
          },
          team2: {
            name: cachedMatch.teams[1]?.name || prevData.team2.name,
            shortName: cachedMatch.teams[1]?.code || prevData.team2.shortName,
            logo: cachedMatch.teams[1]?.image || prevData.team2.logo,
            wins: cachedMatch.teams[1]?.record?.wins || prevData.team2.wins,
            losses:
              cachedMatch.teams[1]?.record?.losses || prevData.team2.losses,
          },
          status: cachedMatch.state === "inProgress" ? "live" : "completed",
          league: cachedMatch.league.name,
        }));
      } else {
        console.warn("Match data not found in store or cache for ID:", matchId);
        // Usar dados mock como fallback
      }
    }
  }, [params.id, currentMatch, getCachedMatch]);

  // Renderizar mensagem de status se jogo não iniciou
  if (gameStatus === 'unstarted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-1 flex-col gap-4 sm:gap-8 pt-4 sm:pt-8">
            <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-10">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-7">
                <MatchHeader match={matchData} />
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-8 text-center">
                  <div className="text-yellow-400 text-xl font-bold mb-2">
                    ⏰ Jogo ainda não iniciado
                  </div>
                  <div className="text-gray-300">
                    {statusMessage}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-8 lg:col-span-3">
                <UpcomingMatches />
                <RecentResults />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar página normal
  console.log("matchData", matchData);
  console.log("activeGameId", activeGameId);
  console.log("gameStatus", gameStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-1 flex-col gap-4 sm:gap-8 pt-4 sm:pt-8">
          {/* Status da partida */}
          {statusMessage && (
            <div className={`text-center py-2 px-4 rounded-lg ${
              gameStatus === 'inProgress' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
            }`}>
              {statusMessage}
            </div>
          )}

          <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-10">
            {/* Main Content */}
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-7">
              {/* Match Header */}
              <MatchHeader match={matchData} />

              {/* Game Tabs and Details */}
              <GameTabs
                games={matchData.games}
                activeGame={activeGame}
                onGameChange={setActiveGame}
              />

              <GameDetails
                game={matchData.games[activeGame - 1]}
                teams={[matchData.team1, matchData.team2]}
              />

              {/* Stream Player */}
              <StreamPlayer
                streamUrl={matchData.streamUrl}
                isLive={matchData.status === "live"}
              />
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4 md:gap-8 lg:col-span-3">
              <UpcomingMatches />
              <RecentResults />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
