"use client";

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";


export function AnimatedCircularProgressBarDemo() {
    const [value, setValue] = useState(0); // Comienza en 0 para animación
    const [displayValue, setDisplayValue] = useState(0); // Para mostrar números animados
    const [animationValue, setAnimationValue] = useState(0); // Para la animación constante
    const targetValue = 45; // Valor final (45% de boletos vendidos)

    useEffect(() => {
        // Animación inicial de llenado de la barra
        const animationDuration = 3000; // 3 segundos
        const steps = 90; // Número de pasos para la animación
        const stepValue = targetValue / steps;
        const stepTime = animationDuration / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            const currentValue = Math.min(stepValue * currentStep, targetValue);
            setValue(currentValue);
            setDisplayValue(Math.floor(currentValue));

            if (currentStep >= steps) {
                clearInterval(interval);
                setValue(targetValue);
                setDisplayValue(targetValue);
            }
        }, stepTime);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Animación constante muy sutil de "llenado progresivo"
        const constantAnimation = setInterval(() => {
            setAnimationValue(() => {
                // Oscilación muy ligera entre el valor actual y ligeramente más alto
                const oscillation = Math.sin(Date.now() / 2000) * 0.5; // Oscilación muy suave
                return Math.max(0, Math.min(100, value + oscillation));
            });
        }, 200); // Actualiza cada 200ms para animación más suave

        return () => clearInterval(constantAnimation);
    }, [value]);

    const boletosVendidos = Math.floor((displayValue / 100) * 1000);
    const boletosRestantes = 1000 - boletosVendidos;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    Progreso de Venta de Boletos
                </h3>
                <p className="text-lg text-slate-600">
                    Seguimiento en tiempo real de los boletos vendidos
                </p>
            </div>

            {/* Circular Progress - Centrado */}
            <div className="flex flex-col items-center mb-12">
                <div className="relative">
                    <AnimatedCircularProgressBar
                        value={displayValue >= targetValue ? animationValue : value}
                        gaugePrimaryColor="rgb(59 130 246)"
                        gaugeSecondaryColor="rgba(59, 130, 246, 0.1)"
                        className="mx-auto [&>span]:hidden"
                    />

                    {/* Porcentaje en el centro */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600">
                                {displayValue}%
                            </div>
                            <div className="text-sm text-blue-400 font-medium">
                                Completado
                            </div>
                        </div>
                    </div>
                </div>

                {/* Indicador simple */}
                <div className="text-center mt-6">
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Actualizando en tiempo real</span>
                    </div>
                </div>
            </div>

            {/* Información del Sorteo - Debajo del progreso */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2 border-amber-200 bg-amber-50">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-3">

                            <div>
                                <h4 className="font-bold text-amber-800 text-lg mb-2">
                                    Condición Importante
                                </h4>
                                <p className="text-amber-700 leading-relaxed">
                                    <p>El sorteo NO se realizará hasta completar el 100% de boletos vendidos.</p>

                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-3">

                            <div>
                                <h4 className="font-bold text-blue-800 text-lg mb-2">
                                    Método del Sorteo
                                </h4>
                                <p className="text-blue-700 leading-relaxed">
                                    El número ganador se determinará usando los 5 números de la primera suerte del
                                    número ganador de la Lotería Nacional del día del sorteo.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-3">

                            <div>
                                <h4 className="font-bold text-green-800 text-lg mb-2">
                                    Estado Actual
                                </h4>
                                <div className="text-green-700 space-y-1">
                                    <p>• Boletos vendidos: <strong>{boletosVendidos}</strong></p>
                                    <p>• Boletos disponibles: <strong>{boletosRestantes}</strong></p>
                                    <p>• Progreso: <strong>{displayValue}%</strong></p>
                                    {displayValue < 100 && (
                                        <p className="text-red-600 font-semibold mt-2">
                                            ⏳ Sorteo pendiente - Faltan {boletosRestantes} boletos
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
