import type { ColumnDef } from "@tanstack/react-table"
import {  Eye } from "lucide-react"
import type { Voucher } from "@/Services/user/usercompra.service"
import { useState } from "react"
import { TicketsDialog } from "./TicketsDialog"

export const makeVouchersColumns = (
  entityNames: Record<string, string | undefined> = {},
  voucherStateNames: Record<string, string | undefined> = {}
): ColumnDef<Voucher>[] => [
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
    accessorKey: "referenceNumber",
    header: "Referencia",
    cell: ({ row }) => (
      <div className="font-medium text-slate-400">
        {row.getValue("referenceNumber")}
      </div>
    ),
  },

  {
    accessorKey: "entityFinanceId",
    header: "Entidad",
    cell: ({ row }) => {
      const id = row.getValue("entityFinanceId") as string | undefined;
      const display = (id && entityNames[id]) ? entityNames[id] : id || "—";
      return (
        <div className="text-sm text-muted-foreground max-w-[300px] truncate">
          {display}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-semibold text-green-400">{formatted}</div>
    },
  },
  {
    accessorKey: "voucherStateId",
    header: "Estado",
    cell: ({ row }) => {
      const id = row.getValue("voucherStateId") as string | undefined;
      const display = (id && voucherStateNames[id]) ? voucherStateNames[id] : id || "—";
      return (
        <div className="font-medium max-w-[200px] truncate">
          {display}
        </div>
      );
    },
  },
 
  {
    accessorKey: "createdAt",
    header: "Creación",
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
    id: "verTickets",
    header: "Tickets",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button
            className="p-2 rounded hover:bg-green-600/20 text-green-400"
            title="Ver tickets"
            onClick={() => setOpen(true)}
          >
            <Eye className="w-5 h-5" />
          </button>
          <TicketsDialog
            open={open}
            onClose={() => setOpen(false)}
            voucherId={row.original.voucherId}
          />
        </>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]

// Columnas para móvil (exportadas también)
export const vouchersMobileColumns: ColumnDef<Voucher>[] = [
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
      <div className="font-medium">
        {row.getValue("name")}
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
]
