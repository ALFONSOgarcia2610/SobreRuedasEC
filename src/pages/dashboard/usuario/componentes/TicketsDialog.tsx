import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetAllTicketsByVoucher } from "@/Services/user/usercompra.query";
import { Hash, Loader2, Sparkles, Star } from "lucide-react";

interface TicketsDialogProps {
  open: boolean;
  onClose: () => void;
  voucherId: string;
}

export function TicketsDialog({ open, onClose, voucherId }: TicketsDialogProps) {
  const queryTickets = useGetAllTicketsByVoucher(voucherId);
  console.log(queryTickets);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7/12! overflow-y-auto h-7/12!">
        <DialogHeader>
          <DialogTitle>
            Tickets del Voucher
            <span className="ml-3 text-base font-semibold text-green-400 align-middle">({(queryTickets.data ?? []).length})</span>
          </DialogTitle>
        </DialogHeader>
        {queryTickets.isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          </div>
        ) : queryTickets.isError ? (
          <div className="text-red-500 text-center py-4">Error al cargar tickets.</div>
        ) : queryTickets.data?.length === 0 ? (
          <div className="text-slate-400 text-center py-4">No hay tickets para este voucher.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4 justify-items-start">
              {(queryTickets.data ?? []).map((ticket, idx) => {
                const t = (ticket as any)?.data ? (ticket as any).data : ticket;
                const noAsignado = t?.number === 0;
                return (
                  <div key={t?.ticketId || idx}
                    className={`relative flex flex-col items-center justify-center border-2 border-yellow-200 rounded-[16px] p-2 shadow-lg min-h-[70px] w-full max-w-[120px] mx-auto bg-transparent`}
                    style={{ boxShadow: '0 2px 12px 0 rgba(234,179,8,0.10)' }}
                  >
                  
                    {/* Bordes decorativos tipo ticket */}
                  
                    {/* Logo y estrellas */}
                    <div className="flex flex-col items-center justify-center w-full pt-1 pb-0 z-10">
                      <img src="/public/img/logoSR.png" alt="Logo" className="w-5 h-5 mb-2" />
                      <div className="flex items-center gap-2 mb-0.5">
                        <Star className="w-3 h-3 text-yellow-400" />
                       <Sparkles className="w-3 h-3 text-yellow-400" />
                        <Star className="w-3 h-3 text-yellow-400" />
                      </div>
                    </div>
                    {/* Número o texto */}
                    <span className="text-sm text-white mt-2">
                      {noAsignado ? 'No asignado' : <Hash strokeWidth={1} /> + t.number}
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

/* Agrega este CSS en tu archivo global o en el mismo componente si usas styled-jsx o similar */
// .ticket-style {
//   box-shadow: 0 4px 24px 0 rgba(34,197,94,0.10), 0 1.5px 0 0 #22c55e inset;
//   border-radius: 18px;
//   position: relative;
//   overflow: hidden;
// }
