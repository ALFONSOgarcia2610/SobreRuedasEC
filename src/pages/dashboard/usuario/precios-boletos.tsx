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

    ArrowRight,
    Crown,
    DollarSign,

} from "lucide-react";
import { useSorteoCarros } from "@/pages/services/landing.query";

export function PreciosBoletosUsuario() {
    const [customQuantity, setCustomQuantity] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<number>(0);

    const DataSorteo = useSorteoCarros();

    // Precio base por boleto desde el sorteo activo
    const precioUnitario = DataSorteo.data?.precioporboleto || 1.5;

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
            precio: precioUnitario * 6,
            popular: false,
            descripcion: "Participación básica"
        },
        {
            numeros: 8,
            precio: precioUnitario * 8,
            popular: false,
            descripcion: "Oportunidad estándar"
        },
        {
            numeros: 10,
            precio: precioUnitario * 10,
            popular: true,
            badge: "RECOMENDADO",
            descripcion: "Mejor relación precio-valor"
        },
        {
            numeros: 20,
            precio: precioUnitario * 20,
            popular: false,
            descripcion: "Participación avanzada"
        },
        {
            numeros: 50,
            precio: precioUnitario * 50,
            popular: false,
            descripcion: "Oportunidad premium"
        },
        {
            numeros: 100,
            precio: precioUnitario * 100,
            popular: false,
            descripcion: "Máxima participación"
        }
    ];

    return (
        <div className="bg-slate-900 max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12">
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

            {/* Grid de paquetes y calculadora */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                {/* Grid de paquetes */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
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
                                        ${paquete.precio.toFixed(2)}
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
                </div>

                {/* Calculadora al lado */}
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-4 space-y-4">
                        {/* Card de la calculadora */}
                        <Card className="border border-slate-700 shadow-md bg-slate-800/50 backdrop-blur-sm">

                            {/* Encabezado simple */}
                            <div className="p-4 border-b border-slate-700">
                                <div className="flex items-center space-x-2.5">
                                    <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                                        <DollarSign className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-white">
                                            Calculadora
                                        </h4>
                                        <p className="text-xs text-slate-400">
                                            Mín. 100 boletos
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-4 space-y-3">
                                {/* Input */}
                                <div>
                                    <Label htmlFor="cantidad" className="text-xs text-slate-300 mb-1.5 block">
                                        Cantidad de Boletos
                                    </Label>
                                    <Input
                                        id="cantidad"
                                        type="number"
                                        min="100"
                                        value={customQuantity}
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                        placeholder="Ej: 500"
                                        className="w-full px-3 py-2 text-base bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-lg"
                                    />

                                    {/* Validación sutil */}
                                    {customQuantity && parseInt(customQuantity) < 100 && (
                                        <p className="text-red-400 text-xs mt-1.5 flex items-center">
                                            <span className="mr-1">⚠</span> Mínimo: 100
                                        </p>
                                    )}
                                </div>

                                {/* Precio calculado */}
                                {customPrice > 0 && (
                                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-slate-400">Por boleto</span>
                                            <span className="text-sm text-white font-medium">${precioUnitario.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-slate-400">Cantidad</span>
                                            <span className="text-sm text-white font-medium">{parseInt(customQuantity || '0').toLocaleString()}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-600/50 flex justify-between items-center">
                                            <span className="text-sm text-white font-semibold">Total</span>
                                            <span className="text-xl text-amber-400 font-bold">${customPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Botón */}
                                <div>
                                    {customPrice > 0 ? (
                                        <Link to="/usuario/compraSorteo">
                                            <ShinyButton
                                                className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-lg"
                                            >
                                                <div className="flex items-center justify-center space-x-2">
                                                    <span>Comprar ahora</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </ShinyButton>
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full py-2.5 text-sm font-semibold bg-slate-700 text-slate-500 rounded-lg cursor-not-allowed"
                                        >
                                            Ingresa cantidad
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Card informativa adicional */}
                        <Card className="border border-slate-700 shadow-md bg-slate-800/50 backdrop-blur-sm p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-white mb-1">
                                        Compra Segura
                                    </h5>
                                    <p className="text-xs text-slate-400">
                                        Sorteo certificado y auditado. Todas las transacciones son seguras.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Stats rápidas */}
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="border border-slate-700 bg-slate-800/50 p-3 text-center">
                                <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
                                <p className="text-xs text-slate-400">Certificado</p>
                            </Card>
                            <Card className="border border-slate-700 bg-slate-800/50 p-3 text-center">
                                <Shield className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                <p className="text-xs text-slate-400">Auditado</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}