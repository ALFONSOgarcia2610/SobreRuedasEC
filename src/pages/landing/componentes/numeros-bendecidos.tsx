"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface NumerosBendecidosProps {
    className?: string;
}

export function NumerosBendecidos({ className }: NumerosBendecidosProps) {
    const [numerosGanadores] = useState([
        { numero: "09183", premio: "¡Premio Entregado!", entregado: true, monto: 300 },
        { numero: "18434", premio: "¡Premio Entregado!", entregado: true, monto: 150 },
        { numero: "29645", premio: "¡Premio Entregado!", entregado: true, monto: 50 },
        { numero: "30556", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "47897", premio: "¡Premio Entregado!", entregado: true, monto: 50 },
        { numero: "53678", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "62989", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "70312", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "85723", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "30098", premio: "Disponible", entregado: false, monto: 50 }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % numerosGanadores.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [numerosGanadores.length]);
    return (
        <div className={`max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12 ${className}`}>
            {/* Título Principal */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
                    Números Premiados
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                    Los siguientes números han sido seleccionados para premios en efectivo. Verifique si su boleto coincide con alguno de estos números:
                </p>
            </div>

            {/* Grid de Tickets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                {numerosGanadores.map((item, index) => (
                    <div key={item.numero} className="relative">
                        {/* Card Profesional */}
                        <Card
                            className={`
                                relative transition-all duration-300 hover:shadow-lg
                                ${item.entregado
                                    ? 'border border-gray-600 bg-slate-800/90 backdrop-blur-sm'
                                    : 'border border-amber-500/50 bg-slate-800/90 backdrop-blur-sm'
                                }
                                ${index === currentIndex ? 'ring-2 ring-amber-400 shadow-md shadow-amber-400/20' : ''}
                            `}
                        >
                            <CardContent className="p-2 sm:p-3 md:p-4 text-center">
                                {/* Header */}
                                <div className="flex items-center justify-center mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-600">
                                    <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">
                                        Número Premiado
                                    </span>
                                </div>

                                {/* Número Principal */}
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 font-mono tracking-wider">
                                    {item.numero}
                                </div>

                                {/* Estado del Premio */}
                                <div className="mb-2 sm:mb-3">
                                    {item.entregado ? (
                                        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                            <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                                            <span className="text-[10px] sm:text-xs md:text-sm text-green-400 font-medium">
                                                Premio Entregado
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-amber-400 font-medium">
                                                Premio Disponible
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Valor del Premio */}
                                <div className={`
                                    text-center py-1 sm:py-2 px-2 sm:px-3 rounded text-[10px] sm:text-xs md:text-sm font-semibold
                                    ${item.entregado
                                        ? 'bg-gray-700/50 text-gray-300 border border-gray-600'
                                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                                    }
                                `}>
                                    Premio: ${item.monto}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Información Adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <Card className="border border-gray-600 bg-slate-800/90 backdrop-blur-sm shadow-sm">
                    <CardContent className="p-4 sm:p-6 text-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 bg-amber-500/20 rounded-full flex items-center justify-center">
                            <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                        </div>
                        <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Números Premiados</h3>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            Si su número coincide con alguno de estos, puede reclamar su premio inmediatamente.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-gray-600 bg-slate-800/90 backdrop-blur-sm shadow-sm">
                    <CardContent className="p-4 sm:p-6 text-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-green-400 font-bold text-sm sm:text-lg md:text-xl">✓</span>
                        </div>
                        <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Verificación Inmediata</h3>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            Compare su boleto con estos números para verificar si es ganador.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-gray-600 bg-slate-800/90 backdrop-blur-sm shadow-sm">
                    <CardContent className="p-4 sm:p-6 text-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                            <span className="text-yellow-400 font-bold text-sm sm:text-lg md:text-xl">$</span>
                        </div>
                        <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Premios Adicionales</h3>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            Además del sorteo principal, puede ganar premios en efectivo.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Estadísticas */}
            <div className="mt-6 sm:mt-8 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-600 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                    <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            {numerosGanadores.filter(n => n.entregado).length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">Premios Entregados</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400">
                            {numerosGanadores.filter(n => !n.entregado).length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">Premios Disponibles</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">$50</div>
                        <div className="text-xs sm:text-sm text-gray-300">Premio por Número</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            ${numerosGanadores.reduce((total, item) => total + item.monto, 0)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">Total en Premios</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
