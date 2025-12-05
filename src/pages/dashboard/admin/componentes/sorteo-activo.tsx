import {
  useGetCurrentLottery,
  useGetProductsByLotteryId,
  useGetProgresoSorteo,
} from "@/Services/admin/product.query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  DollarSign,
  Ticket,
  TrendingUp,
  Package,
  Tag,
} from "lucide-react";
import { usuarioStore } from "@/Store/usuario.store";

export default function SorteoActivo() {
  const {
    data: currentLottery,
    isLoading,
    isError,
    error,
  } = useGetCurrentLottery();
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsByLotteryId(currentLottery?.lotteryId);
  const lotteryId = currentLottery?.lotteryId ?? "";
  const progresoSorteo = useGetProgresoSorteo(lotteryId);
  const porcentaje = progresoSorteo.data;
  const userRole = usuarioStore.state.usuario?.userRoleCode;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 border-slate-800">
          <CardHeader>
            <Skeleton className="h-8 w-48 bg-slate-800" />
            <Skeleton className="h-4 w-64 bg-slate-800 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full bg-slate-800" />
            <Skeleton className="h-20 w-full bg-slate-800" />
            <Skeleton className="h-20 w-full bg-slate-800" />
          </CardContent>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-400">
            Error
          </CardTitle>
          <CardDescription className="text-slate-400">
            {error?.message || "No se pudo cargar el sorteo activo"}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!currentLottery) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="inline-flex p-6 bg-slate-800 rounded-full mb-4">
            <Ticket className="w-16 h-16 text-slate-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-300">
            No hay sorteo activo
          </h2>
          <p className="text-slate-400 text-lg">
            Actualmente no hay ningún sorteo en curso.
          </p>
          <p className="text-slate-500 text-sm">
            Crea un nuevo sorteo para comenzar a gestionar ventas y productos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between text-3xl font-bold text-white">
            <div>
              <h1>Sorteo Actual</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Creado:</span>
              <span className="font-medium">
                {new Date(currentLottery.createdAt).toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Número de sorteo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Ticket className="w-8 h-8 text-green-800" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-white">
                    Sorteo #{currentLottery.number}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-green-100 text-green-800 border-green-100"
                  >
                    Activo
                  </Badge>
                </div>
              </div>
            </div>

            {/* Precio del voucher */}
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-800" />
                </div>
                <div>
                  <p className="text-xs text-white uppercase tracking-wide font-bold">
                    Precio Voucher
                  </p>
                  <p className="text-2xl font-bold text-white">
                    ${currentLottery.voucherPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Máximo de tickets solo para ADMIN */}
            {userRole === "ADMIN" && (
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-800" />
                  </div>
                  <div>
                    <p className="text-xs text-white uppercase tracking-wide font-bold">
                      Máx. Tickets
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {(currentLottery.maxTickets + 1).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Barra de progreso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">
                Progreso de ventas
              </span>
              <span className="text-green-400 font-bold">
                {typeof porcentaje === "number" ? porcentaje : 0}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${porcentaje}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Sección de Productos */}

        {/*      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/20 rounded-lg">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              Productos del Sorteo
            </CardTitle>
            <CardDescription className="text-slate-300">
              {isLoadingProducts 
                ? 'Cargando productos...' 
                : products && products.length > 0 
                  ? `${products.length} producto${products.length > 1 ? 's' : ''} disponible${products.length > 1 ? 's' : ''}`
                  : 'No hay productos asociados'
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader> */}

        <CardContent className="mt-2">
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                >
                  <Skeleton className="h-6 w-3/4 bg-slate-700 mb-2" />
                  <Skeleton className="h-4 w-full bg-slate-700 mb-3" />
                  <Skeleton className="h-8 w-1/2 bg-slate-700" />
                </div>
              ))}
            </div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-slate-700 rounded-full mb-4">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <p className="text-slate-400 text-lg">
                No hay productos asociados a este sorteo
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-700 rounded-lg p-5 border border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
                >
                  {/* Header del producto */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
                          {product.code}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                    <Badge
                      variant={product.isCash ? "default" : "secondary"}
                      className={
                        product.isCash
                          ? "bg-green-100 text-green-800 border-green-600"
                          : "bg-purple-100 text-purple-800 border-purple-600"
                      }
                    >
                      {product.isCash ? "Bendecido" : "Principal"}
                    </Badge>
                  </div>
                  {/* Descripción */}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}
