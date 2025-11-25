import type { ColumnDef } from "@tanstack/react-table"
import type { Product } from "@/interfaces/product.interface"
import { Badge } from "@/components/ui/badge"

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
      <div className="font-medium max-w-[200px] truncate">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground max-w-[300px] truncate">
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
          className={isCash ? "bg-green-200 text-green-900 font-bold" : "bg-purple-600/20 text-purple-400 border-purple-600"}
        >
          {isCash ? "Principal" : "Bendecido"}
        </Badge>
      )
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

