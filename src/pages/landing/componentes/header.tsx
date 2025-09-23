"use client";

import { ShinyButton } from "@/components/ui/shiny-button";
import { Clock, Headset, Tickets, Home, UserPlus, Trophy, Menu } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useSorteoCarros } from "@/pages/services/landing.query";
export function Header() {
    const location = useLocation();
    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };
    const dataSorteo = useSorteoCarros();
    // Trabajar solo con porcentajes - convertir datos a porcentaje
    const totalBoletos = dataSorteo.data?.TotalBoletos || 1000;
    const boletosVendidos = dataSorteo.data?.BoletosVendidos || 0;
    const targetValue = Math.round((boletosVendidos / totalBoletos) * 100); // Porcentaje base

    return (
        <header className="sticky top-0 z-50">
            {/* Barra superior con información importante */}
            <div className="bg-black text-white font-semibold">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="animate-pulse">🔥</span>
                                <span className="font-medium">{targetValue}% VENDIDO</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                                <span><Headset size={16} strokeWidth={2.25} /></span>
                                <span>+593 99 123 4567</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span><Clock size={16} strokeWidth={2.25} /></span>
                                <span>8:00 AM - 10:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header principal */}
            <div className="bg-slate-900/15 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-4">

                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-12 h-12 object-contain" />
                            <div>
                                <h1 className="text-2xl font-bold text-white">SobreRuedasEc</h1>
                                <p className="text-xs text-white">Entregado Sueños</p>
                            </div>
                        </div>

                        {/* Navegación desktop */}
                        <nav className="hidden lg:flex items-center space-x-4">
                            <Link
                                to="/login"
                                className={`group flex items-center space-x-2 font-medium transition-all duration-300 px-4 py-2.5 rounded-xl relative overflow-hidden ${isActiveRoute("/login")
                                    ? "text-amber-200 shadow-md shadow-amber-500/20"
                                    : "text-white hover:text-amber-200 border-2 border-transparent"
                                    }`}
                            >
                                <Home size={16} className={`transition-all duration-300 ${isActiveRoute("/login") ? "text-amber-200" : "text-white group-hover:text-amber-200"}`} />
                                <span className="font-semibold">Inicio</span>
                            </Link>

                            <Link
                                to="/register"
                                className={`group flex items-center space-x-2 font-medium transition-all duration-300 px-4 py-2.5 rounded-xl relative overflow-hidden ${isActiveRoute("/register")
                                    ? "text-amber-200 shadow-md shadow-amber-500/20"
                                    : "text-white hover:text-amber-200 border-2 border-transparent"
                                    }`}
                            >
                                <UserPlus size={16} className={`transition-all duration-300 ${isActiveRoute("/register") ? "text-amber-200" : "text-white group-hover:text-amber-200"}`} />
                                <span className="font-semibold">Registrarse</span>
                            </Link>

                            <Link
                                to="/landing"
                                className={`group flex items-center space-x-2 font-medium transition-all duration-300 px-4 py-2.5 rounded-xl relative overflow-hidden ${isActiveRoute("/landing")
                                    ? "text-amber-200 shadow-md shadow-amber-500/20"
                                    : "text-white hover:text-amber-200 border-2 border-transparent"
                                    }`}
                            >
                                <Trophy size={16} className={`transition-all duration-300 ${isActiveRoute("/landing") ? "text-amber-200" : "text-white group-hover:text-amber-200"}`} />
                                <span className="font-semibold">Sorteo</span>
                            </Link>
                        </nav>

                        {/* Botones de acción */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Progreso rápido */}


                            {/* Botón principal */}
                            <Link to="/login">
                                <ShinyButton className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-amber-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-amber-500/60 hover:scale-105 border-2 border-yellow-500/70 relative overflow-hidden">
                                    <div className="flex items-center space-x-2 relative z-10">
                                        <Tickets size={16} className="text-amber-900 animate-pulse drop-shadow-sm" />
                                        <span className="text-amber-900 font-bold drop-shadow-sm">¡Participar Ahora!</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30"></div>
                                </ShinyButton>
                            </Link>
                        </div>

                        {/* Botón de menú móvil - Drawer */}
                        <Drawer>
                            <DrawerTrigger asChild>
                                <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                    <Menu className="w-6 h-6 text-slate-700" />
                                </button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                        <DrawerTitle className="text-center">
                                            <div className="flex items-center justify-center space-x-3 mb-2">
                                                <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-8 h-8 object-contain" />
                                                <span className="text-xl font-bold text-slate-800">SobreRuedasEc</span>
                                            </div>
                                        </DrawerTitle>
                                    </DrawerHeader>

                                    <div className="p-4 space-y-4">
                                        {/* Navegación móvil en drawer */}
                                        <nav className="space-y-3">
                                            <DrawerClose asChild>
                                                <Link
                                                    to="/login"
                                                    className={`group flex items-center space-x-3 font-medium py-4 px-4 rounded-xl transition-all duration-300 w-full relative overflow-hidden ${isActiveRoute("/login")
                                                        ? "text-amber-700 shadow-md shadow-amber-500/20"
                                                        : "text-slate-700 hover:text-amber-700 border-2 border-transparent"
                                                        }`}
                                                >
                                                    <Home size={20} className={`transition-all duration-300 ${isActiveRoute("/login") ? "text-amber-700" : "text-slate-700 group-hover:text-amber-600"}`} />
                                                    <span className="font-semibold">Inicio</span>
                                                </Link>
                                            </DrawerClose>

                                            <DrawerClose asChild>
                                                <Link
                                                    to="/register"
                                                    className={`group flex items-center space-x-3 font-medium py-4 px-4 rounded-xl transition-all duration-300 w-full relative overflow-hidden ${isActiveRoute("/register")
                                                        ? "text-amber-700 shadow-md shadow-amber-500/20"
                                                        : "text-slate-700 hover:text-amber-700 border-2 border-transparent"
                                                        }`}
                                                >
                                                    <UserPlus size={20} className={`transition-all duration-300 ${isActiveRoute("/register") ? "text-amber-700" : "text-slate-700 group-hover:text-amber-600"}`} />
                                                    <span className="font-semibold">Registrarse</span>
                                                </Link>
                                            </DrawerClose>

                                            <DrawerClose asChild>
                                                <Link
                                                    to="/landing"
                                                    className={`group flex items-center space-x-3 font-medium py-4 px-4 rounded-xl transition-all duration-300 w-full relative overflow-hidden ${isActiveRoute("/landing")
                                                        ? "text-amber-700 shadow-md shadow-amber-500/20"
                                                        : "text-slate-700 hover:text-amber-700 border-2 border-transparent"
                                                        }`}
                                                >
                                                    <Trophy size={20} className={`transition-all duration-300 ${isActiveRoute("/landing") ? "text-amber-700" : "text-slate-700 group-hover:text-amber-600"}`} />
                                                    <span className="font-semibold">Sorteo</span>
                                                </Link>
                                            </DrawerClose>
                                        </nav>

                                        {/* Información de contacto */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3 text-sm text-slate-600">
                                                    <Headset size={16} />
                                                    <span>+593 99 123 4567</span>
                                                </div>
                                                <div className="flex items-center space-x-3 text-sm text-slate-600">
                                                    <Clock size={16} />
                                                    <span>8:00 AM - 10:00 PM</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Botón principal */}
                                        <DrawerClose asChild>
                                            <Link to="/login">
                                                <ShinyButton className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-amber-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-amber-500/60 hover:scale-105 border-2 border-yellow-500/70 flex !justify-center items-center w-full relative overflow-hidden">
                                                    <div className="flex items-center space-x-2 flex justify-center relative z-10">
                                                        <Tickets size={16} className="text-amber-900 animate-pulse drop-shadow-sm" />
                                                        <span className="text-amber-900 font-bold drop-shadow-sm">¡Participar Ahora!</span>
                                                    </div>
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30"></div>
                                                </ShinyButton>
                                            </Link>
                                        </DrawerClose>
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>

            </div>
        </header>
    );
}
