import { useGetAllLotteries, useGetTicketByNumber, useGetUserOne, useGetProductsByLotteryId, useGetCurrentLottery } from '@/Services/admin/product.query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/commons/data-table';
import { productColumns } from './columns/product-columns';
import { lotteryColumns } from './columns/lottery-columns';
import AddProductDialog from './dialogs/AddProductDialog';
import AddLotteryDialog from './dialogs/AddLotteryDialog';
import { useState } from "react";
import { User, Mail, IdCard, Phone, MapPin, Trophy } from "lucide-react";
import { ShinyButton } from '@/components/ui/shiny-button';


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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-green-600 rounded-full" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Productos Registrados ({loadingProducts ? '...' : allProducts.length})
                  </h3>
                </div>
                <AddProductDialog />
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-green-600 rounded-full" />
                  <h3 className="text-xl font-semibold text-foreground">
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
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 text-center">
                <div className="max-w-md mx-auto space-y-6">
                  <TicketGanadorInput />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
export function TicketGanadorInput() {
  const [numero, setNumero] = useState<number | "">("");
  const [consultar, setConsultar] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center gap-3 w-full">
        <input
          type="number"
          min={0}
          placeholder="Ej: 0 o 123"
          value={numero}
          onChange={e => setNumero(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <ShinyButton
          className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-amber-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-amber-500/60 hover:scale-105 border-2 border-yellow-500/70 relative overflow-hidden"
          onClick={() => setConsultar(typeof numero === "number" ? numero : null)}
        >
          <div className="flex items-center space-x-2 relative z-10">
            <span className="text-amber-900 font-bold drop-shadow-xs">¡Descubre Ahora!</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30"></div>
        </ShinyButton>
      </div>
      {typeof consultar === "number" && consultar >= 0 && (
        <Ganador numeroTicket={consultar} />
      )}
    </div>
  );
}

export function Ganador({ numeroTicket }: { numeroTicket: number }) {
  const { data: ticket, isLoading, isError } = useGetTicketByNumber(numeroTicket);
  const { data: usuario, isLoading: loadingUsuario } = useGetUserOne(ticket?.userId);

  if (isLoading) return <div className="text-center py-6">Buscando ganador del sorteo...</div>;
  if (isError || !ticket) return <div className="text-center py-6 text-red-400">No se encontró el ticket o los datos están incompletos.</div>;

  return (
    <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg max-w-md mx-auto mt-6 border border-blue-700 flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Trophy className="w-7 h-7 text-yellow-400" />
        <h2 className="text-2xl font-bold text-blue-400">Ganador del Sorteo</h2>
      </div>
      <div className="mb-2 text-lg text-blue-300 flex items-center gap-2 justify-center">
        <IdCard className="w-5 h-5" />
        Ticket consultado: <span className="font-bold">{numeroTicket}</span>
      </div>
      {ticket.userId && (
        loadingUsuario ? (
          <div className="text-center py-2">Cargando datos del usuario...</div>
        ) : usuario ? (
          <div className="space-y-3 text-left bg-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-blue-200">Nombre:</span>
              <span>{usuario.firstName} {usuario.lastName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-blue-200">Email:</span>
              <span>{usuario.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <IdCard className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-blue-200">Identificación:</span>
              <span>{usuario.identification}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-blue-200">Teléfono:</span>
              <span>{usuario.phoneNumber ?? "No disponible"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-blue-200">Provincia:</span>
              <span>{usuario.province ?? "No disponible"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-blue-200">Canton:</span>
              <span>{usuario.city ?? "No disponible"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-blue-200">Dirección:</span>
              <span>{usuario.address ?? "No disponible"}</span>
            </div>
          </div>
        ) : (
          <div className="text-yellow-400">No se encontraron datos del usuario.</div>
        )
      )}
      {!ticket.userId && (
        <div className="text-yellow-400 mt-2">Este ticket aún no tiene ganador asignado.</div>
      )}
    </div>
  );
}