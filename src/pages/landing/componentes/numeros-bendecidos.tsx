"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface NumerosBendecidosProps {
    className?: string;
    isLoading?: boolean;
}

export function NumerosBendecidos({ className, isLoading = false }: NumerosBendecidosProps) {
    const [numerosGanadores] = useState([
        { numero: "01013", premio: "¡Premio Entregado!", entregado: true, monto: 300 },
        { numero: "16528", premio: "¡Premio Entregado!", entregado: true, monto: 150 },
        { numero: "24390", premio: "¡Premio Entregado!", entregado: true, monto: 50 },
        { numero: "31431", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "40774", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "55321", premio: "¡Premio Entregado!", entregado: true, monto: 50 },
        { numero: "67890", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "74182", premio: "¡Premio Entregado!", entregado: true, monto: 50 },
        { numero: "85723", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "90198", premio: "Disponible", entregado: false, monto: 50 }
    ]);
    
    // Función para formatear números sin espacios
    const formatNumberWithSpaces = (numero: string) => {
        return numero; // Sin espacios
    };
    
    useEffect(() => {
        // Ya no necesitamos animación del índice actual
        return;
    }, [isLoading]);

    // Skeleton para estado de carga
    if (isLoading) {
        return (
            <div className={`max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12 ${className}`}>
                {/* Título Skeleton */}
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-64 sm:w-80 mx-auto mb-2 sm:mb-4 bg-slate-700" />
                    <Skeleton className="h-4 sm:h-5 md:h-6 w-80 sm:w-96 mx-auto bg-slate-700" />
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                    {[...Array(10)].map((_, index) => (
                        <Card key={index} className="bg-slate-800 border-slate-700">
                            <CardContent className="p-2 sm:p-3">
                                <div className="text-center">
                                    <Skeleton className="h-6 sm:h-7 w-16 sm:w-20 mx-auto mb-2 bg-slate-700" />
                                    <Skeleton className="h-3 w-12 mx-auto mb-1 bg-slate-700" />
                                    <Skeleton className="h-4 w-8 mx-auto bg-slate-700" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Cards Informativas Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="bg-slate-800 border-slate-700">
                            <CardContent className="p-4 sm:p-6 text-center">
                                <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 bg-slate-700 rounded-full" />
                                <Skeleton className="h-5 sm:h-6 w-24 sm:w-32 mx-auto mb-1 sm:mb-2 bg-slate-700" />
                                <Skeleton className="h-4 w-full mx-auto bg-slate-700" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Estadísticas Skeleton */}
                <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-slate-700/50 rounded-lg p-3 sm:p-4 border border-slate-600">
                                <Skeleton className="h-6 sm:h-8 w-8 sm:w-12 mx-auto mb-2 bg-slate-600" />
                                <Skeleton className="h-3 w-16 sm:w-20 mx-auto bg-slate-600" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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

            {/* Lista de Números - Una columna en móvil, 5 columnas en pantallas grandes */}
            <div className="max-w-sm mx-auto lg:max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-4 mb-6 sm:mb-8">
                {numerosGanadores.map((item) => (
                    <div 
                        key={item.numero} 
                        className="text-center p-2 lg:p-3"
                    >
                        {/* Número con tachado elegante si está entregado */}
                        <div className="text-xl sm:text-2xl lg:text-xl font-bold font-mono tracking-wider mb-2 relative">
                            <span className={`${item.entregado ? 'text-gray-400' : 'text-white'}`}>
                                {formatNumberWithSpaces(item.numero)}
                            </span>
                            {item.entregado && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                                </div>
                            )}
                        </div>
                        
                        {/* Estado */}
                        <div className="mb-2">
                            {item.entregado ? (
                                <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                                    ¡Premio Entregado!
                                </span>
                            ) : (
                                <span className="text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded">
                                    Premio Disponible
                                </span>
                            )}
                        </div>
                        
                        {/* Monto debajo del estado */}
                        <div className="text-lg lg:text-base font-semibold text-white">
                            ${item.monto}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
