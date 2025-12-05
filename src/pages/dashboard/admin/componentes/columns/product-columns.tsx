import type { ColumnDef } from "@tanstack/react-table"
import type { Product } from "@/interfaces/product.interface"
import { Badge } from "@/components/ui/badge"
import { useGetProductStateById, useGetTicketByNumber, useGetCurrentLottery, useGetUserOne } from "@/Services/admin/product.query"

import { useState } from "react"
import { Eye, User as UserIcon, Mail, Phone, Hash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Componente para mostrar el estado del producto
function ProductStateCell({ productStateId, productNumber }: { productStateId: string; productNumber?: string }) {
  const { data: productState, isLoading } = useGetProductStateById(productStateId);
  const { data: currentLottery } = useGetCurrentLottery();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Convertir el número del producto a number si existe
  const ticketNumber = productNumber ? parseInt(productNumber) : undefined;
  const lotteryId = currentLottery?.lotteryId;
  
  // Solo hacer la query del ticket si el diálogo está abierto y tenemos los datos necesarios
  const { data: ticketData, isLoading: isLoadingTicket } = useGetTicketByNumber(
    dialogOpen ? ticketNumber : undefined,
    dialogOpen ? lotteryId : undefined
  );
  
  // Obtener información del usuario ganador si tenemos el ticketData
  const { data: userData, isLoading: isLoadingUser } = useGetUserOne(
    dialogOpen && ticketData?.userId ? ticketData.userId : undefined
  );
  
  if (isLoading) {
    return <div className="text-xs text-slate-400">Cargando...</div>;
  }
  
  const estadoNombre = productState?.name?.toLowerCase().trim() || '';
  const isAsignado = estadoNombre === 'asignado';
  
  // Si el estado es "asignado", mostrar botón para ver ganador
  if (isAsignado && productNumber) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDialogOpen(true)}
          className="bg-yellow-500/10 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/20 text-xs sm:text-sm whitespace-nowrap"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
          <span className="hidden sm:inline">Ver Ganador</span>
        </Button>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-yellow-400">
                Ganador del Producto
              </DialogTitle>
            </DialogHeader>
            
            {isLoadingTicket || isLoadingUser ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-slate-400">Cargando información del ganador...</div>
              </div>
            ) : ticketData ? (
              <div className="space-y-4 py-4">
                {/* Número Ganador */}
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">Número Ganador</div>
                  <div className="text-3xl font-bold text-yellow-400 font-mono">
                    {ticketData.number}
                  </div>
                </div>
                
                {/* Información del Usuario Ganador */}
                {userData && (
                  <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-lg p-4 border border-yellow-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <UserIcon className="w-5 h-5 text-yellow-400" />
                      <div className="text-sm font-semibold text-yellow-400">Información del Ganador</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <UserIcon className="w-4 h-4 text-slate-400 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs text-slate-400">Nombre Completo</div>
                          <div className="text-sm font-medium text-white">
                            {userData.firstName} {userData.lastName}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs text-slate-400">Email</div>
                          <div className="text-sm font-medium text-white break-all">
                            {userData.email}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs text-slate-400">Teléfono</div>
                          <div className="text-sm font-medium text-white">
                            {userData.phoneNumber || 'No registrado'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Hash className="w-4 h-4 text-slate-400 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs text-slate-400">Cédula</div>
                          <div className="text-sm font-medium text-white">
                            {userData.identification || 'No registrado'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* IDs del Sistema */}         
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="text-xs text-green-400 font-semibold">
                    ✓ Producto asignado exitosamente
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center py-8">
                <div className="text-red-400">No se encontró información del ganador</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }
  
  // Para otros estados, mostrar badge normal
  return (
    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/50 text-xs whitespace-nowrap">
      {productState?.name || productStateId}
    </Badge>
  );
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "secuencial",
    header: "#",
    cell: ({ row }) => (
      <div className="font-medium text-slate-400">
        {row.getValue("secuencial")}
      </div>
    ),
  },
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => (
      <div className="font-mono font-semibold text-blue-400">
        {row.getValue("code")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium max-w-[120px] sm:max-w-[200px] truncate">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground max-w-[150px] sm:max-w-[300px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"))
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-semibold text-green-400">{formatted}</div>
    },
  },
  {
    accessorKey: "isCash",
    header: "Tipo",
    cell: ({ row }) => {
      const isCash = row.getValue("isCash") as boolean
      return (
        <Badge 
          variant={isCash ? "default" : "secondary"}
          className={isCash ? "bg-purple-600/20 text-purple-400 border-purple-600" : "bg-green-200 text-green-900 font-bold"}
        >
          {isCash ? "Bendecido" : "Principal"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "productStateId",
    header: "Estado",
    cell: ({ row }) => {
      const productStateId = row.getValue("productStateId") as string
      const productNumber = row.original.number
      return <ProductStateCell productStateId={productStateId} productNumber={productNumber} />
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Creación",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString("es-EC", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      )
    },
  },
]

