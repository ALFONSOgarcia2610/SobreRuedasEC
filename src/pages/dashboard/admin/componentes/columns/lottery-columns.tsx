import type { ColumnDef } from "@tanstack/react-table";
import type { Lottery } from "@/interfaces/product.interface";
import { LotteryActionsCell } from "./LotteryActionsCell";
import { LotteryStatusCell } from "./LotteryStatusCell";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const lotteryColumns: ColumnDef<Lottery>[] = [
  {
    accessorKey: "secuencial",
    header: "#",
    cell: ({ row }: { row: any }) => (
      <div className="font-medium text-slate-400">
        {row.getValue("secuencial")}
      </div>
    ),
  },
  {
    accessorKey: "number",
    header: "Número Sorteo",
    cell: ({ row }: { row: any }) => (
      <div className="font-mono font-bold text-xl text-blue-400">
        #{row.getValue("number")}
      </div>
    ),
  },
  {
    accessorKey: "maxTickets",
    header: "Máx. Tickets",
    cell: ({ row }: { row: any }) => {
      const tickets = parseInt(row.getValue("maxTickets"));
      const formatted = new Intl.NumberFormat("es-EC").format(tickets);

      return <div className="font-semibold text-purple-400">{formatted}</div>;
    },
  },
  {
    accessorKey: "voucherPrice",
    header: "Precio Voucher",
    cell: ({ row }: { row: any }) => {
      const amount = parseFloat(row.getValue("voucherPrice"));
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-semibold text-green-400">{formatted}</div>;
    },
  },
  {
    id: "totalValue",
    header: "Valor Total",
    cell: ({ row }: { row: any }) => {
      const maxTickets = parseInt(row.getValue("maxTickets"));
      const voucherPrice = parseFloat(row.getValue("voucherPrice"));
      const total = maxTickets * voucherPrice;
      const formatted = new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return <div className="font-bold text-green-500">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Creación",
    cell: ({ row }: { row: any }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-sm text-muted-foreground">
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
    accessorKey: "lotteryStateId",
    header: "Estado",
    cell: ({ row }: { row: any }) => {
      const stateId = row.getValue("lotteryStateId");
      return <LotteryStatusCell stateId={stateId} />;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }: { row: any }) => {
      const lottery = row.original;
      return <LotteryActionsCell lottery={lottery} />;
    },
  },
];
