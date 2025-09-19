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
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Título y descripción del tutorial */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 border border-blue-200">
                    <Play size={16} />
                    <span className="text-sm font-semibold">Tutorial Interactivo</span>
                </div>
                
        

                {/* Métricas de confianza */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Clock size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="text-sm font-bold text-blue-800 mb-1">Proceso Eficiente</div>
                        <div className="text-xs text-blue-600">Registro en menos de 5 minutos</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <Shield size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="text-sm font-bold text-green-800 mb-1">100% Seguro</div>
                        <div className="text-xs text-green-600">Certificado y auditado</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                <Smartphone size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="text-sm font-bold text-purple-800 mb-1">Multiplataforma</div>
                        <div className="text-xs text-purple-600">Disponible en todos los dispositivos</div>
                    </div>
                </div>
            </div>

            {/* Video Tutorial */}
            <div className="relative flex justify-center mb-12">
                <div className="relative group">
                    <HeroVideoDialog
                        className="block dark:hidden w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto aspect-video mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                        thumbnailAlt="Tutorial de Participación Profesional"
                    />

                    <HeroVideoDialog
                        className="hidden dark:block w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto aspect-video mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                        thumbnailAlt="Tutorial de Participación Profesional"
                    />

                    {/* Badge profesional del tutorial */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-lg">
                        <Play size={16} />
                        <span>GUÍA OFICIAL</span>
                    </div>

                    {/* Indicador de calidad */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                        <Star size={14} />
                        <span>HD</span>
                    </div>
                </div>
            </div>

            {/* Pasos del proceso profesional */}
            <div className="mt-12">
                <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-slate-800 mb-3">Proceso de Participación</h4>
                    <p className="text-slate-600">Cuatro pasos simples para asegurar tu participación</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                                1
                            </div>
                            <UserPlus size={24} className="text-blue-500 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h5 className="font-bold text-slate-800 mb-2">Registro de Usuario</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Complete el formulario de registro con sus datos personales y de contacto verificados.
                        </p>
                        <div className="flex items-center mt-3 text-xs text-blue-600">
                            <Clock size={12} className="mr-1" />
                            <span>2-3 minutos</span>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                                2
                            </div>
                            <CreditCard size={24} className="text-green-500 group-hover:text-green-600 transition-colors" />
                        </div>
                        <h5 className="font-bold text-slate-800 mb-2">Procesamiento de Pago</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Realice el pago seguro a través de nuestros métodos certificados.
                        </p>
                        <div className="flex items-center mt-3 text-xs text-green-600">
                            <Shield size={12} className="mr-1" />
                            <span>100% Seguro</span>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                                3
                            </div>
                            <CheckCircle size={24} className="text-purple-500 group-hover:text-purple-600 transition-colors" />
                        </div>
                        <h5 className="font-bold text-slate-800 mb-2">Verificación Oficial</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Nuestro equipo técnico verifica y valida su transacción en tiempo real.
                        </p>
                        <div className="flex items-center mt-3 text-xs text-purple-600">
                            <ArrowRight size={12} className="mr-1" />
                            <span>Automático</span>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-orange-300 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                                4
                            </div>
                            <Hash size={24} className="text-orange-500 group-hover:text-orange-600 transition-colors" />
                        </div>
                        <h5 className="font-bold text-slate-800 mb-2">Asignación de Números</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Reciba sus números oficiales del sorteo con certificado de participación.
                        </p>
                        <div className="flex items-center mt-3 text-xs text-orange-600">
                            <Star size={12} className="mr-1" />
                            <span>Certificado</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
