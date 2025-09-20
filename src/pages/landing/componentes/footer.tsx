import { useSorteoCarros } from '@/pages/services/landing.query';
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, MessageCircle, CheckCircle, FileText, Lock, Home, PencilLine } from 'lucide-react';


export function Footer() {
    const DataSorteo = useSorteoCarros();
    return (
        <footer className="bg-slate-900 text-white">
            {/* Sección principal del footer */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-xl font-bold">SR</span>
                            </div>
                            <span className="text-xl font-bold">SobreRuedas</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            La plataforma de sorteos más confiable del Ecuador. Realizamos sorteos transparentes
                            y seguros para que tengas la oportunidad de ganar increíbles premios.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                                <Instagram size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                <MessageCircle size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                <Phone size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>

                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
                                    <Home className="w-4 h-4" />
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <a href="/register" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
                                    <PencilLine className="w-4 h-4" />
                                    Registrarse
                                </a>
                            </li>
                          
                        </ul>
                    </div>

                    {/* Información legal */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Información Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#terminos" className="text-slate-300 hover:text-white transition-colors text-sm flex items-center space-x-2">
                                    <FileText size={14} />
                                    <span>Términos y Condiciones</span>
                                </a>
                            </li>
                            <li>
                                <a href="#privacidad" className="text-slate-300 hover:text-white transition-colors text-sm flex items-center space-x-2">
                                    <Lock size={14} />
                                    <span>Política de Privacidad</span>
                                </a>
                            </li>
                            <li>
                                <a href="#reglamento" className="text-slate-300 hover:text-white transition-colors text-sm flex items-center space-x-2">
                                    <FileText size={14} />
                                    <span>Reglamento del Sorteo</span>
                                </a>
                            </li>
                         
                        </ul>
                    </div>

                    {/* Contacto y soporte */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contacto & Soporte</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone size={18} className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-slate-300">Teléfono</p>
                                    <p className="text-sm font-medium">+593 99 123 4567</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={18} className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-slate-300">Email</p>
                                    <p className="text-sm font-medium">info@sobreruedas.ec</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock size={18} className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-slate-300">Horario de Atención</p>
                                    <p className="text-sm font-medium">Lun - Dom: 8:00 AM - 10:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin size={18} className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-slate-300">Ubicación</p>
                                    <p className="text-sm font-medium">Portoviejo, Ecuador</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Pie del footer */}
            <div className="bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-slate-400 text-sm">
                                © 2025 SobreRuedas Ecuador. Todos los derechos reservados.
                            </p>
                            <p className="text-slate-400 text-sm">
                                ® Desarrollado por GarciaSystem. +593989619225
                            </p>
                            <p className="text-slate-500 text-xs mt-1">
                                Sorteo {DataSorteo.data?.Premio}.
                            </p>
                        </div>

                        {/* Badge de confianza */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-full">
                                <CheckCircle size={16} className="text-green-400" />
                                <span className="text-xs font-medium">100% Confiable</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-full">
                                <Lock size={16} className="text-blue-400" />
                                <span className="text-xs font-medium">Pagos Seguros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón flotante de ayuda */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <MessageCircle size={24} />
                </button>
            </div>
        </footer>
    );
}
