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
        { numero: "29645", premio: "¡Premio Entregado!", entregado: true, monto:50},
        { numero: "30556", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "47897", premio: "¡Premio Entregado!", entregado: true, monto: 50 },
        { numero: "53678", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "62989", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "70312", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "85723", premio: "Disponible", entregado: false, monto: 50 },
        { numero: "30098", premio: "Disponible", entregado: false, monto: 50 }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % numerosGanadores.length);
                setIsAnimating(false);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, [numerosGanadores.length]);

    return (
        <div className={`max-w-6xl mx-auto px-4 py-12 ${className}`}>
            {/* Título Principal */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                    Números Premiados
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Los siguientes números han sido seleccionados para premios en efectivo. Verifique si su boleto coincide con alguno de estos números:
                </p>
            </div>

            {/* Grid de Tickets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
                {numerosGanadores.map((item, index) => (
                    <div key={item.numero} className="relative">
                        {/* Card Profesional */}
                        <Card
                            className={`
                                relative transition-all duration-300 hover:shadow-lg
                                ${item.entregado
                                    ? 'border border-gray-300 bg-gray-50'
                                    : 'border border-blue-200 bg-blue-50'
                                }
                                ${index === currentIndex ? 'ring-2 ring-blue-400 shadow-md' : ''}
                            `}
                        >
                            <CardContent className="p-4 text-center">
                                {/* Header */}
                                <div className="flex items-center justify-center mb-3 pb-2 border-b border-gray-200">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Número Premiado
                                    </span>
                                </div>

                                {/* Número Principal */}
                                <div className="text-2xl font-bold text-slate-800 mb-3 font-mono tracking-wider">
                                    {item.numero}
                                </div>

                                {/* Estado del Premio */}
                                <div className="mb-3">
                                    {item.entregado ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <BadgeCheck className="w-4 h-4 text-green-600" />
                                            <span className="text-sm text-green-700 font-medium">
                                                Premio Entregado
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm text-blue-700 font-medium">
                                                Premio Disponible
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Valor del Premio */}
                                <div className={`
                                    text-center py-2 px-3 rounded text-sm font-semibold
                                    ${item.entregado 
                                        ? 'bg-gray-100 text-gray-600 border border-gray-300' 
                                        : 'bg-blue-100 text-blue-800 border border-blue-300'
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <BadgeCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Números Premiados</h3>
                        <p className="text-gray-600 text-sm">
                            Si su número coincide con alguno de estos, puede reclamar su premio inmediatamente.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-xl">✓</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Verificación Inmediata</h3>
                        <p className="text-gray-600 text-sm">
                            Compare su boleto con estos números para verificar si es ganador.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600 font-bold text-xl">$</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Premios Adicionales</h3>
                        <p className="text-gray-600 text-sm">
                            Además del sorteo principal, puede ganar premios en efectivo.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Estadísticas */}
            <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-2xl font-bold text-gray-700">
                            {numerosGanadores.filter(n => n.entregado).length}
                        </div>
                        <div className="text-sm text-gray-600">Premios Entregados</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-2xl font-bold text-blue-600">
                            {numerosGanadores.filter(n => !n.entregado).length}
                        </div>
                        <div className="text-sm text-gray-600">Premios Disponibles</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-2xl font-bold text-green-600">$50</div>
                        <div className="text-sm text-gray-600">Premio por Número</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-2xl font-bold text-slate-700">
                            ${numerosGanadores.reduce((total, item) => total + item.monto, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Total en Premios</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
