import Image from "next/image";
export default function NewsSection() {
  return (
    <div className="w-full flex justify-center">
      {/* Mobile/tablet: lista vertical; lg+: grid com posts e transferências lado a lado */}
      <div className="flex flex-col gap-4 w-full max-w-2xl lg:hidden">
        {/* Posts de notícias - todos do mesmo tamanho */}
        <a
          href="/lta-sul-2025-eu-quero-mostrar-que-mereco-diz-lev-hauz/"
          className="relative rounded-xl overflow-hidden shadow-lg h-60 group bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-gray-900/80 border border-white/10 backdrop-blur-md backdrop-saturate-150"
        >
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Imagem genérica esportes"
            fill
            className="absolute w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-purple-700 text-xs font-bold px-3 py-1 rounded-full text-white">
              LEAGUE OF LEGENDS
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <span className="text-white text-xl font-semibold drop-shadow-lg">
              LTA Sul 2025: “Eu quero mostrar que mereço”, diz LEV Hauz
            </span>
          </div>
        </a>
        <a
          href="/copa-do-mundo-r6-2025-w7m-e-nip-garantem-vaga-na-competicao/"
          className="relative rounded-xl overflow-hidden shadow-lg h-60 group bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-gray-900/80 border border-white/10 backdrop-blur-md backdrop-saturate-150"
        >
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Copa do Mundo R6 2025: w7m e NiP garantem vaga na competição"
            fill
            className="absolute w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-yellow-600 text-xs font-bold px-3 py-1 rounded-full text-white">
              RAINBOW SIX
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <span className="text-white text-base font-semibold drop-shadow-lg">
              Copa do Mundo R6 2025: w7m e NiP garantem vaga na competição
            </span>
          </div>
        </a>
        <a
          href="/lta-sul-2025-sei-que-foi-ruim-mas-estamos-atras-da-melhoria-diz-pain-titan-em-recado-para-a-torcida/"
          className="relative rounded-xl overflow-hidden shadow-lg h-60 group bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-gray-900/80 border border-white/10 backdrop-blur-md backdrop-saturate-150"
        >
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="LTA Sul 2025: “Sei que foi ruim, mas estamos atrás da melhoria”, diz paiN TitaN em recado para a torcida"
            fill
            className="absolute w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-purple-700 text-xs font-bold px-3 py-1 rounded-full text-white">
              LEAGUE OF LEGENDS
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <span className="text-white text-base font-semibold drop-shadow-lg">
              LTA Sul 2025: “Sei que foi ruim, mas estamos atrás da melhoria”,
              diz paiN TitaN em recado para a torcida
            </span>
          </div>
        </a>
      </div>
      {/* Desktop/laptop: grid com posts e transferências lado a lado */}
      <div className="hidden lg:grid grid-cols-2 gap-4 w-full max-w-7xl min-h-[400px]">
        {/* Coluna 1: Card principal */}
        <a
          href="/lta-sul-2025-eu-quero-mostrar-que-mereco-diz-lev-hauz/"
          className="relative rounded-xl overflow-hidden shadow-lg h-[400px] group bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-gray-900/80 border border-white/10 backdrop-blur-md backdrop-saturate-150"
        >
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Imagem genérica esportes"
            fill
            className="absolute w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-purple-700 text-xs font-bold px-3 py-1 rounded-full text-white">
              LEAGUE OF LEGENDS
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <span className="text-white text-xl font-semibold drop-shadow-lg">
              LTA Sul 2025: “Eu quero mostrar que mereço”, diz LEV Hauz
            </span>
          </div>
        </a>
        {/* Coluna 2: Dois cards menores empilhados */}
        <div className="flex flex-col gap-4 h-[400px]">
          <a
            href="/copa-do-mundo-r6-2025-w7m-e-nip-garantem-vaga-na-competicao/"
            className="relative rounded-xl overflow-hidden shadow-lg h-[190px] group bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-gray-900/80 border border-white/10 backdrop-blur-md backdrop-saturate-150"
          >
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Copa do Mundo R6 2025: w7m e NiP garantem vaga na competição"
              fill
              className="absolute w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-yellow-600 text-xs font-bold px-3 py-1 rounded-full text-white">
                RAINBOW SIX
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <span className="text-white text-base font-semibold drop-shadow-lg">
                Copa do Mundo R6 2025: w7m e NiP garantem vaga na competição
              </span>
            </div>
          </a>
          <a
            href="/lta-sul-2025-sei-que-foi-ruim-mas-estamos-atras-da-melhoria-diz-pain-titan-em-recado-para-a-torcida/"
            className="relative rounded-xl overflow-hidden shadow-lg h-[190px] group bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-gray-900/80 border border-white/10 backdrop-blur-md backdrop-saturate-150"
          >
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="LTA Sul 2025: “Sei que foi ruim, mas estamos atrás da melhoria”, diz paiN TitaN em recado para a torcida"
              fill
              className="absolute w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-purple-700 text-xs font-bold px-3 py-1 rounded-full text-white">
                LEAGUE OF LEGENDS
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <span className="text-white text-base font-semibold drop-shadow-lg">
                LTA Sul 2025: “Sei que foi ruim, mas estamos atrás da melhoria”,
                diz paiN TitaN em recado para a torcida
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
