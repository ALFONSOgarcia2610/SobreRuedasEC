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
        <header className="bg-white shadow-lg sticky top-0 z-50">
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
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-4">

                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl font-bold">SR</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">SobreRuedas</h1>
                                <p className="text-xs text-slate-500">Entregado Sueños</p>
                            </div>
                        </div>

                        {/* Navegación desktop */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <Link
                                to="/login"
                                className={`flex items-center space-x-2 font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${isActiveRoute("/login")
                                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                                    : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                            >
                                <Home size={16} />
                                <span>Inicio</span>
                            </Link>

                            <Link
                                to="/register"
                                className={`flex items-center space-x-2 font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${isActiveRoute("/register")
                                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                                    : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                            >
                                <UserPlus size={16} />
                                <span>Registrarse</span>
                            </Link>

                            <Link
                                to="/landing"
                                className={`flex items-center space-x-2 font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${isActiveRoute("/landing")
                                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                                    : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                            >
                                <Trophy size={16} />
                                <span>Sorteo</span>
                            </Link>
                        </nav>

                        {/* Botones de acción */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Progreso rápido */}


                            {/* Botón principal */}
                            <Link to="/login">
                                <ShinyButton className="bg-gradient-to-r from-emerald-200 to-green-200 hover:from-emerald-200 hover:to-green-200 text-white px-8 py-3 rounded-full font-bold shadow-xl  hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 border-2 border-green-400/30">
                                    <div className="flex items-center space-x-2">
                                        <Tickets size={16} className="text-green-900 animate-pulse" />
                                        <span className="text-green-900 font-bold">¡Participar Ahora!</span>
                                    </div>
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
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-sm font-bold">SR</span>
                                                </div>
                                                <span className="text-xl font-bold text-slate-800">SobreRuedas</span>
                                            </div>
                                        </DrawerTitle>
                                    </DrawerHeader>

                                    <div className="p-4 space-y-4">
                                        {/* Navegación móvil en drawer */}
                                        <nav className="space-y-2">
                                            <DrawerClose asChild>
                                                <Link
                                                    to="/login"
                                                    className={`flex items-center space-x-3 font-medium py-3 px-4 rounded-lg transition-colors duration-300 w-full ${isActiveRoute("/login")
                                                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                                                        : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <Home size={20} />
                                                    <span>Inicio</span>
                                                </Link>
                                            </DrawerClose>

                                            <DrawerClose asChild>
                                                <Link
                                                    to="/register"
                                                    className={`flex items-center space-x-3 font-medium py-3 px-4 rounded-lg transition-colors duration-300 w-full ${isActiveRoute("/register")
                                                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                                                        : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <UserPlus size={20} />
                                                    <span>Registrarse</span>
                                                </Link>
                                            </DrawerClose>

                                            <DrawerClose asChild>
                                                <Link
                                                    to="/landing"
                                                    className={`flex items-center space-x-3 font-medium py-3 px-4 rounded-lg transition-colors duration-300 w-full ${isActiveRoute("/landing")
                                                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                                                        : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <Trophy size={20} />
                                                    <span>Sorteo</span>
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
                                                <ShinyButton className="bg-gradient-to-r from-emerald-200 to-green-200 hover:from-emerald-200 hover:to-green-200 text-white px-8 py-3 rounded-full font-bold shadow-xl  hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 border-2 border-green-400/30 flex !justify-center items-center w-full">
                                                    <div className="flex items-center space-x-2 flex justify-center">
                                                        <Tickets size={16} className="text-green-900 animate-pulse" />
                                                        <span className="text-green-900 font-bold ">¡Participar Ahora!</span>
                                                    </div>
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
