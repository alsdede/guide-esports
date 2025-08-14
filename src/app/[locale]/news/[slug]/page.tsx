import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Link } from "@/i18n/navigation";

// Tipos para receber dados do Sanity
interface NewsPostProps {
  post: {
    title: string;
    mainImage: string;
    publishedAt: string;
    gameTag: string;
    content: any; // Portable Text
  };
  moreNews: Array<{
    slug: string;
    title: string;
    mainImage: string;
    publishedAt: string;
    gameTag: string;
  }>;
}

// Dummy mock para preview local
const dummyPost = {
  title: "T1 conquista o título mundial de 2025!",
  mainImage: "https://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png",
  publishedAt: "2025-08-01T12:00:00Z",
  gameTag: "League of Legends",
  content: [
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "A equipe sul-coreana T1 fez história ao conquistar o título mundial de 2025, vencendo a grande final por 3x1. " },
        { _type: "span", text: "Faker se consagra como maior jogador de todos os tempos." }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "Destaques da partida" }]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "A série foi marcada por jogadas incríveis e domínio tático da T1. " },
        { _type: "span", text: "O midlaner Faker foi eleito MVP da final." }
      ]
    }
  ]
};

const dummyMoreNews = [
  {
    slug: "faker-mvp-final-2025",
    title: "Faker é eleito MVP da final mundial",
    mainImage: "https://static.lolesports.com/players/1673260049703_Faker.png",
    publishedAt: "2025-07-31T18:00:00Z",
    gameTag: "League of Legends"
  },
  {
    slug: "geng-campeao-lck",
    title: "Gen.G conquista a LCK 2025",
    mainImage: "https://static.lolesports.com/teams/1655210113163_GenG_logo_200407-05.png",
    publishedAt: "2025-07-20T15:00:00Z",
    gameTag: "League of Legends"
  },
  {
    slug: "paiN-gaming-titulo-cblol",
    title: "paiN Gaming vence o CBLOL 2025",
    mainImage: "https://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png",
    publishedAt: "2025-07-10T12:00:00Z",
    gameTag: "League of Legends"
  }
];

export default function NewsPostPage({ post = dummyPost, moreNews = dummyMoreNews }: NewsPostProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Espaço lateral para anúncios (desktop) */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="h-full flex flex-col items-center justify-start pt-8">
            {/* Ad Placeholder */}
            <div className="w-48 h-96 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 text-sm border border-slate-700">Anúncio</div>
          </div>
        </aside>
        {/* Conteúdo principal */}
        <article className="flex-1 max-w-3xl mx-auto w-full bg-black/30 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <header className="relative w-full h-64 md:h-96">
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="inline-block bg-slate-800/80 text-xs text-white px-3 py-1 rounded-full font-semibold mb-2">
                {post.gameTag}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {post.title}
              </h1>
              <time className="text-gray-300 text-sm">
                {new Date(post.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
              </time>
            </div>
          </header>
          {/* Conteúdo Rich Text */}
          <section className="prose prose-invert max-w-none px-6 py-8 text-white">
            <PortableText value={post.content} />
          </section>
        </article>
        {/* Espaço lateral para anúncios (desktop) */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="h-full flex flex-col items-center justify-start pt-8">
            {/* Ad Placeholder */}
            <div className="w-48 h-96 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 text-sm border border-slate-700">Anúncio</div>
          </div>
        </aside>
      </main>
      {/* Mais notícias */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Mais notícias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {moreNews.map((news) => (
            <Link key={news.slug} href={`/news/${news.slug}`} className="group block bg-slate-800 rounded-xl overflow-hidden shadow hover:scale-[1.03] transition">
              <div className="relative w-full h-40">
                <Image src={news.mainImage} alt={news.title} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-black/70 text-xs text-white px-2 py-1 rounded-full font-semibold">
                  {news.gameTag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition mb-1 line-clamp-2">{news.title}</h3>
                <time className="text-gray-400 text-xs">
                  {new Date(news.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
