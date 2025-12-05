import { useGetAllLotteries, useGetTicketByNumber, useGetUserOne, useGetProductsByLotteryId, useGetCurrentLottery } from '@/Services/admin/product.query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/commons/data-table';
import { productColumns } from './columns/product-columns';
import { lotteryColumns } from './columns/lottery-columns';
import AddProductDialog from './dialogs/AddProductDialog';
import AddLotteryDialog from './dialogs/AddLotteryDialog';
import GenerateTicketsDialog from './dialogs/GenerateTicketsDialog';
import { useState } from "react";
import { Mail, IdCard, Phone, MapPin, Trophy } from "lucide-react";

export default function CreateProductPage() {
  const { data: currentLottery } = useGetCurrentLottery();
  const lotteryId = currentLottery?.lotteryId ?? "";
  
  // Query para obtener todos los productos y sorteos
  const { data: allProducts = [], isLoading: loadingProducts } = useGetProductsByLotteryId(lotteryId);
  const { data: allLotteries = [], isLoading: loadingLotteries } = useGetAllLotteries();

  return (
    <div className="w-full max-w-full mx-auto">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-foreground">Gestión de Productos y Sorteos</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="productos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="productos" className="data-[state=active]:bg-green-700">
                Productos
              </TabsTrigger>
              <TabsTrigger value="sorteos" className="data-[state=active]:bg-green-700">
                Sorteos
              </TabsTrigger>
              <TabsTrigger value="ganadores" className="data-[state=active]:bg-green-700">
                Ganadores
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: PRODUCTOS */}
            <TabsContent value="productos" className="space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-green-600 rounded-full" />
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Productos Registrados ({loadingProducts ? '...' : allProducts.length})
                  </h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <GenerateTicketsDialog />
                  <AddProductDialog />
                </div>
              </div>

              <DataTable
                columns={productColumns}
                data={allProducts}
                filterConfig={{
                  columnId: 'name',
                  placeholder: 'Buscar por nombre...',
                }}
                selectConfig={{
                  columnId: 'isCash',
                  placeholder: 'Filtrar por tipo...',
                  options: [
                    { label: 'Efectivo', value: 'true' },
                    { label: 'Premio', value: 'false' },
                  ],
                }}
                pageSizeConfig={{
                  defaultValue: 10,
                  options: [5, 10, 20, 50],
                }}
                showColumnToggle={true}
              />
            </TabsContent>

            {/* TAB 2: SORTEOS */}
            <TabsContent value="sorteos" className="space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-green-600 rounded-full" />
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Sorteos Registrados ({loadingLotteries ? '...' : allLotteries.length})
                  </h3>
                </div>
                <AddLotteryDialog />
              </div>

              <DataTable
                columns={lotteryColumns}
                data={allLotteries}
                filterConfig={{
                  columnId: 'number',
                  placeholder: 'Buscar por número...',
                }}
                pageSizeConfig={{
                  defaultValue: 10,
                  options: [5, 10, 20, 50],
                }}
                showColumnToggle={true}
              />
            </TabsContent>
            {/* TAB 3: Ganadores */}
            <TabsContent value="ganadores" className="space-y-6 mt-6">
              <TicketGanadorInput lotteryId={lotteryId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
export function TicketGanadorInput({ lotteryId }: { lotteryId: string }) {
  const [numero, setNumero] = useState<number | "">("");
  const [consultar, setConsultar] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-4xl mx-auto mb-6">
        <input
          type="number"
          min={0}
          placeholder="Ingresa el número de ticket..."
          value={numero}
          onChange={e => setNumero(e.target.value === "" ? "" : Number(e.target.value))}
          className="flex-1 px-4 py-3 text-base rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500"
        />
        <button
          onClick={() => setConsultar(typeof numero === "number" ? numero : null)}
          className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 hover:from-yellow-300 hover:via-amber-400 hover:to-yellow-400 text-amber-950 font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
          <div className="relative flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>Descubre Ganador</span>
          </div>
        </button>
      </div>
      {typeof consultar === "number" && consultar >= 0 && (
        <Ganador numeroTicket={consultar} lotteryId={lotteryId} />
      )}
    </div>
  );
}

export function Ganador({ numeroTicket, lotteryId }: { numeroTicket: number, lotteryId: string }) {
  const { data: ticket, isLoading, isError } = useGetTicketByNumber(numeroTicket, lotteryId);
  const { data: usuario, isLoading: loadingUsuario } = useGetUserOne(ticket?.userId);

  if (isLoading) {
    return (
      <div className="w-full mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center gap-3 text-blue-400">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-400 border-t-transparent"></div>
          <span className="text-base font-medium">Buscando ganador del sorteo...</span>
        </div>
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="w-full mx-auto py-8 px-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center max-w-2xl mx-auto">
          <div className="text-red-400 text-base font-medium">
            ❌ No se encontró el ticket o los datos están incompletos.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header con Trophy y Ticket */}
      <div className="text-center mb-6 space-y-3">
        <div className="inline-flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            ¡Ganador del Sorteo!
          </h2>
          <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" />
        </div>
      </div>

      {ticket.userId ? (
        loadingUsuario ? (
          <div className="text-center py-6 text-blue-300">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-300 border-t-transparent mx-auto mb-2"></div>
            <span className="text-sm">Cargando datos del ganador...</span>
          </div>
        ) : usuario ? (
          <div className="space-y-4">
            {/* Nombre Completo - Destacado */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-xl p-5 md:p-6 text-center shadow-xl transform hover:scale-[1.01] transition-transform max-w-4xl mx-auto">
              <div className="text-xs text-green-100 mb-1 font-medium tracking-wide uppercase">Ganador</div>
              <div className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {usuario.firstName} {usuario.lastName}
              </div>
            </div>

            {/* Grid de Información */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Email */}
              <div className="group flex items-start gap-3 p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-blue-500/50">
                <div className="p-1.5 bg-blue-500/20 rounded-md group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Email</div>
                  <div className="text-white text-sm font-medium break-words">{usuario.email}</div>
                </div>
              </div>

              {/* Identificación */}
              <div className="group flex items-start gap-3 p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-purple-500/50">
                <div className="p-1.5 bg-purple-500/20 rounded-md group-hover:bg-purple-500/30 transition-colors">
                  <IdCard className="w-4 h-4 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Identificación</div>
                  <div className="text-white text-sm font-medium">{usuario.identification}</div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="group flex items-start gap-3 p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-green-500/50">
                <div className="p-1.5 bg-green-500/20 rounded-md group-hover:bg-green-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Teléfono</div>
                  <div className="text-white text-sm font-medium">{usuario.phoneNumber ?? "No disponible"}</div>
                </div>
              </div>

              {/* Provincia */}
              <div className="group flex items-start gap-3 p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-orange-500/50">
                <div className="p-1.5 bg-orange-500/20 rounded-md group-hover:bg-orange-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Provincia</div>
                  <div className="text-white text-sm font-medium">{usuario.province ?? "No disponible"}</div>
                </div>
              </div>

              {/* Cantón */}
              <div className="group flex items-start gap-3 p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-pink-500/50">
                <div className="p-1.5 bg-pink-500/20 rounded-md group-hover:bg-pink-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-pink-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Cantón</div>
                  <div className="text-white text-sm font-medium">{usuario.city ?? "No disponible"}</div>
                </div>
              </div>

              {/* Dirección - Ocupa toda la fila */}
              <div className="group flex items-start gap-3 p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-cyan-500/50 md:col-span-2 lg:col-span-3">
                <div className="p-1.5 bg-cyan-500/20 rounded-md group-hover:bg-cyan-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Dirección Completa</div>
                  <div className="text-white text-sm font-medium break-words">{usuario.address ?? "No disponible"}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl max-w-2xl mx-auto">
            <div className="text-yellow-400 text-base font-medium">
              ⚠️ No se encontraron datos del usuario.
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl max-w-2xl mx-auto">
          <div className="text-yellow-400 text-base font-medium">
            ⏳ Este ticket aún no tiene ganador asignado.
          </div>
        </div>
      )}
    </div>
  );
}