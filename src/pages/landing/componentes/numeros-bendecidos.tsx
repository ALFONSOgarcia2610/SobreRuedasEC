"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Clover } from "lucide-react";
import { useEffect, useState } from "react";

interface NumerosBendecidosProps {
    className?: string;
}

export function NumerosBendecidos({ className }: NumerosBendecidosProps) {
    const [numerosGanadores] = useState([
        { numero: "09183", premio: "¡Premio Entregado!", entregado: true },
        { numero: "18434", premio: "¡Premio Entregado!", entregado: true },
        { numero: "29645", premio: "¡Premio Entregado!", entregado: true },
        { numero: "30556", premio: "Disponible", entregado: false },
        { numero: "47897", premio: "¡Premio Entregado!", entregado: true },
        { numero: "53678", premio: "Disponible", entregado: false },
        { numero: "62989", premio: "Disponible", entregado: false },
        { numero: "70312", premio: "Disponible", entregado: false },
        { numero: "85723", premio: "Disponible", entregado: false },
        { numero: "30098", premio: "Disponible", entregado: false }
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
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
                    ¡PREMIOS INSTANTÁNEOS!
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                    ¡Hay 10 números bendecidos con premios en efectivo! Realiza tu compra y revisa si tienes uno de los siguientes números:
                </p>
            </div>

            {/* Grid de Números */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-8">
                {numerosGanadores.map((item, index) => (
                    <Card
                        key={item.numero}
                        className={`
                            border-2 transition-all duration-500 transform hover:scale-105
                            ${item.entregado
                                ? 'border-green-300 bg-green-50 hover:bg-green-100'
                                : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                            }
                            ${index === currentIndex ? 'ring-4 ring-yellow-400 shadow-2xl scale-105' : 'shadow-lg'}
                            ${isAnimating && index === currentIndex ? 'animate-pulse' : ''}
                        `}
                    >
                        <CardContent className="p-4 md:p-6 text-center">
                            {/* Número Principal */}
                            <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 font-mono tracking-wider">
                                {item.numero}
                            </div>

                            {/* Estado del Premio */}
                            <div className={`
                                text-sm md:text-base font-semibold mb-2
                                ${item.entregado ? 'text-green-700' : 'text-blue-700'}
                            `}>
                                {item.premio}
                            </div>

                            {/* Icono y Estado */}
                            <div className="flex items-center justify-center space-x-2">
                                {item.entregado ? (
                                    <>
                                        <span className="text-2xl"><BadgeCheck /></span>
                                        <span className="text-xs text-green-600 font-medium">Entregado</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-2xl animate-bounce"><Clover /></span>
                                        <span className="text-xs text-blue-600 font-medium">Disponible</span>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Información Adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-yellow-300 bg-yellow-50">
                    <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">🎁</div>
                        <h3 className="font-bold text-yellow-800 text-lg mb-2">Premio Instantáneo</h3>
                        <p className="text-yellow-700 text-sm">
                            Si tu número coincide, ¡ganas inmediatamente!
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-purple-300 bg-purple-50">
                    <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">⚡</div>
                        <h3 className="font-bold text-purple-800 text-lg mb-2">Verificación Rápida</h3>
                        <p className="text-purple-700 text-sm">
                            Verifica tu boleto inmediatamente después de la compra y conformacion de pago
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-orange-300 bg-orange-50">
                    <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">🏆</div>
                        <h3 className="font-bold text-orange-800 text-lg mb-2">Doble Oportunidad</h3>
                        <p className="text-orange-700 text-sm">
                            Participas por el carro Y puedes ganar premios instantáneos
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Estadísticas */}
            <div className="mt-8 bg-slate-100 rounded-xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {numerosGanadores.filter(n => n.entregado).length}
                        </div>
                        <div className="text-sm text-slate-600">Premios Entregados</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">
                            {numerosGanadores.filter(n => !n.entregado).length}
                        </div>
                        <div className="text-sm text-slate-600">Premios Disponibles</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-yellow-600">$50</div>
                        <div className="text-sm text-slate-600">Premio por Número</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-purple-600">$500</div>
                        <div className="text-sm text-slate-600">Total en Premios</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
