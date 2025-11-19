import type { ColumnDef } from "@tanstack/react-table"
import type { EntityFinance } from "@/interfaces/product.interface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, Copy, Building2, CreditCard, Hash, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
        <Badge className="bg-green-600/20 text-green-400 border-green-600">
          Activa
        </Badge>
      )
    },
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const entity = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
            <DropdownMenuLabel className="text-white">Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(entity.entityFinanceId)
                toast.success('ID copiado')
              }}
              className="cursor-pointer text-slate-300 hover:bg-slate-800"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="cursor-pointer text-blue-400 hover:bg-slate-800">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-slate-800">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Columnas para móvil
export const entityFinanceMobileColumns: ColumnDef<EntityFinance>[] = [
  {
    accessorKey: "name",
    header: "Entidad",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-blue-400" />
        <span className="font-semibold text-white">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "numberAccount",
    header: "Cuenta",
    cell: ({ row }) => (
      <div className="font-mono text-green-400 text-sm">
        {row.getValue("numberAccount")}
      </div>
    ),
  },
  {
    accessorKey: "nameOwner",
    header: "Titular",
    cell: ({ row }) => (
      <div className="text-white text-sm">
        {row.getValue("nameOwner")}
      </div>
    ),
  },
  {
    id: "acciones",
    header: "",
    cell: ({ row }) => {
      const entity = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
            <DropdownMenuLabel className="text-white">Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(entity.entityFinanceId)
                toast.success('ID copiado')
              }}
              className="text-slate-300 hover:bg-slate-800"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-blue-400 hover:bg-slate-800">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:bg-slate-800">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
