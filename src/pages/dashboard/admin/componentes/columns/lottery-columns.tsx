import type { ColumnDef } from "@tanstack/react-table"
import type { Lottery } from "@/interfaces/product.interface"
import { Badge } from "@/components/ui/badge"
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
        <Badge className="bg-green-200 text-green-900 font-bold">
          Activo
        </Badge>
      )
    },
  },
]

