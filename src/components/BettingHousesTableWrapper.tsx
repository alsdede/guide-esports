"use client";
import BettingHousesTable from "@/components/BettingHousesTable";

export default function BettingHousesTableWrapper({ houses, translations, locale }: { houses: any[]; translations: Record<string, string>; locale: string }) {
  return (
    <BettingHousesTable houses={houses} translations={translations} locale={locale} />
  );
//
}
