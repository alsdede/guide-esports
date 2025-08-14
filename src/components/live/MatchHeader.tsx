import Image from "next/image";

interface Team {
  name: string;
  shortName: string;
  logo: string;
  wins: number;
  losses: number;
}

interface MatchHeaderProps {
  match: {
    team1: Team;
    team2: Team;
    score: {
      team1: number;
      team2: number;
    };
    status: string;
  };
}

export default function MatchHeader({ match }: MatchHeaderProps) {

  

  return (
    <div className="bg-slate-800 text-white shadow-sm p-4 grid grid-cols-5 col-span-3 w-full border border-slate-700 rounded-md items-center">
      {/* Team 1 */}
      <div className="flex items-center space-x-4 col-span-2">
        <span className="relative flex shrink-0 overflow-hidden h-14 w-14 bg-slate-700 p-2 rounded-md">
          <Image 
            className="aspect-square h-full w-full" 
            src={match.team1.logo}
            alt={match.team1.name}
            width={56}
            height={56}
          />
        </span>
        <div className="flex flex-col">
          <h2 className="font-semibold text-white">{match.team1.name}</h2>
          <p className="text-xs text-gray-400">({match.team1.wins} - {match.team1.losses})</p>
        </div>
      </div>

      {/* Score */}
      <div className="flex flex-col items-center gap-1 col-span-1">
        <div className="flex items-center justify-center gap-1">
          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-slate-700 border border-slate-600 h-10 w-10 px-3 text-white">
            {match.score.team1}
          </div>
          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-slate-700 border border-slate-600 h-10 w-10 px-3 text-white">
            {match.score.team2}
          </div>
        </div>
      </div>

      {/* Team 2 */}
      <div className="flex items-center space-x-4 col-span-2 justify-end">
        <div className="flex flex-col items-end">
          <h2 className="font-semibold text-white">{match.team2.name}</h2>
          <p className="text-xs text-gray-400">({match.team2.wins} - {match.team2.losses})</p>
        </div>
        <span className="relative flex shrink-0 overflow-hidden h-14 w-14 bg-slate-700 p-2 rounded-md">
          <Image 
            className="aspect-square h-full w-full" 
            src={match.team2.logo}
            alt={match.team2.name}
            width={56}
            height={56}
          />
        </span>
      </div>
    </div>
  );
}
