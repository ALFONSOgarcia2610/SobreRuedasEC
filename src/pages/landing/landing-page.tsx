"use client";
import { HeroVideoDialogDemo } from "./componentes/hero-video";
import { AnimatedCircularProgressBarDemo } from "../comunes/CircularBar";
import { NumerosBendecidos } from "./componentes/numeros-bendecidos";
import { PreciosBoletos } from "./componentes/precios-boletos";
import { Footer } from "./componentes/footer";
import GestionImaganes from "./componentes/imagenes-carro";
import { useGetCurrentLottery, useGetProductsByLotteryId, useGetProgresoSorteo } from "@/Services/admin/product.query";

export default function LandingPage() {
 
    const { data: currentLottery } = useGetCurrentLottery();
    const lotteryId = currentLottery?.lotteryId ?? "";
    const { data: products } = useGetProductsByLotteryId(lotteryId);
    const progresoSorteo = useGetProgresoSorteo(lotteryId);
    const porcentaje = progresoSorteo.data;
    
    // Filtrar solo productos principales (isCash === false)
    const productosPrincipales = products?.filter(p => p.isCash === false) ?? [];
    
    const productosTexto = productosPrincipales.length > 0
        ? productosPrincipales.map(p => p.name).join(' & ')
        : 'Premios increíbles';

    return (
        <div className="min-h-screen w-full bg-slate-900 relative">
            {/* Dark Radial Glow Background */}
            
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 pt-32">
                <div className="text-center -mt-10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold !text-white">
                            {productosTexto}
                        </h2>
                    </div>
                    <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
                        ¡Cumpliendo Tus Sueños!
                    </p>
                </div>
                <GestionImaganes />
            </section >
            <section className="-mt-25">
                <AnimatedCircularProgressBarDemo progress={typeof porcentaje === "number" ? porcentaje : 0} />
            </section>
            <section>
                <NumerosBendecidos />
            </section>
            <div className="flex justify-center mb-16">
                <HeroVideoDialogDemo />
            </div>
            <div>
                <PreciosBoletos />
            </div>
           {/*  <div>
                <PostRedes />
            </div> */}
            <Footer />
        </div >

    );
}
