/* eslint-disable react-refresh/only-export-components */
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Image as ImageIcon } from "lucide-react";
import type { Voucher } from "@/Services/user/usercompra.service";
import { getPictureUrlService } from "@/Services/user/usercompra.service";
import { useState } from "react";
import { TicketsDialog } from "./TicketsDialog";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

// Componente para previsualizar imagen del comprobante
export const ImagePreviewCell = ({ pictureId }: { pictureId?: string }) => {
  const [open, setOpen] = useState(false);

  if (!pictureId) {
    return <div className="text-xs text-slate-500">Sin imagen</div>;
  }

  const imageUrl = getPictureUrlService(pictureId);

  return (
    <>
      <button
        className="p-2 rounded hover:bg-blue-600/20 text-blue-200"
        title="Ver comprobante"
        onClick={() => setOpen(true)}
      >
        <ImageIcon className="w-5 h-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">Comprobante de Pago</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center bg-slate-800 rounded-lg p-4">
            <img
              src={imageUrl}
              alt="Comprobante de pago"
              className="max-w-full max-h-[70vh] object-contain rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23666">Imagen no disponible</text></svg>';
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
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
    accessorKey: "pictureId",
    header: "Comprobante",
    cell: ({ row }) => <ImagePreviewCell pictureId={row.getValue("pictureId")} />,
    enableSorting: false,
  },
  {
    id: "verTickets",
    header: "Tickets",
    cell: ({ row }) => <TicketsCell voucherId={row.original.voucherId} />,
    enableSorting: false,
    enableHiding: false,
  },
];
