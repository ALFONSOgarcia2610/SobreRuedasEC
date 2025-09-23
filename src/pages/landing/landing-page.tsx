
"use client";
import { HeroVideoDialogDemo } from "./componentes/hero-video";
import { AnimatedCircularProgressBarDemo } from "../comunes/CircularBar";
import { NumerosBendecidos } from "./componentes/numeros-bendecidos";
import { PreciosBoletos } from "./componentes/precios-boletos";
import { PostRedes } from "./componentes/post-redes";
import { Footer } from "./componentes/footer";
import { Header } from "./componentes/header";
import GestionImaganes from "./componentes/imagenes-carro"; // ← Agregar esta importación
import { useSorteoCarros } from "../services/landing.query";

export default function LandingPage() {
    const DataSorteo = useSorteoCarros();

    return (
        <div className="min-h-screen w-full bg-[#020617] relative">
            {/* Dark Radial Glow Background */}
            <Header />
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center -mt-10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold !text-white">
                            {DataSorteo.data?.Premio}
                        </h2>
                    </div>
                    <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
                        ¡El volante de tus sueños puede ser tuyo!
                    </p>
                </div>

                <GestionImaganes />
            </section >
            <section className="-mt-25">
                <AnimatedCircularProgressBarDemo />
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
            <div>
                <PostRedes />
            </div>
            <Footer />
        </div >

    );
}
