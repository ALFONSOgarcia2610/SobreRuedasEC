import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import {
    Clock,
    Shield,
    Smartphone,
    UserPlus,
    CreditCard,
    CheckCircle,
    Hash,
    Play,
    ArrowRight,
    Star
} from "lucide-react";


export function HeroVideoDialogDemo() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8">
            {/* Título y descripción del tutorial */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-amber-500/50">
                    <Play size={14} className="sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Tutorial Interactivo</span>
                </div>



                {/* Métricas de confianza */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-600 hover:shadow-lg hover:shadow-amber-400/10 transition-all duration-300">
                        <div className="flex justify-center mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                                <Clock size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white mb-1">Proceso Eficiente</div>
                        <div className="text-[10px] sm:text-xs text-gray-300">Registro en menos de 5 minutos</div>
                    </div>

                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-600 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300">
                        <div className="flex justify-center mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Shield size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" />
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white mb-1">100% Seguro</div>
                        <div className="text-[10px] sm:text-xs text-gray-300">Certificado y auditado</div>
                    </div>

                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-600 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300">
                        <div className="flex justify-center mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Smartphone size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400" />
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white mb-1">Multiplataforma</div>
                        <div className="text-[10px] sm:text-xs text-gray-300">Disponible en todos los dispositivos</div>
                    </div>
                </div>
            </div>

            {/* Video Tutorial */}
            <div className="relative flex justify-center mb-6 sm:mb-8 md:mb-12">
                <div className="relative group">
                    <HeroVideoDialog
                        className="block dark:hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto aspect-video mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-600"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                        thumbnailAlt="Tutorial de Participación Profesional"
                    />

                    <HeroVideoDialog
                        className="hidden dark:block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto aspect-video mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                        thumbnailAlt="Tutorial de Participación Profesional"
                    />

                    {/* Badge profesional del tutorial */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1 sm:space-x-2 shadow-lg">
                        <Play size={12} className="sm:w-4 sm:h-4" />
                        <span>GUÍA OFICIAL</span>
                    </div>

                    {/* Indicador de calidad */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold flex items-center space-x-1">
                        <Star size={10} className="sm:w-3.5 sm:h-3.5" />
                        <span>HD</span>
                    </div>
                </div>
            </div>

            {/* Pasos del proceso profesional */}
            <div className="mt-6 sm:mt-8 md:mt-12">
                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">Proceso de Participación</h4>
                    <p className="text-sm sm:text-base text-gray-300">Cuatro pasos simples para asegurar tu participación</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    <div className="group bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600 hover:shadow-xl hover:border-amber-500/50 hover:shadow-amber-400/10 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl flex items-center justify-center text-sm sm:text-base md:text-lg font-bold shadow-lg">
                                1
                            </div>
                            <UserPlus size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
                        </div>
                        <h5 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">Registro de Usuario</h5>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            Complete el formulario de registro con sus datos personales y de contacto verificados.
                        </p>
                        <div className="flex items-center mt-2 sm:mt-3 text-[10px] sm:text-xs text-amber-400">
                            <Clock size={10} className="sm:w-3 sm:h-3 mr-1" />
                            <span>2-3 minutos</span>
                        </div>
                    </div>

                    <div className="group bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600 hover:shadow-xl hover:border-green-500/50 hover:shadow-green-400/10 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center text-sm sm:text-base md:text-lg font-bold shadow-lg">
                                2
                            </div>
                            <CreditCard size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400 group-hover:text-green-300 transition-colors" />
                        </div>
                        <h5 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">Procesamiento de Pago</h5>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            Realice el pago seguro a través de nuestros métodos certificados.
                        </p>
                        <div className="flex items-center mt-2 sm:mt-3 text-[10px] sm:text-xs text-green-400">
                            <Shield size={10} className="sm:w-3 sm:h-3 mr-1" />
                            <span>100% Seguro</span>
                        </div>
                    </div>

                    <div className="group bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600 hover:shadow-xl hover:border-purple-500/50 hover:shadow-purple-400/10 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-sm sm:text-base md:text-lg font-bold shadow-lg">
                                3
                            </div>
                            <CheckCircle size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>
                        <h5 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">Verificación Oficial</h5>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            Nuestro equipo técnico verifica y valida su transacción en tiempo real.
                        </p>
                        <div className="flex items-center mt-2 sm:mt-3 text-[10px] sm:text-xs text-purple-400">
                            <ArrowRight size={10} className="sm:w-3 sm:h-3 mr-1" />
                            <span>Automático</span>
                        </div>
                    </div>

                    <div className="group bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600 hover:shadow-xl hover:border-orange-500/50 hover:shadow-orange-400/10 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center text-sm sm:text-base md:text-lg font-bold shadow-lg">
                                4
                            </div>
                            <Hash size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-400 group-hover:text-orange-300 transition-colors" />
                        </div>
                        <h5 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">Asignación de Números</h5>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            Reciba sus números oficiales del sorteo con certificado de participación.
                        </p>
                        <div className="flex items-center mt-2 sm:mt-3 text-[10px] sm:text-xs text-orange-400">
                            <Star size={10} className="sm:w-3 sm:h-3 mr-1" />
                            <span>Certificado</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
