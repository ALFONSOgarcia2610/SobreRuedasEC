/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllTicketsByVoucher } from "@/Services/user/usercompra.query";
import { Loader2, Sparkles, Star } from "lucide-react";

interface TicketsDialogProps {
  open: boolean;
  onClose: () => void;
  voucherId: string;
}

export function TicketsDialog({
  open,
  onClose,
  voucherId,
}: TicketsDialogProps) {
  const queryTickets = useGetAllTicketsByVoucher(voucherId);
  console.log(queryTickets);

  // Calcular el máximo de dígitos según el ticket más alto
  const ticketsArray = queryTickets.data ?? [];
  const maxTicketNumber = Math.max(
    ...ticketsArray.map((ticket: any) => {
      const t = ticket?.data ? ticket.data : ticket;
      return Number(t.number ?? t.ticketNumber ?? t.numero ?? 0);
    }),
    0
  );
  const padLength = maxTicketNumber > 0 ? String(maxTicketNumber).length : 3;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-10/12! overflow-y-auto h-10/12! lg:h-8/12!">
        <DialogHeader>
          <DialogTitle>
            Tickets del Voucher
            <span className="ml-3 text-base font-semibold text-green-400 align-middle">
              ({(queryTickets.data ?? []).length})
            </span>
          </DialogTitle>
        </DialogHeader>
        {queryTickets.isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          </div>
        ) : queryTickets.isError ? (
          <div className="text-red-500 text-center py-4">
            Error al cargar tickets.
          </div>
        ) : queryTickets.data?.length === 0 ? (
          <div className="text-slate-400 text-center py-4">
            No hay tickets para este voucher.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 py-4 justify-items-start">
              {(queryTickets.data ?? []).map((ticket, idx) => {
                const t = (ticket as any)?.data ? (ticket as any).data : ticket;
                // Formatear el número con ceros a la izquierda
                const ticketNum = String(t.number ?? t.ticketNumber ?? t.numero ?? "").padStart(padLength, "0");
                // Cambia la validación: si el estado es "AVAILABLE", muestra "Pendiente"
                const noAsignado = t?.ticketStateId === "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e";
                return (
                  <div
                    key={t?.ticketId || idx}
                    className="relative flex flex-col items-center justify-center border-2 border-[#353a4d] rounded-[18px] p-3 shadow-xl min-h-[90px] w-full max-w-[130px] mx-auto bg-gradient-to-br from-[#23263a] via-[#2d314d] to-[#353a4d] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{
                      boxShadow:
                        "0 4px 24px 0 rgba(53,58,77,0.18), 0 1.5px 0 0 #353a4d inset",
                    }}
                  >
                    {/* Logo y estrellas pastel */}
                    <div className="flex flex-col items-center justify-center w-full pt-1 pb-0 z-10">
                      <img
                        src="/public/img/logoSR.png"
                        alt="Logo"
                        className="w-6 h-6 mb-2 drop-shadow-[0_1px_2px_rgba(80,80,120,0.7)]"
                      />
                      <div className="flex items-center gap-2 mb-0.5">
                        <Star className="w-3 h-3 text-amber-400" />
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <Star className="w-3 h-3 text-amber-400" />
                      </div>
                    </div>
                    {/* Número o texto */}
                    <span className="text-sm font-semibold mt-2 px-2 py-1 rounded-lg bg-green-200 text-green-800 border shadow-sm">
                      {noAsignado ? (
                        "Pendiente"
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          {ticketNum}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
