import type { ColumnDef } from "@tanstack/react-table"
import type { EntityFinance } from "@/interfaces/product.interface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, CreditCard, Hash, User } from "lucide-react"
import { toast } from "sonner"

export const entityFinanceColumns: ColumnDef<EntityFinance>[] = [
  {
    accessorKey: "secuencial",
    header: "#",
    cell: ({ row }) => (
      <div className="font-medium text-slate-400">
        {row.index + 1}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Entidad Financiera",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "numberAccount",
    header: "Número de Cuenta",
    cell: ({ row }) => {
      const numberAccount = row.getValue("numberAccount") as string
      
      return (
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-400" />
          <span className="font-mono font-semibold text-green-400">{numberAccount}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-green-600/20"
            onClick={() => {
              navigator.clipboard.writeText(numberAccount)
              toast.success('Número de cuenta copiado')
            }}
          >
            <Copy className="h-3 w-3 text-slate-400" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "identification",
    header: "RUC / Cédula",
    cell: ({ row }) => {
      const identification = row.getValue("identification") as string
      
      return (
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-purple-400" />
          <span className="font-mono text-purple-400">{identification}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-purple-600/20"
            onClick={() => {
              navigator.clipboard.writeText(identification)
              toast.success('Identificación copiada')
            }}
          >
            <Copy className="h-3 w-3 text-slate-400" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "nameOwner",
    header: "Titular",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-slate-400" />
        <span className="text-white">{row.getValue("nameOwner")}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Registro",
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
  {
    id: "status",
    header: "Estado",
    cell: () => {
      return (
        <Badge className="bg-green-200 text-green-900 font-bold">
          Activa
        </Badge>
      )
    },
  },
]

