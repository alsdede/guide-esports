import Image from "next/image";
type Props = {
  tGames: (key: string) => string;
};
export default function FeaturedGamesSection({ tGames }: Props) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Jogos em Destaque
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* League of Legends */}
        <div className="flex flex-col items-center">
          <Image
            src="/imgs/logos/LOL.webp"
            alt="League of Legends"
            width={108}
            height={108}
            className="object-contain w-20 h-20 mb-2"
          />
          <span className="text-lg font-semibold text-white">
            {tGames("lol")}
          </span>
        </div>
        {/* CS2 */}
        <div className="flex flex-col items-center">
          <Image
            src="/imgs/logos/CSGO.png"
            alt="CS2"
            width={108}
            height={108}
            className="object-contain w-20 h-20 mb-2"
          />
          <span className="text-lg font-semibold text-white">
            {tGames("csgo")}
          </span>
        </div>
        {/* Valorant (usando logo do DOTA2 como exemplo, ajuste se tiver logo do Valorant) */}
        <div className="flex flex-col items-center">
          <Image
            src="/imgs/logos/DOTA2.png"
            alt="Valorant"
            width={108}
            height={108}
            className="object-contain w-20 h-20 mb-2"
          />
          <span className="text-lg font-semibold text-white">
            {tGames("valorant")}
          </span>
        </div>
      </div>
    </section>
  );
}
