import { Card } from "@/components/ui/card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Link } from "@tanstack/react-router";
import {
    Hash,
    TrendingUp,
    Star,
    Shield,
    CheckCircle,
    Target,
    Lightbulb,
    ArrowRight,
    Crown
} from "lucide-react";
import { useSorteoCarros } from "@/pages/services/landing.query";

export function PreciosBoletos() {
    const DataSorteo = useSorteoCarros();

    // Precio base por boleto desde el sorteo activo
    const precioBase = DataSorteo.data?.precioporboleto || 1.00;

    const paquetes = [
        {
            numeros: 6,
            precio: precioBase * 6,
            popular: false,
            descripcion: "Participación básica"
        },
        {
            numeros: 8,
            precio: precioBase * 8,
            popular: false,
            descripcion: "Oportunidad estándar"
        },
        {
            numeros: 10,
            precio: precioBase * 10,
            popular: true,
            badge: "RECOMENDADO",
            descripcion: "Mejor relación precio-valor"
        },
        {
            numeros: 20,
            precio: precioBase * 20,
            popular: false,
            descripcion: "Participación avanzada"
        },
        {
            numeros: 50,
            precio: precioBase * 50,
            popular: false,
            descripcion: "Oportunidad premium"
        },
        {
            numeros: 100,
            precio: precioBase * 100,
            popular: false,
            descripcion: "Máxima participación"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12">
            {/* Título principal */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">

                <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                    Seleccione Su Plan de
                    <span className="block text-amber-400 text-base sm:text-xl md:text-2xl lg:text-3xl mt-1">Participación Oficial</span>
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                    Elija el paquete que mejor se adapte a sus necesidades. Cada número tiene las mismas
                    probabilidades de resultar ganador en nuestro sorteo certificado y auditado.
                </p>
            </div>

            {/* Grid de paquetes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {paquetes.map((paquete, index) => (
                    <Card
                        key={index}
                        className={`relative p-2 sm:p-3 md:p-4 text-center transition-all duration-300 hover:shadow-xl group ${paquete.popular
                            ? 'border-2 border-amber-400 shadow-lg shadow-amber-400/30 transform scale-105 bg-slate-800/90 backdrop-blur-sm ring-2 ring-amber-400/50'
                            : 'border border-gray-600 hover:border-amber-500/50 bg-slate-800/90 backdrop-blur-sm hover:shadow-amber-400/10'
                            }`}
                    >
                        {/* Badge de recomendado */}
                        {paquete.popular && (
                            <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                                    <Crown size={10} className="sm:hidden" />
                                    <Crown size={12} className="hidden sm:block" />
                                    <span className="hidden sm:inline">{paquete.badge}</span>
                                    <span className="sm:hidden">TOP</span>
                                </div>
                            </div>
                        )}

                        {/* Cantidad de números */}
                        <div className="mb-1 sm:mb-2">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                                <Hash size={16} className={`sm:hidden ${paquete.popular ? "text-amber-400" : "text-gray-400"}`} />
                                <Hash size={20} className={`hidden sm:block ${paquete.popular ? "text-amber-400" : "text-gray-400"}`} />
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                                    {paquete.numeros}
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-gray-400 mb-0.5">Números</p>
                            <p className={`text-xs font-semibold hidden sm:block ${paquete.popular ? "text-amber-400" : "text-gray-400"}`}>
                                {paquete.descripcion}
                            </p>
                        </div>

                        {/* Precio */}
                        <div className="mb-1 sm:mb-2">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5">
                                ${paquete.precio.toFixed(2)}
                            </div>
                            <p className="text-xs text-gray-400">USD</p>
                        </div>

                        {/* Features del paquete - Solo en pantallas medianas y grandes */}
                        <div className="space-y-0.5 mb-2 sm:mb-3 hidden sm:block">
                            <div className="flex items-center justify-center space-x-1 text-xs text-gray-300">
                                <CheckCircle size={12} className="text-green-400" />
                                <span>Certificado</span>
                            </div>
                            <div className="flex items-center justify-center space-x-1 text-xs text-gray-300">
                                <Shield size={12} className="text-blue-400" />
                                <span>Auditado</span>
                            </div>
                        </div>

                        {/* Indicador simple para móviles */}
                        <div className="mb-2 sm:hidden">
                            <div className="flex items-center justify-center space-x-1">
                                <CheckCircle size={10} className="text-green-400" />
                                <Shield size={10} className="text-blue-400" />
                            </div>
                        </div>

                        {/* Botón de acción - Más compacto en móvil */}
                        <div className="flex justify-center">
                            <Link to="/register">
                                <ShinyButton
                                    className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-bold group-hover:scale-105 transition-transform duration-300 w-full ${paquete.popular
                                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg'
                                        : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                                        }`}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="sm:hidden">Ir</span>
                                        <span className="hidden sm:inline">Participar</span>
                                        <ArrowRight size={10} className="sm:hidden" />
                                        <ArrowRight size={12} className="hidden sm:block md:w-3.5 md:h-3.5" />
                                    </div>
                                </ShinyButton>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Información adicional */}
            <div className="mt-6 sm:mt-8 md:mt-12 text-center">
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-600 shadow-sm">
                    <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                            <Lightbulb size={12} className="text-white sm:hidden" />
                            <Lightbulb size={14} className="text-white hidden sm:block md:w-4 md:h-4" />
                        </div>
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">
                            Estrategia Inteligente
                        </h4>
                    </div>

                    <p className="text-gray-300 max-w-3xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-2 sm:mb-3 md:mb-4 px-2 sm:px-0">
                        Los paquetes de mayor cantidad ofrecen más oportunidades.
                        Múltiples números incrementan sus posibilidades estadísticas.
                    </p>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto">
                        <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                            <TrendingUp size={16} className="text-amber-400 mx-auto mb-0.5 sm:mb-1 md:hidden" />
                            <TrendingUp size={20} className="text-amber-400 mx-auto mb-1 hidden md:block sm:hidden" />
                            <TrendingUp size={24} className="text-amber-400 mx-auto mb-2 hidden sm:block md:hidden" />
                            <h5 className="font-bold text-white mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-sm">Más Números</h5>
                            <p className="text-[10px] sm:text-xs text-gray-300 hidden sm:block">Mayor probabilidad estadística</p>
                        </div>

                        <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                            <Target size={16} className="text-green-400 mx-auto mb-0.5 sm:mb-1 md:hidden" />
                            <Target size={20} className="text-green-400 mx-auto mb-1 hidden md:block sm:hidden" />
                            <Target size={24} className="text-green-400 mx-auto mb-2 hidden sm:block md:hidden" />
                            <h5 className="font-bold text-white mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-sm">Mejor Valor</h5>
                            <p className="text-[10px] sm:text-xs text-gray-300 hidden sm:block">Optimización de inversión</p>
                        </div>

                        <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                            <Star size={16} className="text-purple-400 mx-auto mb-0.5 sm:mb-1 md:hidden" />
                            <Star size={20} className="text-purple-400 mx-auto mb-1 hidden md:block sm:hidden" />
                            <Star size={24} className="text-purple-400 mx-auto mb-2 hidden sm:block md:hidden" />
                            <h5 className="font-bold text-white mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-sm">Recomendado</h5>
                            <p className="text-[10px] sm:text-xs text-gray-300 hidden sm:block">10 números es la opción más equilibrada</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
