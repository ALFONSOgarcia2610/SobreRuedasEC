import { useQuery } from "@tanstack/react-query";
import { getAllEntityFinanceService, getAllTicketsByVoucherService, getAllVoucherbyUserService, type Ticket, type Voucher } from "./usercompra.service";

// Hook para obtener todos los vouchers por usuario
export const useGetAllVouchersByUser = () => {
  return useQuery<Voucher[], Error>({
    queryKey: ['get-all-vouchers-by-user'],
    queryFn: getAllVoucherbyUserService,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });
};

//hook para obtener tickets por voucher
export const useGetAllTicketsByVoucher = (voucherId: string | undefined) => {
  return useQuery<Ticket[], Error>({
    queryKey: ['voucher-tickets', voucherId],
    queryFn: () => getAllTicketsByVoucherService(voucherId ?? '' ),
    enabled: !!voucherId,
  });
};

//hook para obtener nombre entidades financieras por id de voucher
export const useGetAllEntityFinanceByVoucher = (id: string | undefined) => {
  return useQuery<string[], Error>({
    queryKey: ['voucher-entity-finance', id],
    queryFn: () => getAllEntityFinanceService(id ?? '' ),
    enabled: !!id,
  });
};