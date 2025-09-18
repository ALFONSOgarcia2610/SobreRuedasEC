export function Footer() {
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
                                <span className="text-sm">📘</span>
                            </a>
                            <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                                <span className="text-sm">📷</span>
                            </a>
                            <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                <span className="text-sm">🎵</span>
                            </a>
                            <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                <span className="text-sm">📱</span>
                            </a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#inicio" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    🏠 Inicio
                                </a>
                            </li>

                            <li>
                                <a href="#como-participar" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    📋 Cómo Participar
                                </a>
                            </li>

                            <li>
                                <a href="#contacto" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    📞 Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Información legal */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Información Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#terminos" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    📄 Términos y Condiciones
                                </a>
                            </li>
                            <li>
                                <a href="#privacidad" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    🔒 Política de Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#reglamento" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    📋 Reglamento del Sorteo
                                </a>
                            </li>
                            <li>
                                <a href="#responsable" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    🎲 Juego Responsable
                                </a>
                            </li>
                            <li>
                                <a href="#transparencia" className="text-slate-300 hover:text-white transition-colors text-sm">
                                    ✅ Certificado de Transparencia
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto y soporte */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contacto & Soporte</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-400">📞</span>
                                <div>
                                    <p className="text-sm text-slate-300">Teléfono</p>
                                    <p className="text-sm font-medium">+593 99 123 4567</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-400">📧</span>
                                <div>
                                    <p className="text-sm text-slate-300">Email</p>
                                    <p className="text-sm font-medium">info@sobreruedas.ec</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-400">🕐</span>
                                <div>
                                    <p className="text-sm text-slate-300">Horario de Atención</p>
                                    <p className="text-sm font-medium">Lun - Dom: 8:00 AM - 10:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-400">📍</span>
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
                            <p className="text-slate-500 text-xs mt-1">
                                Sorteo Chevrolet Cavalier 2025.
                            </p>
                        </div>

                        {/* Badge de confianza */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-full">
                                <span className="text-green-400">✅</span>
                                <span className="text-xs font-medium">100% Confiable</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-full">
                                <span className="text-blue-400">🔒</span>
                                <span className="text-xs font-medium">Pagos Seguros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón flotante de ayuda */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-xl">💬</span>
                </button>
            </div>
        </footer>
    );
}
