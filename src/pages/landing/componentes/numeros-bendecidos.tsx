"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentLottery, useGetProductsByLotteryId, useGetProductStateById } from "@/Services/admin/product.query";

interface NumerosBendecidosProps {
    className?: string;
    isLoading?: boolean;
}

// Componente para mostrar cada número con su estado
function NumeroBendecido({ productStateId, number }: { productStateId: string; number?: string }) {
    const { data: productState, isLoading, isError } = useGetProductStateById(productStateId);

    if (isLoading) {
        return (
            <div className="text-center p-2 lg:p-3">
                <Skeleton className="h-8 w-20 mx-auto mb-2 bg-slate-700" />
                <Skeleton className="h-5 w-24 mx-auto bg-slate-700" />
            </div>
        );
    }

    // Si no hay productStateId válido o hay error, mostrar como disponible por defecto
    if (!productStateId || isError || !productState) {
        console.log('ProductStateId:', productStateId, 'Error:', isError, 'State:', productState);
        // Por defecto mostrar como disponible si no hay información del estado
        return (
            <div className="text-center p-2 lg:p-3">
                <div className="text-xl sm:text-2xl lg:text-xl font-bold font-mono tracking-wider mb-2 relative">
                    <span className="text-white">
                        {number || 'N/A'}
                    </span>
                </div>
                <div className="">
                    <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2 py-1 rounded">
                        Premio Disponible
                    </span>
                </div>
            </div>
        );
    }

    // Verificar si el estado es "Disponible" (sin tachar)
    const estadoNombre = productState?.name?.toLowerCase().trim() || '';
    const isDisponible = estadoNombre === 'disponible';
    const isAsignado = estadoNombre === 'asignado';

    return (
        <div className="text-center p-2 lg:p-3">
            {/* Número con tachado SOLO si NO está disponible */}
            <div className="text-xl sm:text-2xl lg:text-xl font-bold font-mono tracking-wider mb-2 relative">
                <span className={`${isDisponible ? 'text-white' : 'text-gray-400'}`}>
                    {number || 'N/A'}
                </span>
                {/* Tachar SOLO si NO es disponible */}
                {!isDisponible && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    </div>
                )}
            </div>

            {/* Estado */}
            <div className="">
                {isDisponible ? (
                    <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2 py-1 rounded">
                        Premio Disponible
                    </span>
                ) : isAsignado ? (
                    <span className="text-xs font-bold text-blue-900 bg-blue-200 px-2 py-1 rounded">
                        Asignado
                    </span>
                ) : (
                    <span className="text-xs font-bold text-green-900 bg-green-200 px-2 py-1 rounded">
                        ¡Premio Entregado!
                    </span>
                )}
            </div>
        </div>
    );
}

export function NumerosBendecidos({ className, isLoading = false }: NumerosBendecidosProps) {
    const { data: currentLottery } = useGetCurrentLottery();
    const lotteryId = currentLottery?.lotteryId ?? "";
    const { data: products, isLoading: loadingProducts } = useGetProductsByLotteryId(lotteryId);

    // Filtrar solo productos bendecidos (isCash = true)
    const productosBendecidos = products?.filter(p => p.isCash === true) || [];

    // Skeleton para estado de carga
    if (isLoading || loadingProducts) {
        return (
            <div className={`max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12 ${className}`}>
                {/* Título Skeleton */}
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-64 sm:w-80 mx-auto mb-2 sm:mb-4 bg-slate-700" />
                    <Skeleton className="h-4 sm:h-5 md:h-6 w-80 sm:w-96 mx-auto bg-slate-700" />
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                    {[...Array(10)].map((_, index) => (
                        <Card key={index} className="bg-slate-800 border-slate-700">
                            <CardContent className="p-2 sm:p-3">
                                <div className="text-center">
                                    <Skeleton className="h-6 sm:h-7 w-16 sm:w-20 mx-auto mb-2 bg-slate-700" />
                                    <Skeleton className="h-3 w-12 mx-auto mb-1 bg-slate-700" />
                                    <Skeleton className="h-4 w-8 mx-auto bg-slate-700" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Cards Informativas Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="bg-slate-800 border-slate-700">
                            <CardContent className="p-4 sm:p-6 text-center">
                                <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 bg-slate-700 rounded-full" />
                                <Skeleton className="h-5 sm:h-6 w-24 sm:w-32 mx-auto mb-1 sm:mb-2 bg-slate-700" />
                                <Skeleton className="h-4 w-full mx-auto bg-slate-700" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Estadísticas Skeleton */}
                <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-slate-700/50 rounded-lg p-3 sm:p-4 border border-slate-600">
                                <Skeleton className="h-6 sm:h-8 w-8 sm:w-12 mx-auto mb-2 bg-slate-600" />
                                <Skeleton className="h-3 w-16 sm:w-20 mx-auto bg-slate-600" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12 ${className}`}>
            {/* Título Principal */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
                    Números Premiados
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                    Los siguientes números han sido seleccionados para premios en efectivo. Verifique si su boleto coincide con alguno de estos números:
                </p>
            </div>

            {/* Lista de Números - Una columna en móvil, 5 columnas en pantallas grandes */}
            <div className="max-w-sm mx-auto lg:max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-4 mb-6 sm:mb-8">
                {productosBendecidos.length > 0 ? (
                    productosBendecidos.map((producto) => {
                        console.log('Producto bendecido:', {
                            productId: producto.productId,
                            productStateId: producto.productStateId,
                            number: producto.number,
                            name: producto.name
                        });
                        return (
                            <NumeroBendecido 
                                key={producto.productId}
                                productStateId={producto.productStateId}
                                number={producto.number}
                            />
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-400 text-sm sm:text-base">
                            No hay números bendecidos disponibles en este momento
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}
