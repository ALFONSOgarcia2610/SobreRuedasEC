"use client";

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, BarChart3, CheckCircle, TrendingUp, Users, Clock } from "lucide-react";
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

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Header Ejecutivo */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 mb-4">
                    <BarChart3 className="w-8 h-8 text-slate-600" />
                    <h3 className="text-2xl md:text-3xl font-semibold text-slate-800">
                        Estado del Sorteo
                    </h3>
                </div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Monitoreo en tiempo real del progreso de participaciones
                </p>
            </div>

            {/* Progress Section - Más ejecutivo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Circular Progress */}
                    <div className="relative mb-8 lg:mb-0">
                        <AnimatedCircularProgressBar
                            value={displayValue >= targetValue ? animationValue : value}
                            gaugePrimaryColor="rgb(71 85 105)"
                            gaugeSecondaryColor="rgba(71, 85, 105, 0.1)"
                            className="mx-auto [&>span]:hidden"
                        />
                        
                        {/* Contenido central */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-slate-700 mb-1">
                                    {displayValue}%
                                </div>
                                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                                    Completado
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Métricas Ejecutivas */}
                    <div className="grid grid-cols-2 gap-6 lg:ml-12">
                        <div className="text-center lg:text-left">
                            <div className="flex items-center space-x-2 mb-2">
                                <Users className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                                    Progreso
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-800">{displayValue}%</div>
                            <div className="text-sm text-slate-500">completado</div>
                        </div>

                        <div className="text-center lg:text-left">
                            <div className="flex items-center space-x-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                                    Restante
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">{100 - displayValue}%</div>
                            <div className="text-sm text-slate-500">por completar</div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-600">Estado: En progreso</span>
                        </div>
                        <div className="text-sm text-slate-500">
                            Actualizado hace menos de 1 minuto
                        </div>
                    </div>
                </div>
            </div>

            {/* Información Ejecutiva */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-lg mb-2">
                                    Condición de Sorteo
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    El sorteo se ejecutará únicamente al alcanzar el 100% de participaciones vendidas.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-lg mb-2">
                                    Metodología
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    El número ganador se determinará mediante los primeros 5 dígitos de la Lotería Nacional.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <Clock className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-lg mb-2">
                                    Estado Actual
                                </h4>
                                <div className="text-gray-600 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Completado:</span>
                                        <span className="font-medium">{displayValue}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pendiente:</span>
                                        <span className="font-medium text-blue-600">{100 - displayValue}%</span>
                                    </div>
                                    {displayValue < 100 && (
                                        <div className="pt-2 border-t border-gray-200">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                <span className="text-sm text-amber-600 font-medium">
                                                    Faltan {100 - displayValue}% para sorteo
                                                </span>
                                            </div>
                                        </div>
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
