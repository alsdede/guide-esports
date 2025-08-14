export default function RecentResults() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 text-white shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Resultados</h3>
            <p className="text-sm text-gray-400">Últimos resultados do campeonato.</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-4">
          <div className="text-center py-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-400">Nenhuma partida encontrada.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
