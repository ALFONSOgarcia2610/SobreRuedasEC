import { ShimmeringText } from "@/components/animate-ui/primitives/texts/shimmering";
import { useGetCurrentLottery } from "@/Services/admin/product.query";

export default function GestionImaganes() {
  const { data: currentLottery } = useGetCurrentLottery();

  // Concatenar numeor sorteo
  const numeroSorteo = currentLottery
    ? `Sorteo #${currentLottery.number}`
    : "Sorteo";

  return (
    <div className="flex items-center justify-center p-4 mt-25">
      <div className="max-w-4xl w-full">
        {/* Logo y Título Principal */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <img
            src="/img/logoSR.png"
            alt="Logo SobreRuedas"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-xl object-cover"
          />
          <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              SobreRuedas
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">{numeroSorteo}</p>
          </div>
        </div>

        {/* Texto Principal con Animación */}
        <div className="flex justify-center mt-12">
          <ShimmeringText
            className="text-4xl md:text-5xl font-bold text-white"
            text="Entregando Sueños"
          />
        </div>
      </div>
    </div>
  );
}
