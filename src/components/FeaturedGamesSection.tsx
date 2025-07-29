import Image from "next/image";

type Game = {
  _id: string;
  name: string;
  logo: string; // url da imagem
  alt?: string;
};

type Props = {
  games?: Game[];
  title?: string;
};

export default function FeaturedGamesSection(props: Props) {
  const { games, title } = props;
  if (!games || games.length === 0) return null;
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {title || "Jogos em Destaque"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game._id} className="flex flex-col items-center">
            <Image
              src={game.logo}
              alt={game.alt || game.name}
              width={108}
              height={108}
              className="object-contain w-20 h-20 mb-2"
            />
            <span className="text-lg font-semibold text-white">
              {game.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
