/* eslint-disable react-refresh/only-export-components */
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import type { Voucher } from "@/Services/user/usercompra.service";
import { useState } from "react";
import { TicketsDialog } from "./TicketsDialog";
import { Badge } from "@/components/ui/badge";

// Componente separado para la celda de tickets
export const TicketsCell = ({ voucherId }: { voucherId: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="p-2 rounded hover:bg-green-600/20 text-green-200"
        title="Ver tickets"
        onClick={() => setOpen(true)}
      >
        <Eye className="w-5 h-5" />
      </button>
      <TicketsDialog
        open={open}
        onClose={() => setOpen(false)}
        voucherId={voucherId}
      />
    </>
  );
};

export const makeVouchersColumns = (
  entityNames: Record<string, string | undefined> = {},
  voucherStateNames: Record<string, string | undefined> = {}
): ColumnDef<Voucher>[] => [
  {
    accessorKey: "referenceNumber",
    header: "Referencia",
    cell: ({ row }) => (
      <div className="font-medium text-white">
        {row.getValue("referenceNumber")}
      </div>
    ),
  },

  {
    accessorKey: "entityFinanceId",
    header: "Entidad",
    cell: ({ row }) => {
      const id = row.getValue("entityFinanceId") as string | undefined;
      const display = id && entityNames[id] ? entityNames[id] : id || "—";
      return <div className="text-sm  max-w-[300px] truncate">{display}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-semibold text-green-400">{formatted}</div>;
    },
  },
  {
    accessorKey: "voucherStateId",
    header: "Estado",
    cell: ({ row }) => {
      const id = row.getValue("voucherStateId") as string | undefined;
      const display =
        id && voucherStateNames[id] ? voucherStateNames[id] : id || "—";

      // Determinar variante del badge según el estado
      const stateName = display.toLowerCase();
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "outline";
      let className = "";

      if (stateName.includes("aprobado") || stateName.includes("approved")) {
        variant = "default";
        className = "bg-green-200 text-green-800 hover:bg-green-700";
      } else if (
        stateName.includes("rechazado") ||
        stateName.includes("rejected")
      ) {
        variant = "destructive";
        className = "bg-red-200 text-red-800 hover:bg-red-700";
      } else if (
        stateName.includes("pendiente") ||
        stateName.includes("pending")
      ) {
        variant = "secondary";
        className = "bg-yellow-200 text-yellow-800 hover:bg-yellow-700";
      }

      return (
        <Badge variant={variant} className={className}>
          {display}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Creación",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-sm">
          {date.toLocaleDateString("es-EC", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "verTickets",
    header: "Tickets",
    cell: ({ row }) => <TicketsCell voucherId={row.original.voucherId} />,
    enableSorting: false,
    enableHiding: false,
  },
];
