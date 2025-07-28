export default function TransfersSection() {
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-gray-900/80 rounded-xl shadow-lg p-4 border border-white/10 w-full backdrop-blur-md backdrop-saturate-150">
        <h4 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
          <span className="text-blue-400">🔄</span> Últimas transferências LoL
        </h4>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-bold text-blue-300">CGN</span>{" "}
            <span className="text-white">Typhoon foi adicionado</span>
          </li>
          <li>
            <span className="font-bold text-blue-300">LOUD</span>{" "}
            <span className="text-white">Ranger foi removido</span>
          </li>
          <li>
            <span className="font-bold text-blue-300">FURIA</span>{" "}
            <span className="text-white">Envy foi adicionado</span>
          </li>
          <li>
            <span className="font-bold text-blue-300">PAIN</span>{" "}
            <span className="text-white">Cariok foi removido</span>
          </li>
          <li>
            <span className="font-bold text-blue-300">FLUXO</span>{" "}
            <span className="text-white">Disamis foi adicionado</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
