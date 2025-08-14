interface Game {
  id: number;
  status: string;
  winner?: string;
}

interface GameTabsProps {
  games: Game[];
  activeGame: number;
  onGameChange: (gameId: number) => void;
}

export default function GameTabs({ games, activeGame, onGameChange }: GameTabsProps) {
  return (
    <div className="col-span-3">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-slate-800 p-1 text-gray-400">
        {games.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => onGameChange(game.id)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
              activeGame === game.id
                ? "bg-slate-700 text-white shadow-sm"
                : "hover:bg-slate-700 hover:text-white"
            }`}
          >
            Jogo {game.id}
          </button>
        ))}
      </div>
    </div>
  );
}
