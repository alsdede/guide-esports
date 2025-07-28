export default function LiveMatchesSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Partidas Ao Vivo
      </h2>
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-white/10">
        <div className="text-center text-gray-400">
          <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p>Nenhuma partida ao vivo no momento</p>
          <p className="text-sm mt-2">
            Volte em breve para ver as partidas ao vivo!
          </p>
        </div>
      </div>
    </section>
  );
}
