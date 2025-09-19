"use client";

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, BarChart3, CheckCircle, TrendingUp, Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useSorteoCarros } from "../services/landing.query";


export function AnimatedCircularProgressBarDemo() {

    const [value, setValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);
    const [animationValue, setAnimationValue] = useState(0);
    const dataSorteo = useSorteoCarros();

    // Trabajar solo con porcentajes - convertir datos a porcentaje
    const totalBoletos = dataSorteo.data?.TotalBoletos || 1000;
    const boletosVendidos = dataSorteo.data?.BoletosVendidos || 0;
    const targetValue = Math.round((boletosVendidos / totalBoletos) * 100); // Porcentaje base
    const porcentajeRestante = 100 - targetValue;

    useEffect(() => {
        // Solo ejecutar animación cuando tengamos datos
        if (!dataSorteo.data || targetValue === 0) return;

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
    }, [targetValue, dataSorteo.data]);

    useEffect(() => {
        // Animación constante que simula actualizaciones automáticas
        const constantAnimation = setInterval(() => {
            setAnimationValue(() => {
                // Oscilación más pronunciada para efecto de "llenado"
                const time = Date.now() / 1500; // Velocidad de animación
                const oscillation = Math.sin(time) * 1.5 + Math.cos(time * 0.7) * 0.8; // Combinación de ondas
                const pulseEffect = Math.sin(time * 2) * 0.3; // Efecto de pulso adicional

                return Math.max(0, Math.min(100, value + oscillation + pulseEffect));
            });
        }, 100); // Actualiza cada 100ms para animación más fluida

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

                        {/* Efecto de flujo interno - Ondas animadas */}
                        <div className="absolute inset-0 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                {/* Gradiente animado para efecto de flujo */}
                                <defs>
                                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                                        <stop offset="50%" stopColor="rgba(147, 197, 253, 0.6)" />
                                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
                                        <animateTransform
                                            attributeName="gradientTransform"
                                            type="translate"
                                            values="-200 0;200 0;-200 0"
                                            dur="3s"
                                            repeatCount="indefinite"
                                        />
                                    </linearGradient>

                                    {/* Gradiente secundario para ondas */}
                                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
                                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0.4)" />
                                        <animateTransform
                                            attributeName="gradientTransform"
                                            type="translate"
                                            values="0 -100;0 100;0 -100"
                                            dur="2.5s"
                                            repeatCount="indefinite"
                                        />
                                    </linearGradient>
                                </defs>

                                {/* Círculo base para el flujo */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="url(#flowGradient)"
                                    strokeWidth="3"
                                    strokeDasharray={`${(displayValue / 100) * 283} 283`}
                                    strokeDashoffset="70"
                                    transform="rotate(-90 50 50)"
                                    opacity="0.7"
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        values="70;-213;70"
                                        dur="4s"
                                        repeatCount="indefinite"
                                    />
                                </circle>

                                {/* Círculo secundario para efecto de ondas */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="url(#waveGradient)"
                                    strokeWidth="2"
                                    strokeDasharray={`${(displayValue / 100) * 283} 283`}
                                    strokeDashoffset="140"
                                    transform="rotate(-90 50 50)"
                                    opacity="0.5"
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        values="140;-143;140"
                                        dur="3.5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>

                                {/* Partículas flotantes para efecto de flujo */}
                                <g opacity="0.6">
                                    <circle cx="30" cy="50" r="1" fill="rgba(59, 130, 246, 0.8)">
                                        <animateMotion
                                            dur="6s"
                                            repeatCount="indefinite"
                                            path="M 30,50 Q 50,30 70,50 Q 50,70 30,50"
                                        />
                                        <animate
                                            attributeName="r"
                                            values="1;2;1"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>

                                    <circle cx="40" cy="35" r="0.8" fill="rgba(147, 197, 253, 0.9)">
                                        <animateMotion
                                            dur="5s"
                                            repeatCount="indefinite"
                                            path="M 40,35 Q 60,25 65,45 Q 45,65 40,35"
                                        />
                                    </circle>

                                    <circle cx="60" cy="65" r="1.2" fill="rgba(99, 102, 241, 0.7)">
                                        <animateMotion
                                            dur="7s"
                                            repeatCount="indefinite"
                                            path="M 60,65 Q 35,55 35,35 Q 65,25 60,65"
                                        />
                                    </circle>
                                </g>
                            </svg>
                        </div>

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
                                    Completado
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-800">{displayValue}%</div>
                            <div className="text-sm text-slate-500">del sorteo</div>
                        </div>

                        <div className="text-center lg:text-left">
                            <div className="flex items-center space-x-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                                    Restante
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">{porcentajeRestante}%</div>
                            <div className="text-sm text-slate-500">por completar</div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-600">Estado: {dataSorteo.data?.EstadoSorteo}</span>
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
                                        <span>Restante:</span>
                                        <span className="font-medium text-blue-600">{porcentajeRestante}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Progreso:</span>
                                        <span className="font-medium text-slate-800">{displayValue}/100%</span>
                                    </div>
                                    {displayValue < 100 && (
                                        <div className="pt-2 border-t border-gray-200">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                                <span className="text-sm text-amber-600 font-medium">
                                                    Faltan {porcentajeRestante}% para el sorteo
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
