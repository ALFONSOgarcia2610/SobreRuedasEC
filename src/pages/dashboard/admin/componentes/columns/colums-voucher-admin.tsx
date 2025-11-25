/* eslint-disable react-refresh/only-export-components */
import { TicketsDialog } from "@/pages/dashboard/usuario/componentes/TicketsDialog";
import type { Voucher } from "@/Services/user/usercompra.service";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Check, X } from "lucide-react";
import { useState } from "react";
import {
  useApproveVoucher,
  useRejectVoucher,
} from "@/Services/admin/product.mutation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

// Componente separado para las acciones de aprobar/rechazar
export const ActionCell = ({
  voucherId,
  voucherStateId,
  voucherStateNames,
}: {
  voucherId: string;
  voucherStateId?: string;
  voucherStateNames: Record<string, string | undefined>;
}) => {
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const approveVoucher = useApproveVoucher();
  const rejectVoucher = useRejectVoucher();

  const handleApproveConfirm = () => {
    approveVoucher.mutate(voucherId, {
      onSuccess: () => setApproveDialogOpen(false),
    });
  };

  const handleRejectConfirm = () => {
    rejectVoucher.mutate(voucherId, {
      onSuccess: () => setRejectDialogOpen(false),
    });
  };

  // Verificar si el estado es aprobado o rechazado
  const stateName =
    voucherStateId && voucherStateNames[voucherStateId]
      ? voucherStateNames[voucherStateId]?.toLowerCase()
      : "";
  const isProcessed =
    stateName?.includes("aprobado") ||
    stateName?.includes("approved") ||
    stateName?.includes("rechazado") ||
    stateName?.includes("rejected");

  if (isProcessed) {
    return (
      <div className="flex justify-center items-center text-sm text-muted-foreground italic">
        Procesado
      </div>
    );
  }

  return (
    <>
      <TooltipProvider>
        <div className="flex gap-2 justify-center items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 w-9 p-0 rounded-lg bg-green-200 hover:bg-green-300 text-green-900 hover:text-green-900 border border-green-500/30 hover:border-green-500/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => setApproveDialogOpen(true)}
                disabled={approveVoucher.isPending || rejectVoucher.isPending}
              >
                <Check className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Aprobar voucher</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 w-9 p-0 rounded-lg bg-red-200 hover:bg-red-300 text-red-900 hover:text-red-900 border border-red-500/30 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => setRejectDialogOpen(true)}
                disabled={approveVoucher.isPending || rejectVoucher.isPending}
              >
                <X className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rechazar voucher</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Dialog de confirmación para aprobar */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprobar Voucher</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas aprobar este voucher? Esta acción
              actualizará el estado del voucher a aprobado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApproveDialogOpen(false)}
              disabled={approveVoucher.isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApproveConfirm}
              disabled={approveVoucher.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {approveVoucher.isPending ? "Aprobando..." : "Aprobar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para rechazar */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Voucher</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas rechazar este voucher? Esta acción
              actualizará el estado del voucher a rechazado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={rejectVoucher.isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRejectConfirm}
              disabled={rejectVoucher.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {rejectVoucher.isPending ? "Rechazando..." : "Rechazar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const makeVouchersColumns = (
  entityNames: Record<string, string | undefined> = {},
  voucherStateNames: Record<string, string | undefined> = {},
  userNames: Record<string, string | undefined> = {}
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
    accessorKey: "userId",
    header: "Usuario",
    cell: ({ row }) => {
      const id = row.getValue("userId") as string | undefined;
      const display = id && userNames[id] ? userNames[id] : id || "—";
      return (
        <div className="font-medium text-white max-w-[200px] truncate">
          {display}
        </div>
      );
    },
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
        className = "bg-green-200 text-green-800 font-bold";
      } else if (
        stateName.includes("rechazado") ||
        stateName.includes("rejected")
      ) {
        variant = "destructive";
        className = "bg-red-200 text-red-800 font-bold";
      } else if (
        stateName.includes("pendiente") ||
        stateName.includes("pending")
      ) {
        variant = "secondary";
        className = "bg-yellow-200 text-yellow-800 font-bold";
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
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <ActionCell
        voucherId={row.original.voucherId}
        voucherStateId={row.getValue("voucherStateId") as string | undefined}
        voucherStateNames={voucherStateNames}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "verTickets",
    header: "Tickets",
    cell: ({ row }) => <TicketsCell voucherId={row.original.voucherId} />,
    enableSorting: false,
    enableHiding: false,
  },
];
