interface StreamPlayerProps {
  streamUrl: string;
  isLive: boolean;
}

export default function StreamPlayer({ streamUrl, isLive }: StreamPlayerProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 text-white shadow-sm col-span-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Assista</h3>
        <p className="text-sm text-gray-400">
          {isLive ? "Acompanhe a partida ao vivo" : "Veja os VODs"}
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="border border-slate-700 bg-slate-800 shadow-sm relative w-full overflow-hidden rounded-lg aspect-video">
          <iframe
            src={streamUrl}
            frameBorder="0"
            allowFullScreen
            scrolling="no"
            width="100%"
            height="100%"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
