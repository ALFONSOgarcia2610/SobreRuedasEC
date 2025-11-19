import { ShimmeringText } from "@/components/animate-ui/primitives/texts/shimmering";
import { useGetCurrentLottery } from "@/Services/admin/product.query";

export default function gestionImaganes() {
    
  const { data: currentLottery } = useGetCurrentLottery();

    // Concatenar numeor sorteo
    const numeroSorteo = currentLottery ? `Sorteo #${currentLottery.number}` : 'Sorteo';

    return (
        <div className="flex justify-center">
            <div className="rounded-2xl shadow-2xl p-8 md:relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 p-6">
                    <img src="/img/logoSR.png" alt="Logo" className="w-40 h-40 md:w-80 md:h-80 rounded-full shadow-lg mx-auto md:mx-0" />
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">SobreRuedas</h2>
                        <p className="text-sm md:text-base lg:text-lg text-slate-300 mt-1">{numeroSorteo}</p>
                    </div>
                </div>
                <div className="flex justify-center">
                  <ShimmeringText className="text-3xl md:text-4xl font-extrabold text-white" text="Entregando Sueños" />
    
                </div>
            </div>
        </div>
    );
}