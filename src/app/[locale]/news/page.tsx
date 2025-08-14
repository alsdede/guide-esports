"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

// Dummy para preview local
const dummyNews = [
  {
    slug: "t1-campeao-mundial-2025",
    title: "T1 conquista o título mundial de 2025!",
    mainImage: "https://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png",
    publishedAt: "2025-08-01T12:00:00Z",
    gameTag: "League of Legends"
  },
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
  },
  {
    slug: "valorant-masters-final",
    title: "LOUD chega à final do Valorant Masters",
    mainImage: "https://static.lolesports.com/teams/valorant-loud.png",
    publishedAt: "2025-07-05T10:00:00Z",
    gameTag: "Valorant"
  }
];

const allTags = Array.from(new Set(dummyNews.map((n) => n.gameTag)));

export default function NewsListPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filteredNews = selectedTag ? dummyNews.filter((n) => n.gameTag === selectedTag) : dummyNews;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Notícias</h1>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <button
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${!selectedTag ? "bg-green-500 text-white border-green-500" : "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"}`}
              onClick={() => setSelectedTag(null)}
            >
              Todas
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${selectedTag === tag ? "bg-green-500 text-white border-green-500" : "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNews.map((news) => (
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
      </main>
    </div>
  );
}
