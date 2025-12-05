import { Card } from "@/components/ui/card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Hash,
  Shield,
  ArrowRight,
  Crown,
  DollarSign,
  Ticket,
  AlertCircle,
} from "lucide-react";
import { useGetCurrentLottery, useGetProgresoSorteo } from "@/Services/admin/product.query";
import { PurchaseVerificationDialog } from "./componentes/PurchaseVerificationDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function PreciosBoletosUsuario() {
  const [customQuantity, setCustomQuantity] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    numeros: number;
    precio: number;
  }>({
    numeros: 0,
    precio: 0,
  });

  // Obtener sorteo activo usando el servicio correcto
  const { data: currentLottery, isLoading, isError } = useGetCurrentLottery();

  const lotteryId = currentLottery?.lotteryId ?? "";
  const { data: porcentaje } = useGetProgresoSorteo(lotteryId);
  const sorteoCompletado = typeof porcentaje === "number" && porcentaje >= 100;

  // Precio base por boleto desde el sorteo activo (voucherPrice)
  const precioUnitario = currentLottery?.voucherPrice || 1.5;

  // Abrir dialog con paquete seleccionado
  const handleComprar = (numeros: number, precio: number) => {
    setSelectedPackage({ numeros, precio });
    setIsDialogOpen(true);
  };

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
      descripcion: "Participación básica",
    },
    {
      numeros: 8,
      precio: precioUnitario * 8,
      popular: false,
      descripcion: "Oportunidad estándar",
    },
    {
      numeros: 10,
      precio: precioUnitario * 10,
      popular: true,
      badge: "RECOMENDADO",
      descripcion: "Mejor relación precio-valor",
    },
    {
      numeros: 20,
      precio: precioUnitario * 20,
      popular: false,
      descripcion: "Participación avanzada",
    },
    {
      numeros: 50,
      precio: precioUnitario * 50,
      popular: false,
      descripcion: "Oportunidad premium",
    },
    {
      numeros: 100,
      precio: precioUnitario * 100,
      popular: false,
      descripcion: "Máxima participación",
    },
  ];

  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-slate-950 max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12 md:-mt-5">
        <div className="mb-6">
          <Skeleton className="h-10 w-64 bg-slate-800 mb-2" />
          <Skeleton className="h-6 w-96 bg-slate-800" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-4 bg-slate-800/90 border-slate-700">
              <Skeleton className="h-8 w-16 mx-auto mb-2 bg-slate-700" />
              <Skeleton className="h-4 w-20 mx-auto mb-4 bg-slate-700" />
              <Skeleton className="h-10 w-24 mx-auto mb-2 bg-slate-700" />
              <Skeleton className="h-8 w-full bg-slate-700" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Estado de error
  if (isError || !currentLottery) {
    return (
      <div className=" max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12 md:-mt-5">
        <Card className="bg-slate-900 border-slate-800 p-8">
          <div className="text-center">
            <div className="inline-flex p-4 bg-red-600/20 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No hay sorteo activo
            </h3>
            <p className="text-slate-400">
              Actualmente no hay un sorteo en curso. Por favor, vuelve más
              tarde.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12 md:-mt-15">
      {/* Header con información del sorteo activo */}
      <div className="mb-6 rounded-lg p-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Ticket className="w-6 h-6 text-blue-800" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                Sorteo #{currentLottery.number}
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 border-green-600"
                >
                  Activo
                </Badge>
              </h2>
              <p className="text-white text-sm md:text-base">
                Selecciona la cantidad de boletos que deseas comprar
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-xs text-slate-400 mb-1">Precio por boleto</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-400">
                ${precioUnitario.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de paquetes y calculadora */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Grid de paquetes */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 ">
            {paquetes.map((paquete, index) => (
              <Card
                key={index}
                className={`relative sm:p-3 md:p-4 text-center transition-all duration-300 hover:shadow-xl group p-5 ${
                  paquete.popular
                    ? "border-2 border-amber-400 shadow-lg shadow-amber-400/30 transform scale-105 bg-slate-800/90 backdrop-blur-sm ring-2 ring-amber-400/50"
                    : "border border-gray-600 hover:border-amber-500/50 bg-slate-800/90 backdrop-blur-sm hover:shadow-amber-400/10"
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
                    <Hash
                      size={16}
                      className={`sm:hidden ${
                        paquete.popular ? "text-amber-400" : "text-gray-400"
                      }`}
                    />
                    <Hash
                      size={20}
                      className={`hidden sm:block ${
                        paquete.popular ? "text-amber-400" : "text-gray-400"
                      }`}
                    />
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {paquete.numeros}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-400 md:mb-0 -mb-8">
                    Números
                  </p>
                  <p
                    className={`text-xs font-semibold hidden sm:block ${
                      paquete.popular ? "text-amber-400" : "text-gray-400"
                    }`}
                  >
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

                {/* Botón de acción - Más compacto en móvil */}
                <div className="flex justify-center -mt-10 sm:-mt-5">
                  {sorteoCompletado ? (
                    <button
                      disabled
                      className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-bold w-full bg-gray-600 cursor-not-allowed opacity-50 rounded-md"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <span className="sm:hidden">Agotado</span>
                        <span className="hidden sm:inline">Sorteo Completado</span>
                      </div>
                    </button>
                  ) : (
                    <ShinyButton
                      onClick={() =>
                        handleComprar(paquete.numeros, paquete.precio)
                      }
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-bold group-hover:scale-105 transition-transform duration-300 w-full ${
                        paquete.popular
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg"
                          : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <span className="sm:hidden gap-2">Comprar</span>
                        <span className="hidden sm:inline">Comprar</span>
                        <ArrowRight size={10} className="sm:hidden" />
                        <ArrowRight
                          size={12}
                          className="hidden sm:block md:w-3.5 md:h-3.5"
                        />
                      </div>
                    </ShinyButton>
                  )}
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
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-amber-800" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">
                      Calculadora
                    </h4>
                    <p className="text-xs text-slate-400">Mín. 100 boletos</p>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4 space-y-3">
                {/* Input */}
                <div>
                  <Label
                    htmlFor="cantidad"
                    className="text-xs text-slate-300 mb-1.5 block"
                  >
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
                      <span className="text-sm text-white font-medium">
                        ${precioUnitario.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-400">Cantidad</span>
                      <span className="text-sm text-white font-medium">
                        {parseInt(customQuantity || "0").toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-600/50 flex justify-between items-center">
                      <span className="text-sm text-white font-semibold">
                        Total
                      </span>
                      <span className="text-xl text-amber-400 font-bold">
                        ${customPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Botón */}
                <div>
                  {sorteoCompletado ? (
                    <button
                      disabled
                      className="w-full py-2.5 text-sm font-semibold bg-gray-600 text-white rounded-lg cursor-not-allowed opacity-50"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sorteo Completado</span>
                      </div>
                    </button>
                  ) : customPrice > 0 ? (
                    <ShinyButton
                      onClick={() =>
                        handleComprar(parseInt(customQuantity), customPrice)
                      }
                      className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-lg"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Comprar ahora</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </ShinyButton>
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
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-800" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">
                    Compra Segura
                  </h5>
                  <p className="text-xs text-slate-400">
                    Sorteo certificado. Todas las transacciones son seguras.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog de verificación de compra */}
      <PurchaseVerificationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        numeros={selectedPackage.numeros}
        precio={selectedPackage.precio}
      />
    </div>
  );
}
