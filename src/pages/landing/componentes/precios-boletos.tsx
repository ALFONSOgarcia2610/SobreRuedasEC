import { Card } from "@/components/ui/card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Link } from "@tanstack/react-router";
import { 
    Hash, 
    TrendingUp, 
    Star, 
    Shield, 
    CheckCircle, 
    Headphones, 
    Target,
    Lightbulb,
    ArrowRight,
    Crown
} from "lucide-react";

export function PreciosBoletos() {
    const paquetes = [
        {
            numeros: 6,
            precio: 9,
            popular: false,
            descripcion: "Participación básica"
        },
        {
            numeros: 8,
            precio: 12,
            popular: false,
            descripcion: "Oportunidad estándar"
        },
        {
            numeros: 10,
            precio: 15,
            popular: true,
            badge: "RECOMENDADO",
            descripcion: "Mejor relación precio-valor"
        },
        {
            numeros: 20,
            precio: 30,
            popular: false,
            descripcion: "Participación avanzada"
        },
        {
            numeros: 50,
            precio: 75,
            popular: false,
            descripcion: "Oportunidad premium"
        },
        {
            numeros: 100,
            precio: 150,
            popular: false,
            descripcion: "Máxima participación"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
            {/* Título principal */}
            <div className="text-center mb-8 sm:mb-12">
             
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 sm:mb-4 leading-tight">
                    Seleccione Su Plan de
                    <span className="block text-blue-600 text-xl sm:text-2xl md:text-3xl mt-1">Participación Oficial</span>
                </h2>
                
                <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                    Elija el paquete que mejor se adapte a sus necesidades. Cada número tiene las mismas 
                    probabilidades de resultar ganador en nuestro sorteo certificado y auditado.
                </p>
            </div>

            {/* Grid de paquetes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-4">
                {paquetes.map((paquete, index) => (
                    <Card
                        key={index}
                        className={`relative p-3 sm:p-4 text-center transition-all duration-300 hover:shadow-xl group ${paquete.popular
                            ? 'border-2 border-blue-500 shadow-lg transform scale-105 bg-gradient-to-br from-blue-50 to-white'
                            : 'border border-gray-200 hover:border-blue-300 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
                            }`}
                    >
                        {/* Badge de recomendado */}
                        {paquete.popular && (
                            <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                                    <Crown size={10} className="sm:hidden" />
                                    <Crown size={12} className="hidden sm:block" />
                                    <span className="hidden sm:inline">{paquete.badge}</span>
                                    <span className="sm:hidden">TOP</span>
                                </div>
                            </div>
                        )}

                        {/* Cantidad de números */}
                        <div className="mb-2 sm:mb-3">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                                <Hash size={16} className={`sm:hidden ${paquete.popular ? "text-blue-600" : "text-slate-600"}`} />
                                <Hash size={18} className={`hidden sm:block ${paquete.popular ? "text-blue-600" : "text-slate-600"}`} />
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    {paquete.numeros}
                                </h3>
                            </div>
                            <p className="text-xs font-medium text-slate-600 mb-1">Números</p>
                            <p className={`text-xs font-semibold hidden sm:block ${paquete.popular ? "text-blue-600" : "text-slate-500"}`}>
                                {paquete.descripcion}
                            </p>
                        </div>

                        {/* Precio */}
                        <div className="mb-2 sm:mb-3">
                            <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                                ${paquete.precio}
                            </div>
                            <p className="text-xs text-slate-500">USD</p>
                        </div>

                        {/* Features del paquete - Solo en pantallas medianas y grandes */}
                        <div className="space-y-1 mb-3 sm:mb-4 hidden sm:block">
                            <div className="flex items-center justify-center space-x-1 text-xs text-slate-600">
                                <CheckCircle size={12} className="text-green-500" />
                                <span>Certificado</span>
                            </div>
                            <div className="flex items-center justify-center space-x-1 text-xs text-slate-600">
                                <Shield size={12} className="text-blue-500" />
                                <span>Auditado</span>
                            </div>
                        </div>

                        {/* Indicador simple para móviles */}
                        <div className="mb-3 sm:hidden">
                            <div className="flex items-center justify-center space-x-1">
                                <CheckCircle size={10} className="text-green-500" />
                                <Shield size={10} className="text-blue-500" />
                            </div>
                        </div>

                        {/* Botón de acción - Más compacto en móvil */}
                        <div className="flex justify-center">
                            <Link to="/register">
                                <ShinyButton
                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold group-hover:scale-105 transition-transform duration-300 w-full ${paquete.popular
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg'
                                        : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                                        }`}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="sm:hidden">Ir</span>
                                        <span className="hidden sm:inline">Participar</span>
                                        <ArrowRight size={12} className="sm:hidden" />
                                        <ArrowRight size={14} className="hidden sm:block" />
                                    </div>
                                </ShinyButton>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Información adicional */}
            <div className="mt-8 sm:mt-12 text-center">
                <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm">
                    <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Lightbulb size={14} className="text-white sm:hidden" />
                            <Lightbulb size={16} className="text-white hidden sm:block" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-800">
                            Estrategia Inteligente
                        </h4>
                    </div>
                    
                    <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 px-2 sm:px-0">
                        Los paquetes de mayor cantidad ofrecen más oportunidades. 
                        Múltiples números incrementan sus posibilidades estadísticas.
                    </p>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg p-2 sm:p-4 border border-blue-100 shadow-sm">
                            <TrendingUp size={20} className="text-blue-500 mx-auto mb-1 sm:hidden" />
                            <TrendingUp size={24} className="text-blue-500 mx-auto mb-2 hidden sm:block" />
                            <h5 className="font-bold text-slate-800 mb-1 text-xs sm:text-sm">Más Números</h5>
                            <p className="text-xs text-slate-600 hidden sm:block">Mayor probabilidad estadística</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-2 sm:p-4 border border-green-100 shadow-sm">
                            <Target size={20} className="text-green-500 mx-auto mb-1 sm:hidden" />
                            <Target size={24} className="text-green-500 mx-auto mb-2 hidden sm:block" />
                            <h5 className="font-bold text-slate-800 mb-1 text-xs sm:text-sm">Mejor Valor</h5>
                            <p className="text-xs text-slate-600 hidden sm:block">Optimización de inversión</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-2 sm:p-4 border border-purple-100 shadow-sm">
                            <Star size={20} className="text-purple-500 mx-auto mb-1 sm:hidden" />
                            <Star size={24} className="text-purple-500 mx-auto mb-2 hidden sm:block" />
                            <h5 className="font-bold text-slate-800 mb-1 text-xs sm:text-sm">Recomendado</h5>
                            <p className="text-xs text-slate-600 hidden sm:block">10 números es la opción más equilibrada</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to action final */}
            <div className="mt-6 sm:mt-8 text-center">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-3 sm:p-4 border border-emerald-200 mb-3 sm:mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-1 sm:mb-2">
                        <Target size={16} className="text-emerald-600 sm:hidden" />
                        <Target size={18} className="text-emerald-600 hidden sm:block" />
                        <p className="text-sm sm:text-base font-bold text-slate-800">
                            Promoción Especial Vigente
                        </p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                        El paquete de 10 números es la mejor relación inversión-oportunidad
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs text-slate-600 bg-white rounded-lg p-1.5 sm:p-2 border border-gray-200">
                        <Shield size={12} className="text-green-500 sm:hidden" />
                        <Shield size={14} className="text-green-500 hidden sm:block" />
                        <span className="font-medium">100% Seguro</span>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs text-slate-600 bg-white rounded-lg p-1.5 sm:p-2 border border-gray-200">
                        <CheckCircle size={12} className="text-blue-500 sm:hidden" />
                        <CheckCircle size={14} className="text-blue-500 hidden sm:block" />
                        <span className="font-medium">Confirmación Inmediata</span>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs text-slate-600 bg-white rounded-lg p-1.5 sm:p-2 border border-gray-200">
                        <Headphones size={12} className="text-purple-500 sm:hidden" />
                        <Headphones size={14} className="text-purple-500 hidden sm:block" />
                        <span className="font-medium">Soporte 24/7</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
