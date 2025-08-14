import Image from "next/image";
import { Link } from "@/i18n/navigation";

const upcomingMatches = [
  {
    id: "113487190606782012",
    team1: { name: "LYON", logo: "http://static.lolesports.com/teams/1743717443673_isotypelyon-03.png" },
    team2: { name: "TL", logo: "http://static.lolesports.com/teams/1631820014208_tl-2021-worlds.png" },
    time: "Aug 12:00 AM",
    format: "MD3"
  },
  {
    id: "113487190606782016",
    team1: { name: "DIG", logo: "http://static.lolesports.com/teams/DIG-FullonDark.png" },
    team2: { name: "C9", logo: "http://static.lolesports.com/teams/1736924120254_C9Kia_IconBlue_Transparent_2000x2000.png" },
    time: "Aug 9:00 PM",
    format: "MD3"
  },
  {
    id: "113487190606782020",
    team1: { name: "DSG", logo: "http://static.lolesports.com/teams/1731496922454_Disguised-Wordmark-Yellow-Main.png" },
    team2: { name: "SR", logo: "http://static.lolesports.com/teams/1701424227458_Teams204_Shopify_1632869404072.png" },
    time: "Aug 12:00 AM",
    format: "MD3"
  }
];

export default function UpcomingMatches() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 text-white shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Partidas</h3>
            <p className="text-sm text-gray-400">Próximas partidas do campeonato.</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-4">
          {upcomingMatches.map((match) => (
            <Link
              key={match.id}
              className="flex justify-between items-center gap-4 p-2 rounded-lg border border-slate-700 hover:bg-slate-700/50"
              href={`/live/${match.id}`}
            >
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-2 items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6 bg-slate-700 p-1">
                    <Image
                      className="aspect-square h-full w-full"
                      alt={match.team1.name}
                      src={match.team1.logo}
                      width={24}
                      height={24}
                    />
                  </span>
                  <p className="text-white">{match.team1.name}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6 bg-slate-700 p-1">
                    <Image
                      className="aspect-square h-full w-full"
                      alt={match.team2.name}
                      src={match.team2.logo}
                      width={24}
                      height={24}
                    />
                  </span>
                  <p className="text-white">{match.team2.name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end text-sm">
                <p className="text-white">{match.time}</p>
                <span className="hidden text-gray-400 md:inline">{match.format}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
