import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            {/* Barra superior con información importante */}
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="animate-pulse">🔥</span>
                                <span className="font-medium">45% VENDIDO</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                                <span>📞</span>
                                <span>+593 99 123 4567</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span>🕐</span>
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
                                <p className="text-xs text-slate-500">Sorteos Transparentes Ecuador</p>
                            </div>
                        </div>

                        {/* Navegación desktop */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <a href="#inicio" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300">
                                Inicio
                            </a>

                            <a href="#como-participar" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300">
                                Cómo Participar
                            </a>
                            {/*  <a href="#ganadores" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300">
                               Ganadores
                           </a>
                           */}
                            {/* <a href="#testimonios" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300">
                                Testimonios
                            </a> */}
                            <a href="#contacto" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300">
                                Contacto
                            </a>
                        </nav>

                        {/* Botones de acción */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Progreso rápido */}
                            <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-blue-800">Progreso:</span>
                                    <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                                            style={{ width: '45%' }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600">45%</span>
                                </div>
                            </div>

                            {/* Botón principal */}
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                                🎯 Participar Ahora
                            </Button>
                        </div>

                        {/* Botón de menú móvil */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <div className={`w-5 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                                <div className={`w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                                <div className={`w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-gray-50 border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <nav className="space-y-4">
                                <a href="#inicio" className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300">
                                    🏠 Inicio
                                </a>
                                <a href="#sorteo" className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300">
                                    🎯 Sorteo Actual
                                </a>
                                <a href="#como-participar" className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300">
                                    📋 Cómo Participar
                                </a>

                                <a href="#contacto" className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300">
                                    📞 Contacto
                                </a>

                                {/* Información de contacto móvil */}
                                <div className="pt-4 border-t border-gray-300">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <span>📞</span>
                                            <span>+593 99 123 4567</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <span>🕐</span>
                                            <span>8:00 AM - 10:00 PM</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progreso móvil */}
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <div className="text-center space-y-2">
                                        <p className="text-sm font-medium text-blue-800">Progreso del Sorteo</p>
                                        <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                                                style={{ width: '45%' }}
                                            ></div>
                                        </div>
                                        <p className="text-lg font-bold text-blue-600">45% Completado</p>
                                    </div>
                                </div>

                                {/* Botón principal móvil */}
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full font-semibold shadow-lg transition-all duration-300">
                                    🎯 Participar Ahora
                                </Button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
