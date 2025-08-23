import Image from "next/image";

interface Player {
  champion: string;
  playerName: string;
  level: number;
  health: { current: number; max: number };
  items: (string | null)[];
  cs: number;
  kills: number;
  deaths: number;
  assists: number;
  gold: number;
  goldDiff: number;
  isAlive: boolean;
}

interface Game {
  duration: string;
  status: string;
  kills?: { team1: number; team2: number };
  gold?: { team1: number; team2: number };
  objectives?: {
    team1: { inhibitors: number; barons: number; towers: number; dragons: string[] };
    team2: { inhibitors: number; barons: number; towers: number; dragons: string[] };
  };
  players?: {
    team1: Player[];
    team2: Player[];
  };
}

interface Team {
  name: string;
  shortName: string;
  logo: string;
}

interface GameDetailsProps {
  game: Game;
  teams: [Team, Team];
}

function PlayerRow({ player }: { player: Player }) {
  const healthPercentage = (player.health.current / player.health.max) * 100;
  
  return (
    <tr className="border-b border-slate-700 hover:bg-slate-700/50">
      <td className="p-1">
        <div className="flex gap-4">
          <div className="relative inline-block">
            <span className="relative flex shrink-0 overflow-hidden w-9 h-9 rounded-sm">
              <Image
                className={`aspect-square h-full w-full ${!player.isAlive ? "grayscale" : ""}`}
                src={`https://ddragon.leagueoflegends.com/cdn/15.15.1/img/champion/${player.champion}.png`}
                alt={player.champion}
                width={36}
                height={36}
              />
            </span>
            <div className="absolute bottom-1 right-1 bg-transparent text-white w-2 h-2 flex items-center justify-center text-xs font-bold">
              {player.level}
            </div>
          </div>
          <div>
            <p className="font-bold text-white">{player.champion}</p>
            <p className="text-gray-400">{player.playerName}</p>
          </div>
        </div>
      </td>
      <td className="p-1">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-white">{player.health.current}/{player.health.max}</span>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-600">
            <div 
              className="h-full w-full flex-1 transition-all bg-green-500" 
              style={{ transform: `translateX(-${100 - healthPercentage}%)` }}
            />
          </div>
        </div>
      </td>
      <td className="p-1 font-semibold">
        <div className="flex items-center justify-center space-x-1">
          {player.items.map((item, index) => (
            <div key={index} className="w-8 h-8">
              {item ? (
                <Image
                  alt={item}
                  loading="lazy"
                  width={32}
                  height={32}
                  className={!player.isAlive ? "grayscale" : ""}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.15.1/img/item/${item}.png`}
                />
              ) : (
                <div className="w-8 h-8 bg-slate-600 rounded"></div>
              )}
            </div>
          ))}
        </div>
      </td>
      <td className="p-1 font-semibold text-center text-white">
        <p>{player.cs}</p>
        <span className="text-gray-400">{(player.cs / 30).toFixed(2)}</span>
      </td>
      <td className="p-1 font-semibold text-center text-white">{player.kills}</td>
      <td className="p-1 font-semibold text-center text-white">{player.deaths}</td>
      <td className="p-1 font-semibold text-center text-white">{player.assists}</td>
      <td className="p-1 font-semibold">
        <div className="inline-flex items-center rounded-full border border-slate-600 px-2.5 py-0.5 text-xs font-semibold text-white w-full justify-center">
          {player.gold.toLocaleString()}
        </div>
      </td>
      <td className="p-1 font-semibold">
        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-full justify-center ${
          player.goldDiff >= 0 
            ? "border-transparent bg-green-500 text-black" 
            : "border-transparent bg-red-500 text-white"
        }`}>
          {player.goldDiff >= 0 ? "+" : ""}{player.goldDiff.toLocaleString()}
        </div>
      </td>
    </tr>
  );
}

export default function GameDetails({ game, teams }: GameDetailsProps) {
  console.log("GAME AAAA",game)
  const totalGold = 0
  const goldPercentage = totalGold > 0 ? ((game.gold?.team1 || 0) / totalGold) * 100 : 50;
  
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 text-white shadow-sm overflow-hidden mt-4">
      {/* Game Header */}
      <div className="flex flex-row items-center justify-between bg-slate-700/50 space-y-0 p-2">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" x2="14" y1="2" y2="2"></line>
            <line x1="12" x2="15" y1="14" y2="11"></line>
            <circle cx="12" cy="14" r="8"></circle>
          </svg>
          {/* <time className="text-xs text-gray-300">{game.duration}</time> */}
        </div>
        
        <div className="flex gap-2">
          <span className="relative flex shrink-0 overflow-hidden h-10 w-10 bg-slate-600 p-2 rounded-md">
            <Image className="aspect-square h-full w-full" src={teams[0].logo} alt={teams[0].name} width={40} height={40} />
          </span>
          <div className="flex items-center justify-center gap-1">
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-slate-600 border border-slate-500 h-10 w-10 px-3 text-white">
              {game.kills?.team1 || 0}
            </div>
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-slate-600 border border-slate-500 h-10 w-10 px-3 text-white">
              {game.kills?.team2 || 0}
            </div>
          </div>
          <span className="relative flex shrink-0 overflow-hidden h-10 w-10 bg-slate-600 p-2 rounded-md">
            <Image className="aspect-square h-full w-full" src={teams[1].logo} alt={teams[1].name} width={40} height={40} />
          </span>
        </div>
        
        <div>
          <div className="inline-flex items-center border border-slate-600 py-0.5 text-xs font-semibold text-white px-2 rounded-md">
            <div className="flex items-center gap-1.5">
              <span>{game.status === "finished" ? "Finalizada" : "Em Andamento"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives and Gold */}
      <div className="p-0 py-2 text-sm">
        <div className="grid gap-2">
          <div className="flex justify-between px-4 gap-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-3 text-sm font-semibold flex-row">
                {(game.objectives?.team1?.dragons || []).map((dragon, index) => (
                  <p key={index}>
                    <Image alt={dragon} loading="lazy" width="19" height="19" src={`/images/dragon-${dragon}.svg`} />
                  </p>
                ))}
              </div>
              <div className="flex gap-3 text-sm font-semibold flex-row">
                <div className="flex gap-1 items-center flex-row text-white">
                  {game.objectives?.team1?.inhibitors || 0}
                  <Image alt="Inhibitors" loading="lazy" width="19" height="19" src="/objectives/inhibitor@blue.png" />
                </div>
                <div className="flex gap-1 items-center flex-row text-white">
                  {game.objectives?.team1?.barons || 0}
                  <Image alt="Barons" loading="lazy" width="19" height="19" src="/objectives/baron@blue.png" />
                </div>
                <div className="flex gap-1 items-center flex-row text-white">
                  {game.objectives?.team1?.towers || 0}
                  <Image alt="Towers" loading="lazy" width="19" height="19" src="/objectives/turret@blue.png" />
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-3 text-sm font-semibold flex-row-reverse">
                <div className="flex gap-1 items-center flex-row-reverse text-white">
                  {game.objectives?.team2?.inhibitors || 0}
                  <Image alt="Inhibitors" loading="lazy" width="19" height="19" src="/objectives/inhibitor@red.png" />
                </div>
                <div className="flex gap-1 items-center flex-row-reverse text-white">
                  {game.objectives?.team2?.barons || 0}
                  <Image alt="Barons" loading="lazy" width="19" height="19" src="/objectives/baron@red.png" />
                </div>
                <div className="flex gap-1 items-center flex-row-reverse text-white">
                  {game.objectives?.team2?.towers || 0}
                  <Image alt="Towers" loading="lazy" width="19" height="19" src="/objectives/turret@red.png" />
                </div>
              </div>
              <div className="flex gap-3 text-sm font-semibold flex-row-reverse">
                {(game.objectives?.team2?.dragons || []).map((dragon, index) => (
                  <p key={index}>
                    <Image alt={dragon} loading="lazy" width="19" height="19" src={`/images/dragon-${dragon}.svg`} />
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          <div className="shrink-0 bg-slate-600 h-[1px] w-full"></div>
          
          <div className="flex items-center gap-4 px-2">
            <div className="flex gap-2">
              <span className="text-gray-300">Ouro</span>
              <span className="font-semibold text-white">{(game.gold?.team1 || 0).toLocaleString()}</span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-red-800">
              <div 
                className="h-full w-full flex-1 transition-all bg-blue-900" 
                style={{ transform: `translateX(-${100 - goldPercentage}%)` }}
              />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-white">{(game.gold?.team2 || 0).toLocaleString()}</span>
              <span className="text-gray-300">Ouro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team 1 Players */}
      <div className="space-y-1.5 flex flex-row items-center border-t border-slate-600 bg-slate-700/50 p-2">
        <div className="flex justify-between items-center text-xs w-full">
          <div className="flex gap-2 items-center">
            <span className="relative flex shrink-0 overflow-hidden h-8 w-8 bg-slate-600 p-1 rounded-md">
              <Image className="aspect-square h-full w-full" src={teams[0].logo} alt={teams[0].name} width={32} height={32} />
            </span>
            <div>
              <p className="font-bold text-white">{teams[0].name}</p>
              <div className="text-gray-300">Lado Azul</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-0 text-sm">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b [&_tr]:border-slate-600">
              <tr className="border-b border-slate-600 hover:bg-slate-700/50">
                <th className="h-12 text-left align-middle font-medium text-gray-300 p-1 pl-2 w-[200px]">Jogador</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[100px] text-center">Vida</th>
                <th className="h-12 text-left align-middle font-medium text-gray-300 p-1 w-[280px]">Items</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">CS</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">K</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">D</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">A</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[100px] text-center">Ouro</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 pr-2 w-[100px] text-center">+/-</th>
              </tr>
            </thead>
            <tbody>
              {(game.players?.team1 || []).map((player, index) => (
                <PlayerRow key={index} player={player} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team 2 Players */}
      <div className="space-y-1.5 flex flex-row items-center border-t border-slate-600 bg-slate-700/50 p-2">
        <div className="flex justify-between text-xs w-full">
          <div className="flex gap-2 items-center">
            <span className="relative flex shrink-0 overflow-hidden h-8 w-8 bg-slate-600 p-1 rounded-md">
              <Image className="aspect-square h-full w-full" src={teams[1].logo} alt={teams[1].name} width={32} height={32} />
            </span>
            <div>
              <p className="font-bold text-white">{teams[1].name}</p>
              <div className="text-gray-300">Lado Vermelho</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-0 text-sm">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b [&_tr]:border-slate-600">
              <tr className="border-b border-slate-600 hover:bg-slate-700/50">
                <th className="h-12 text-left align-middle font-medium text-gray-300 p-1 pl-2 w-[200px]">Jogador</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[100px] text-center">Vida</th>
                <th className="h-12 text-left align-middle font-medium text-gray-300 p-1 w-[280px]">Items</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">CS</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">K</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">D</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[30px] text-center">A</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 w-[100px] text-center">Ouro</th>
                <th className="h-12 align-middle font-medium text-gray-300 p-1 pr-2 w-[100px] text-center">+/-</th>
              </tr>
            </thead>
            <tbody>
              {(game.players?.team2 || []).map((player, index) => (
                <PlayerRow key={index} player={player} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-row items-center border-t border-slate-600 bg-slate-700/50 p-2">
        <div className="text-xs text-gray-300">Patch: 15.15.1</div>
      </div>
    </div>
  );
}
