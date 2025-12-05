
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, FileText, Lock, Home, PencilLine } from 'lucide-react';
import { TerminosCondiciones, PoliticaPrivacidad, ReglamentoSorteo } from './modales';
import { useGetCurrentLottery, useGetProductsByLotteryId } from '@/Services/admin/product.query';


export function Footer() {
    const { data: currentLottery } = useGetCurrentLottery();
      const { data: products } = useGetProductsByLotteryId(currentLottery?.lotteryId);
  
      // Filtrar solo productos principales (isCash === false)
      const productosPrincipales = products?.filter(p => p.isCash === false) ?? [];
      
      // Concatenar nombre y descripción de cada producto
      const productosTexto = productosPrincipales.length > 0
          ? productosPrincipales.map(p => `${p.name} - ${p.description}`).join(' & ')
          : 'Premios increíbles';
    return (
        <footer className="bg-slate-800 text-white">
            {/* Sección principal del footer */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-12 h-12 object-contain" />
                            </div>
                            <span className="text-xl font-bold">SobreRuedas</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            La plataforma de sorteos más confiable del Ecuador. Realizamos sorteos transparentes
                            y seguros para que tengas la oportunidad de ganar increíbles premios.
                        </p>
                        <div className="flex space-x-4">
                            <a  href="https://www.facebook.com/people/Sobre-Ruedas/61584305409558/" target='_blank' className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="https://www.instagram.com/sobreruedas.ecuador/" target='_blank' className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                                <Instagram size={16} />
                            </a>
                            <a href="https://www.tiktok.com/@sobreruedasecuador?_r=1&_t=ZM-91xPH5" target='_blank' className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
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
                                <TerminosCondiciones
                                    trigger={
                                        <button className="text-slate-300 hover:text-white transition-colors text-sm flex items-center space-x-2 cursor-pointer">
                                            <FileText size={14} />
                                            <span>Términos y Condiciones</span>
                                        </button>
                                    }
                                />
                            </li>
                            <li>
                                <PoliticaPrivacidad
                                    trigger={
                                        <button className="text-slate-300 hover:text-white transition-colors text-sm flex items-center space-x-2 cursor-pointer">
                                            <Lock size={14} />
                                            <span>Política de Privacidad</span>
                                        </button>
                                    }
                                />
                            </li>
                            <li>
                                <ReglamentoSorteo
                                    trigger={
                                        <button className="text-slate-300 hover:text-white transition-colors text-sm flex items-center space-x-2 cursor-pointer">
                                            <FileText size={14} />
                                            <span>Reglamento del Sorteo</span>
                                        </button>
                                    }
                                />
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
                                    <p className="text-sm font-medium">+593 98 594 1069</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={18} className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-slate-300">Email</p>
                                    <p className="text-sm font-medium">sobreruedasec@hotmail.com</p>
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
                            {/*     <p className="text-slate-400 text-sm">
                                ® Desarrollado por GarciaSystem.
                            </p> */}
                            <p className="text-slate-500 text-xs mt-1">
                                Sorteo {productosTexto}
                            </p>
                        </div>

                        {/* Badge de confianza */}
                        <div className="flex items-center space-x-4">
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
                <a
                    href="https://wa.me/593985941069?text=Hola,%20necesito%20ayuda%20con%20SobreRuedas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path>
                        <path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </footer>
    );
}
