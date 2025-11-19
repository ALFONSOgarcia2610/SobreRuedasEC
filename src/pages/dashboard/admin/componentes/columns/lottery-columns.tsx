import type { ColumnDef } from "@tanstack/react-table"
import type { Lottery } from "@/interfaces/product.interface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const lotteryColumns: ColumnDef<Lottery>[] = [
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
    accessorKey: "number",
    header: "Número Sorteo",
    cell: ({ row }) => (
      <div className="font-mono font-bold text-xl text-blue-400">
        #{row.getValue("number")}
      </div>
    ),
  },
  {
    accessorKey: "maxTickets",
    header: "Máx. Tickets",
    cell: ({ row }) => {
      const tickets = parseInt(row.getValue("maxTickets"))
      const formatted = new Intl.NumberFormat("es-EC").format(tickets)

      return (
        <div className="font-semibold text-purple-400">
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "voucherPrice",
    header: "Precio Voucher",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("voucherPrice"))
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-semibold text-green-400">{formatted}</div>
    },
  },
  {
    id: "totalValue",
    header: "Valor Total",
    cell: ({ row }) => {
      const maxTickets = parseInt(row.getValue("maxTickets"))
      const voucherPrice = parseFloat(row.getValue("voucherPrice"))
      const total = maxTickets * voucherPrice
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(total)

      return <div className="font-bold text-green-500">{formatted}</div>
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
  {
    id: "status",
    header: "Estado",
    cell: () => {
      return (
        <Badge className="bg-green-600/20 text-green-400 border-green-600">
          Activo
        </Badge>
      )
    },
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const lottery = row.original

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
              onClick={() => navigator.clipboard.writeText(lottery.lotteryId)}
              className="cursor-pointer text-slate-300 hover:bg-slate-800"
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="cursor-pointer text-blue-400 hover:bg-slate-800">
              <Eye className="mr-2 h-4 w-4" />
              Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-yellow-400 hover:bg-slate-800">
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
export const lotteryMobileColumns: ColumnDef<Lottery>[] = [
  {
    accessorKey: "number",
    header: "Sorteo",
    cell: ({ row }) => (
      <div className="font-mono font-bold text-blue-400">
        #{row.getValue("number")}
      </div>
    ),
  },
  {
    accessorKey: "maxTickets",
    header: "Tickets",
    cell: ({ row }) => {
      const tickets = parseInt(row.getValue("maxTickets"))
      const formatted = new Intl.NumberFormat("es-EC").format(tickets)

      return <div className="font-semibold text-purple-400">{formatted}</div>
    },
  },
  {
    accessorKey: "voucherPrice",
    header: "Precio",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("voucherPrice"))
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-semibold text-green-400">{formatted}</div>
    },
  },
  {
    id: "acciones",
    header: "",
    cell: ({ row }) => {
      const lottery = row.original

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
              onClick={() => navigator.clipboard.writeText(lottery.lotteryId)}
              className="text-slate-300 hover:bg-slate-800"
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-blue-400 hover:bg-slate-800">
              <Eye className="mr-2 h-4 w-4" />
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem className="text-yellow-400 hover:bg-slate-800">
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
