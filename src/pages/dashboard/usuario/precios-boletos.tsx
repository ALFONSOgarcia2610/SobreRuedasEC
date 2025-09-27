import { Card } from "@/components/ui/card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
    Hash,
    Shield,
    CheckCircle,
    Lightbulb,
    ArrowRight,
    Crown,
    DollarSign
} from "lucide-react";

export function PreciosBoletosUsuario() {
    const [customQuantity, setCustomQuantity] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<number>(0);

    // Precio por boleto (basado en el patrón de los paquetes existentes)
    const precioUnitario = 1.5; // $1.5 USD por boleto

    // Calcular precio cuando cambie la cantidad
    const handleQuantityChange = (value: string) => {
        setCustomQuantity(value);
        const quantity = parseInt(value) || 0;
        if (quantity >= 100) {
            setCustomPrice(quantity * precioUnitario);
        } else {
            setCustomPrice(0);
        }
    };

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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12">
            {/* Título principal */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">

                <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                    Seleccione Su Plan de
                    <span className="block text-amber-400 text-base sm:text-xl md:text-2xl lg:text-3xl mt-1">Participación Oficial</span>
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                    Elija el paquete que mejor se adapte a sus necesidades. Cada número tiene las mismas
                    probabilidades de resultar ganador en nuestro sorteo certificado y auditado.
                </p>
            </div>

            {/* Grid de paquetes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {paquetes.map((paquete, index) => (
                    <Card
                        key={index}
                        className={`relative p-2 sm:p-3 md:p-4 text-center transition-all duration-300 hover:shadow-xl group ${paquete.popular
                            ? 'border-2 border-amber-400 shadow-lg shadow-amber-400/30 transform scale-105 bg-slate-800/90 backdrop-blur-sm ring-2 ring-amber-400/50'
                            : 'border border-gray-600 hover:border-amber-500/50 bg-slate-800/90 backdrop-blur-sm hover:shadow-amber-400/10'
                            }`}
                    >
                        {/* Badge de recomendado */}
                        {paquete.popular && (
                            <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                                    <Crown size={10} className="sm:hidden" />
                                    <Crown size={12} className="hidden sm:block" />
                                    <span className="hidden sm:inline">{paquete.badge}</span>
                                    <span className="sm:hidden">TOP</span>
                                </div>
                            </div>
                        )}

                        {/* Cantidad de números */}
                        <div className="mb-1 sm:mb-2">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                                <Hash size={16} className={`sm:hidden ${paquete.popular ? "text-amber-400" : "text-gray-400"}`} />
                                <Hash size={20} className={`hidden sm:block ${paquete.popular ? "text-amber-400" : "text-gray-400"}`} />
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                                    {paquete.numeros}
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-gray-400 mb-0.5">Números</p>
                            <p className={`text-xs font-semibold hidden sm:block ${paquete.popular ? "text-amber-400" : "text-gray-400"}`}>
                                {paquete.descripcion}
                            </p>
                        </div>

                        {/* Precio */}
                        <div className="mb-1 sm:mb-2">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5">
                                ${paquete.precio}
                            </div>
                            <p className="text-xs text-gray-400">USD</p>
                        </div>


                        {/* Indicador simple para móviles */}
                        <div className="mb-2 sm:hidden">
                            <div className="flex items-center justify-center space-x-1">
                                <CheckCircle size={10} className="text-green-400" />
                                <Shield size={10} className="text-blue-400" />
                            </div>
                        </div>

                        {/* Botón de acción - Más compacto en móvil */}
                        <div className="flex justify-center">
                            <Link to="/usuario/compraSorteo">
                                <ShinyButton
                                    className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-bold group-hover:scale-105 transition-transform duration-300 w-full ${paquete.popular
                                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg'
                                        : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                                        }`}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="sm:hidden gap-2">Ir</span>
                                        <span className="hidden sm:inline">Comprar</span>
                                        <ArrowRight size={10} className="sm:hidden" />
                                        <ArrowRight size={12} className="hidden sm:block md:w-3.5 md:h-3.5" />
                                    </div>
                                </ShinyButton>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Sección Comprar Más - Input Personalizable */}
            <div className="mt-6 sm:mt-8 md:mt-10">
                {/* Título de la sección premium */}
                <div className="text-center mb-3 sm:mb-4 md:mb-5">
                    <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto px-2 sm:px-0">
                        Personaliza tu compra. Ingresa la cantidad de boletos (mín. 100) y calcula el precio.
                    </p>
                </div>

                {/* Card del calculador personalizado */}
                <div className="max-w-lg mx-auto">
                    <Card className="border-2 border-amber-400/50 shadow-xl shadow-amber-400/20 bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm p-3 sm:p-4 md:p-5">

                        {/* Encabezado de la card - más compacto */}
                        <div className="text-center mb-3 sm:mb-4">
                            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-2 sm:mb-3">
                                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
                                Calculadora de Boletos
                            </h4>
                            <p className="text-slate-400 text-xs sm:text-sm">
                                Desde $100 USD (mín. 100 boletos)
                            </p>
                        </div>

                        {/* Input section - más compacto */}
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <Label htmlFor="cantidad" className="text-white text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">
                                    Cantidad de Boletos
                                </Label>
                                <div className="relative">
                                    <Hash className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                                    <Input
                                        id="cantidad"
                                        type="number"
                                        min="100"
                                        value={customQuantity}
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                        placeholder="Ej: 500"
                                        className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400 focus:ring-amber-400/50 text-sm sm:text-base md:text-lg"
                                    />
                                </div>
                                {customQuantity && parseInt(customQuantity) < 100 && (
                                    <p className="text-red-400 text-xs mt-1 sm:mt-1.5">
                                        * Cantidad mínima: 100 boletos
                                    </p>
                                )}
                            </div>

                            {/* Precio calculado - más compacto */}
                            {customPrice > 0 && (
                                <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg p-2.5 sm:p-3 md:p-3.5 border border-amber-400/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-300 text-xs sm:text-sm">Precio Total</p>
                                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400">
                                                ${customPrice.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-xs">Por boleto</p>
                                            <p className="text-sm sm:text-base text-white font-semibold">${precioUnitario}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botón de compra - más compacto */}
                            <div className="pt-1 sm:pt-2">
                                {customPrice > 0 ? (
                                    <Link to="/usuario/compraSorteo">
                                        <ShinyButton
                                            className="w-full py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-bold transition-all duration-300 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:via-amber-700 hover:to-yellow-600 text-white shadow-lg shadow-amber-500/30 hover:scale-[1.02]"
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <Lightbulb size={16} className="sm:w-5 sm:h-5" />
                                                <span className="sm:hidden">Comprar {parseInt(customQuantity || '0').toLocaleString()}</span>
                                                <span className="hidden sm:inline">Comprar {parseInt(customQuantity || '0').toLocaleString()} Boletos</span>
                                                <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                                            </div>
                                        </ShinyButton>
                                    </Link>
                                ) : (
                                    <div className="w-full py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-slate-500 to-slate-600 text-slate-300 rounded-lg text-center opacity-50 cursor-not-allowed">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Lightbulb size={16} className="sm:w-5 sm:h-5" />
                                            <span className="sm:hidden">Ingresa cantidad</span>
                                            <span className="hidden sm:inline">Ingresa una cantidad válida</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
