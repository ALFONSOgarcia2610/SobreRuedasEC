
"use client";
import { BoxReveal } from "@/components/ui/box-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { SparklesText } from "@/components/ui/sparkles-text";
import { HeroVideoDialogDemo } from "./componentes/hero-video";
import { AnimatedCircularProgressBarDemo } from "../comunes/CircularBar";
import { NumerosBendecidos } from "./componentes/numeros-bendecidos";
import { PreciosBoletos } from "./componentes/precios-boletos";
import { PostRedes } from "./componentes/post-redes";
import { Footer } from "./componentes/footer";
import { Header } from "./componentes/header";
export default function LandingPage() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-16">

                <div className="text-center mb-16">
                    <div className="text-xl font-semibold text-gray-700 -mt-10">
                        Sorteo #001
                    </div>
                    <div className="mb-8">
                        <SparklesText>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
                                Chevrolet Cavalier
                            </h2>
                        </SparklesText>
                    </div>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        ¡El volante de tus sueños puede ser tuyo!
                    </p>
                </div>

                {/* Vehicle Showcase */}
                <div className="flex justify-center mb-16">
                    <div className=" rounded-2xl shadow-2xl p-8  relative overflow-hidden">
                        <div className="absolute top-4 right-4 bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                            SORTEO OFICIAL
                        </div>
                        <BoxReveal boxColor={"#334155"} duration={0.5}>
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-slate-800 mb-3">
                                    Chevrolet Cavalier
                                </h3>
                                {/* Carousel de fotos del carro */}
                                <div className="my-6 sm:my-8">
                                    <Carousel autoplay={true} autoplayDelay={5000} className="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
                                        <CarouselContent>
                                            <CarouselItem>
                                                <div className="p-2 sm:p-4">
                                                    <Card className="border border-slate-200">
                                                        <CardContent className="flex aspect-video items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-slate-100 to-slate-200">
                                                            <div className="text-center">
                                                                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-2 sm:mb-3 md:mb-4 block">🚗</span>
                                                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-700">Vista Frontal</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem>
                                                <div className="p-2 sm:p-4">
                                                    <Card className="border border-slate-200">
                                                        <CardContent className="flex aspect-video items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-blue-100 to-blue-200">
                                                            <div className="text-center">
                                                                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-2 sm:mb-3 md:mb-4 block">🚙</span>
                                                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-700">Vista Lateral</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem>
                                                <div className="p-2 sm:p-4">
                                                    <Card className="border border-slate-200">
                                                        <CardContent className="flex aspect-video items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-gray-100 to-gray-200">
                                                            <div className="text-center">
                                                                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-2 sm:mb-3 md:mb-4 block">🏎️</span>
                                                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-700">Vista Trasera</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem>
                                                <div className="p-2 sm:p-4">
                                                    <Card className="border border-slate-200">
                                                        <CardContent className="flex aspect-video items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-slate-100 to-blue-100">
                                                            <div className="text-center">
                                                                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-2 sm:mb-3 md:mb-4 block">🪑</span>
                                                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-700">Interior</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem>
                                                <div className="p-2 sm:p-4">
                                                    <Card className="border border-slate-200">
                                                        <CardContent className="flex aspect-video items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-green-100 to-green-200">
                                                            <div className="text-center">
                                                                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-2 sm:mb-3 md:mb-4 block">⚙️</span>
                                                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-700">Motor</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                            </div>
                        </BoxReveal>
                    </div>
                </div>
            </section >
            <section>
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
