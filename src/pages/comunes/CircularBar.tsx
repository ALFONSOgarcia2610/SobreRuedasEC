"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSorteoCarros } from "../services/landing.query";

// Estilos CSS para las animaciones
const progressBarStyles = `
@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

@keyframes rainbowFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 
      0 0 5px rgba(251, 191, 36, 0.3),
      0 0 10px rgba(245, 158, 11, 0.2);
  }
  50% {
    box-shadow: 
      0 0 8px rgba(251, 191, 36, 0.4),
      0 0 15px rgba(245, 158, 11, 0.3);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.6;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.progress-container:hover .progress-bar {
  animation: glow 3s ease-in-out infinite;
}

.metric-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.metric-card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.beautiful-bar {
  background: linear-gradient(
    90deg,
    #d97706,
    #f59e0b,
    #fbbf24,
    #fcd34d,
    #fbbf24,
    #f59e0b,
    #d97706
  );
  background-size: 200% 200%;
  animation: rainbowFlow 8s ease-in-out infinite;
}
`;

export function AnimatedCircularProgressBarDemo({ progress }: { progress: number }) {

    const [value, setValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);
    const [animationValue, setAnimationValue] = useState(0);
    const dataSorteo = useSorteoCarros();
    const targetValue = progress;
    useEffect(() => {
        if (!dataSorteo.data || targetValue === 0) return;
        const animationDuration = 1000; 
        const steps = 10;
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
        // Animación sutil y natural que simula actualizaciones automáticas
        const constantAnimation = setInterval(() => {
            setAnimationValue(() => {
                // Movimiento muy sutil y natural
                const time = Date.now() / 3000; // Velocidad más lenta
                const subtleOscillation = Math.sin(time) * 0.3; // Oscilación muy sutil
                const breathingEffect = Math.sin(time * 0.5) * 0.2; // Efecto de "respiración"

                return Math.max(0, Math.min(100, value + subtleOscillation + breathingEffect));
            });
        }, 200); // Actualiza cada 200ms para ser menos agresivo

        return () => clearInterval(constantAnimation);
    }, [value]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 mt-15">
            {/* Inyectar estilos CSS */}
            <style dangerouslySetInnerHTML={{ __html: progressBarStyles }} />
            {/* Progress Section - UX Mejorada */}
            <div className="rounded-xl shadow-sm ">
                <div className="flex flex-col items-center">
                    {/* Barra Horizontal de Progreso Ultra Bonita */}
                    <div className="w-full max-w-3xl mb-8 progress-container group">
                        {/* Barra de progreso súper bonita */}
                        <div className="relative h-6 sm:h-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl overflow-hidden border-2 border-slate-600/50 progress-bar shadow-2xl">
                            {/* Fondo con efecto cristal */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm"></div>

                            {/* Barra de progreso principal ultra bonita */}
                            <div
                                className="h-full beautiful-bar rounded-2xl relative overflow-hidden shadow-xl transition-all duration-1000 ease-out"
                                style={{ width: `${displayValue >= targetValue ? animationValue : value}%` }}
                            >
                                {/* Capa de brillo sutil */}
                                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-2xl"></div>

                                {/* Efectos de flujo suaves */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                    {/* Onda principal suave */}
                                    <div
                                        className="absolute h-full w-24 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
                                        style={{
                                            animation: 'slide 6s linear infinite',
                                            transform: 'translateX(-100%)'
                                        }}
                                    ></div>

                                    {/* Partículas sparkle sutiles - Solo en pantallas grandes */}
                                    {displayValue > 20 && (
                                        <div className="hidden sm:block">
                                            <div className="absolute top-4 left-1/3 w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-sm" style={{ animation: 'sparkle 5s infinite' }}></div>
                                            <div className="absolute bottom-4 left-2/3 w-1 h-1 bg-amber-300 rounded-full shadow-sm" style={{ animation: 'sparkle 4s infinite 2s' }}></div>
                                        </div>
                                    )}
                                </div>

                                {/* Borde interno brillante */}
                                <div className="absolute inset-0 rounded-2xl border border-white/30"></div>
                            </div>

                            {/* Texto del porcentaje sutil */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <span className="text-white font-bold text-lg sm:text-3xl drop-shadow-lg relative z-10">
                                        {displayValue}%
                                    </span>
                                    <div className="absolute inset-0 text-amber-200 blur-sm opacity-30 text-lg sm:text-3xl font-bold">
                                        {displayValue}%
                                    </div>
                                </div>
                            </div>

                            {/* Marcadores de progreso premium - Ocultos en todas las pantallas */}
                            <div className="hidden absolute top-0 left-0 w-full h-full items-center">
                                {[25, 50, 75].map((mark) => (
                                    <div
                                        key={mark}
                                        className={`absolute w-1 h-full transition-all duration-500 ${displayValue >= mark
                                            ? 'bg-gradient-to-t from-white/80 to-yellow-300/80 shadow-lg'
                                            : 'bg-slate-500/30'
                                            }`}
                                        style={{ left: `${mark}%` }}
                                    >
                                        <div className={`absolute -top-9 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-bold transition-all duration-500 ${displayValue >= mark
                                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                                            : 'text-gray-500 bg-slate-700'
                                            }`}>
                                            {mark}%
                                        </div>
                                        {displayValue >= mark && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg border-2 border-white/50"></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Indicador de meta alcanzada súper especial */}
                            {displayValue >= 100 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-green-500/30 rounded-2xl animate-pulse"></div>
                                    
                                </div>
                            )}

                            {/* Reflexión de cristal */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                        </div>

                        {/* Barra de estado mejorada */}
                        <div className="flex justify-between items-center mt-4 text-sm">
                            <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full shadow-lg ${displayValue < 30 ? 'bg-gradient-to-r from-red-400 to-orange-400' :
                                    displayValue < 70 ? 'bg-gradient-to-r from-yellow-400 to-amber-400' :
                                        'bg-gradient-to-r from-green-400 to-emerald-400'
                                    } animate-pulse`}></div>
                                <span className="text-gray-300 font-medium">
                                    {displayValue < 30 ? 'Comenzando' :
                                        displayValue < 70 ? 'Acelerando' :
                                            displayValue < 100 ? 'Casi listo' : '¡Completo!'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información Ejecutiva con UX Mejorada */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <Card className="border border-gray-600 bg-slate-800/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/50 hover:-translate-y-1 group">
                    <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-amber-200 rounded-lg transition-all duration-300 group-hover:bg-amber-300 group-hover:scale-110">
                                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800 transition-all duration-300 group-hover:text-amber-900" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-white text-sm sm:text-base mb-1 transition-colors duration-300 group-hover:text-amber-100">
                                    Condición de Sorteo
                                </h4>
                                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm transition-colors duration-300 group-hover:text-gray-200">
                                    El sorteo se ejecutará únicamente al alcanzar el 100% de participaciones vendidas.
                                </p>

                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-600 bg-slate-800/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/50 hover:-translate-y-1 group">
                    <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-blue-200 rounded-lg transition-all duration-300 group-hover:bg-blue-300 group-hover:scale-110">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800 transition-all duration-300 group-hover:text-blue-900" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-white text-sm sm:text-base mb-1 transition-colors duration-300 group-hover:text-blue-100">
                                    Metodología
                                </h4>
                                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm transition-colors duration-300 group-hover:text-gray-200">
                                    El número ganador se determinará mediante los últimos 4 dígitos de la Lotería Nacional.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
