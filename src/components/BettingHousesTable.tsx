"use client";
type Props = {
  houses: BettingHouse[];
  translations: Record<string, string>;
  locale: string;
};
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BettingHouse {
  id: string;
  brandName: string;
  website: string;
  rating: { overall: number };
  paymentMethods: {
    pix: boolean;
    creditCard: boolean;
    debitCard: boolean;
    bankTransfer: boolean;
    digitalWallet: boolean;
  };
  license: { number: string; status: string };
  coupon?: string;
}

export default function BettingHousesTable({ houses, translations, locale }: Props) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    return houses.filter((h: BettingHouse) => h.brandName.toLowerCase().includes(search.toLowerCase()));
  }, [houses, search]);

  // Métodos de pagamento disponíveis
  const paymentLabels: { key: keyof BettingHouse['paymentMethods']; label: string }[] = [
    { key: 'pix', label: translations.pix },
    { key: 'creditCard', label: translations.creditCard },
    { key: 'debitCard', label: translations.debitCard },
    { key: 'bankTransfer', label: translations.bankTransfer },
    { key: 'digitalWallet', label: translations.digitalWallet },
  ];

  return (
    <>
      <div className="w-full max-w-4xl mb-8 flex justify-end">
        <input
          type="text"
          placeholder={translations.searchByName || "Pesquisar por nome..."}
          className="w-full md:w-80 px-4 py-2 rounded-lg border border-white/10 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-green-500/40 placeholder:text-gray-400 transition-all"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <Card className="w-full max-w-5xl bg-black/30 border border-white/10 shadow-xl rounded-2xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-800/60">
              <TableHead className="text-white text-lg font-semibold px-6 py-4">{translations.name}</TableHead>
              <TableHead className="text-white text-lg font-semibold px-6 py-4 text-center">Nota</TableHead>
              <TableHead className="text-white text-lg font-semibold px-6 py-4 text-center">{translations.paymentMethods}</TableHead>
              <TableHead className="text-white text-lg font-semibold px-6 py-4 text-center">{translations.licensed}</TableHead>
              <TableHead className="text-white text-lg font-semibold px-6 py-4 text-center">{translations.coupon}</TableHead>
              <TableHead className="text-white text-lg font-semibold px-6 py-4 text-center">{translations.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((house: BettingHouse) => {
              // Pega os métodos de pagamento ativos
              const activePayments = paymentLabels.filter(p => house.paymentMethods[p.key]);
              const mainPayments = activePayments.slice(0, 3);
              const extraPayments = activePayments.slice(3);
              return (
                <TableRow key={house.id} className="hover:bg-slate-800/30 transition-all">
                  <TableCell className="flex items-center space-x-3 px-6 py-4 min-w-[180px]">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {house.brandName.charAt(0)}
                    </div>
                    <span className="text-white font-medium text-base">{house.brandName}</span>
                  </TableCell>
                  {/* Nota */}
                  <TableCell className="px-6 py-4 text-center align-middle">
                    <span className="text-white font-semibold text-lg">{house.rating.overall.toFixed(1)}</span>
                  </TableCell>
                  {/* Métodos de pagamento */}
                  <TableCell className="px-6 py-4 text-center align-middle">
                    <div className="flex flex-wrap gap-1 justify-center items-center">
                      {mainPayments.map((p) => (
                        <span key={p.key} className="px-2 py-1 bg-slate-700/30 border border-slate-600/30 rounded text-slate-300 text-xs">
                          {p.label}
                        </span>
                      ))}
                      {extraPayments.length > 0 && (
                        <span className="px-2 py-1 bg-slate-700/30 border border-slate-600/30 rounded text-slate-300 text-xs cursor-pointer group relative">
                          +{extraPayments.length}
                          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col bg-black/90 text-white text-xs rounded p-2 shadow-lg z-10 min-w-max whitespace-nowrap">
                            {extraPayments.map((p) => (
                              <span key={p.key} className="block px-1 py-0.5">
                                {p.label}
                              </span>
                            ))}
                          </span>
                        </span>
                      )}
                    </div>
                  </TableCell>
                  {/* Licenciada */}
                  <TableCell className="px-6 py-4 text-center align-middle">
                    {house.license && house.license.number ? (
                      <span className="inline-flex items-center px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        {translations.licensed}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        {translations.notLicensed}
                      </span>
                    )}
                  </TableCell>
                  {/* Cupom */}
                  <TableCell className="px-6 py-4 text-center align-middle">
                    {house.coupon ? (
                      <span className="inline-flex items-center px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-amber-300 text-xs">
                        {translations.hasCoupon}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 bg-slate-700/20 border border-slate-700/30 rounded text-slate-300 text-xs">
                        {translations.noCoupon}
                      </span>
                    )}
                  </TableCell>
                  {/* Botão */}
                  <TableCell className="px-6 py-4 text-center align-middle">
                    <div className="flex justify-center">
                      <a
                        href={house.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all text-center shadow min-w-[120px]"
                      >
                        {translations.visitSite} →
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
