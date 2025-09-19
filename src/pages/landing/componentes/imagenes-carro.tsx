import { BoxReveal } from "@/components/ui/box-reveal";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useImagenesCarros } from "@/pages/services/landing.query";
import { Loader2 } from "lucide-react";
export default function gestionImaganes() {
    const imgCarro = useImagenesCarros();

    if (imgCarro.isLoading) {
        return (
            <div className="flex justify-center mb-16">
                <div className="rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
                            <p className="text-slate-600">Cargando imágenes...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (imgCarro.error) {
        return (
            <div className="flex justify-center mb-16">
                <div className="rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    <div className="text-center text-red-500">
                        <p>Error al cargar las imágenes</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center mb-16">
            <div className="rounded-2xl shadow-2xl p-8 relative overflow-hidden">
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
                                    {imgCarro.data?.data.map((carro) => (
                                        <CarouselItem key={carro.id}>
                                            <div className="p-2 sm:p-4">
                                                <div >
                                                    <div className="flex aspect-video items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 from-slate-100 to-slate-200">
                                                        <div className="w-full h-full">
                                                            <img
                                                                src={carro.imageUrl}
                                                                alt={carro.name}
                                                                className="w-full h-full object-cover rounded-lg shadow-lg"
                                                                onError={(e) => {
                                                                    // Fallback si la imagen no carga
                                                                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='18' fill='%2364748b' text-anchor='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                                                                }}
                                                            />
                                                            <div className="mt-4 text-center">
                                                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-700">
                                                                    {carro.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </BoxReveal>
            </div>
        </div>
    );
}