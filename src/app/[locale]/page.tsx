import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import NewsSection from "@/components/NewsSection";
import TransfersSection from "@/components/TransfersSection";
import FeaturedGamesSection from "@/components/FeaturedGamesSection";
import LiveMatchesSection from "@/components/LiveMatchesSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const tGames = await getTranslations("Games");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <main className="container mx-auto px-4 py-16">
   
        <div className="flex flex-col items-center w-full mb-16">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
          {/* News + Transfers */}
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <NewsSection />
            </div>
            <div className="w-full lg:w-[320px]">
              <TransfersSection />
            </div>
          </div>
        </div>
        {/* <FeaturedGamesSection tGames={tGames} />
        <LiveMatchesSection /> */}
      </main>
    </div>
  );
}
