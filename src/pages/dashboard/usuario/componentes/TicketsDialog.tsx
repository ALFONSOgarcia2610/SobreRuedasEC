/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllTicketsByVoucher } from "@/Services/user/usercompra.query";
import { Loader2 } from "lucide-react";

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
      <DialogContent className="max-w-10/12! overflow-y-auto h-10/12! lg:h-8/12! p-0 gap-0 flex flex-col">
        <DialogHeader className="px-4 pt-2 pb-1 shrink-0">
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 content-start items-start px-4 pb-4 flex-1 overflow-y-auto">
              {(queryTickets.data ?? []).map((ticket, idx) => {
                const t = (ticket as any)?.data ? (ticket as any).data : ticket;
                // Formatear el número con ceros a la izquierda
                const ticketNum = String(
                  t.number ?? t.ticketNumber ?? t.numero ?? ""
                ).padStart(padLength, "0");
                // Cambia la validación: si el estado es "AVAILABLE", muestra "Pendiente"
                const noAsignado =
                  t?.ticketStateId === "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e";
                return (
                  <div
                    key={t?.ticketId || idx}
                    className="relative w-full aspect-[4/4] mx-auto transition-all duration-300 hover:scale-105 hover:-rotate-1 mt-3"
                    style={{ maxWidth: "120px" }}
                  >
                    {/* Ticket de lotería con bordes dentados */}
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-lg shadow-2xl overflow-hidden border-2 border-green-600">
                      {/* Decoración de bordes dentados superior */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-green-600 to-green-500 flex justify-around items-center">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className="w-0.5 h-0.5 bg-white rounded-full opacity-60"
                          />
                        ))}
                      </div>

                      {/* Decoración de bordes dentados inferior */}
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-green-600 to-green-500 flex justify-around items-center">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className="w-0.5 h-0.5 bg-white rounded-full opacity-60"
                          />
                        ))}
                      </div>

                      {/* Perforaciones laterales */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col justify-around items-center bg-gradient-to-r from-green-600/20 to-transparent">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 bg-green-600 rounded-full"
                          />
                        ))}
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-1.5 flex flex-col justify-around items-center bg-gradient-to-l from-green-600/20 to-transparent">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 bg-green-600 rounded-full"
                          />
                        ))}
                      </div>

                      {/* Contenido del ticket */}
                      <div className="relative flex flex-col items-center justify-center h-full px-2 py-2 z-10">
                        {/* Número del ticket */}
                        <div className="flex flex-col items-center justify-center w-full">
                          {noAsignado ? (
                            <div className="text-center space-y-2">
                              <div className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-300">
                                PENDIENTE
                              </div>
                              <p className="text-[8px] text-gray-600 leading-tight px-2">
                                Se mostrará el número cuando se apruebe el pago
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white font-black text-2xl px-3 py-1 rounded-lg shadow-lg border border-green-400 tracking-wider transform rotate-[-2deg]">
                                {ticketNum}
                              </div>
                              <div className="flex justify-center gap-0.5 mt-2">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-0.5 h-0.5 bg-green-400 rounded-full"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Patrón de fondo sutil */}
                      <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)",
                            color: "#059669",
                          }}
                        />
                      </div>
                    </div>

                    {/* Sombra del ticket */}
                    <div className="absolute inset-0 bg-green-900/10 blur-xl transform translate-y-2 -z-10 rounded-lg" />
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
