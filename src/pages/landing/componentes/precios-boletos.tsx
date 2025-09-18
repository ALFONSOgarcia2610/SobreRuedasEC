import { Card } from "@/components/ui/card";
import { ShinyButton } from "@/components/ui/shiny-button";

export function PreciosBoletos() {
    const paquetes = [
        {
            numeros: 6,
            precio: 9,
            popular: false
        },
        {
            numeros: 8,
            precio: 12,
            popular: false
        },
        {
            numeros: 10,
            precio: 15,
            popular: true,
            badge: "★ Más Vendido ★"
        },
        {
            numeros: 20,
            precio: 30,
            popular: false
        },
        {
            numeros: 50,
            precio: 75,
            popular: false
        },
        {
            numeros: 100,
            precio: 150,
            popular: false
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Título principal */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                    ¡ADQUIERE TUS NÚMEROS!
                </h2>
            </div>

            {/* Grid de paquetes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paquetes.map((paquete, index) => (
                    <Card
                        key={index}
                        className={`relative p-4 text-center transition-all duration-300 hover:shadow-lg ${paquete.popular
                            ? 'border-2 border-slate-800 shadow-lg transform scale-105'
                            : 'border border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {/* Badge de más vendido */}
                        {paquete.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <div className="bg-slate-800 text-white px-4 py-1 rounded-full text-sm font-bold">
                                    {paquete.badge}
                                </div>
                            </div>
                        )}

                        {/* Cantidad de números */}
                        <div className="">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                                X{paquete.numeros} NÚMEROS
                            </h3>
                        </div>

                        {/* Precio */}
                        <div className="-mt-5">
                            <div className="text-5xl md:text-6xl font-bold text-slate-800">
                                ${paquete.precio}
                            </div>
                        </div>

                        {/* Botón de acción */}
                        <div className="flex justify-center">
                            <ShinyButton
                                className={`px-8 py-3 text-lg font-bold ${paquete.popular
                                    ? '!bg-amber-200 hover:bg-amber-300'
                                    : '!bg-green-200 hover:bg-green-300'
                                    }`}
                            >
                                REGÍSTRATE Y GANA
                            </ShinyButton>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Información adicional */}
            <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="text-xl font-bold text-slate-800 mb-2">
                        💡 ¿Por qué elegir paquetes más grandes?
                    </h4>
                    <p className="text-slate-600 max-w-3xl mx-auto">
                        Entre más números tengas, más oportunidades de ganar. Cada número tiene la misma probabilidad,
                        pero tener más números aumenta tus chances de llevarte el <strong>Chevrolet Cavalier</strong>.
                    </p>
                </div>
            </div>

            {/* Call to action final */}
            <div className="mt-8 text-center">
                <p className="text-lg text-slate-600 mb-4">
                    🎯 <strong>Promoción especial:</strong> El paquete de 10 números es el más popular por su excelente relación precio-valor
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                    <span>✅ Proceso 100% seguro</span>
                    <span>✅ Confirmación inmediata</span>
                    <span>✅ Soporte 24/7</span>
                </div>
            </div>
        </div>
    );
}
