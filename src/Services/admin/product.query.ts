import type { Lottery, Product, EntityFinance } from "@/interfaces/product.interface";
import { useQuery } from "@tanstack/react-query";
import { getAllLotteriesService, getAllProductsService, getCurrentLotteryService, getProductsByLotteryIdService, getAllEntityFinancesService, getAllVoucherbyLoterry, getAllVoucherState } from "./products.service";
import type { Voucher } from "../user/usercompra.service";
// Hook para obtener todos los productos
export const useGetAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['get-all-products'],
    queryFn: getAllProductsService,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });
};


// Hook para obtener todos los sorteos
export const useGetAllLotteries = () => {
  return useQuery<Lottery[], Error>({
    queryKey: ['get-all-lotteries'],
    queryFn: getAllLotteriesService,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });
};


// Hook para obtener la lotería activa actual
export const useGetCurrentLottery = () => {
  return useQuery<Lottery, Error>({
    queryKey: ['current-lottery'],
    queryFn: getCurrentLotteryService,
    staleTime: 1000 * 60 * 2, // 2 minutos (se actualiza más frecuentemente)
    retry: 3,
    refetchOnWindowFocus: true, // Refresca cuando el usuario vuelve a la ventana
  });
};


// Hook para obtener productos por ID de lotería
export const useGetProductsByLotteryId = (lotteryId: string | undefined) => {
  return useQuery<Product[], Error>({
    queryKey: ['lottery-products', lotteryId],
    queryFn: () => {
      if (!lotteryId) {
        throw new Error('Se requiere un ID de lotería');
      }
      return getProductsByLotteryIdService(lotteryId);
    },
    staleTime: 1000 * 60 * 3, // 3 minutos
    retry: 2,
    enabled: !!lotteryId, // Solo ejecuta la query si hay un lotteryId válido
  });
};


// ==================== ENTITY FINANCE QUERIES ====================

// Hook para obtener todas las cuentas financieras
export const useGetAllEntityFinances = () => {
  return useQuery<EntityFinance[], Error>({
    queryKey: ['get-all-entity-finances'],
    queryFn: getAllEntityFinancesService,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });
};

export const useGetAllVoucherByLottery = (lotteryId: string | undefined) => {
  return useQuery<Voucher[], Error>({
    queryKey: ['voucher-entity-finance', lotteryId],
    queryFn: () => getAllVoucherbyLoterry(lotteryId ?? ''),
    enabled: !!lotteryId,
  });
};

// El endpoint devuelve un array de objetos, no strings
export interface VoucherState {
  voucherStateId: string;
  name: string;
  code: string;
  secuencial: number;
  active: boolean;
  createAt: string;
}

export const useGetAllVoucherStates = () => {
  return useQuery<VoucherState[], Error>({
    queryKey: ['voucher-states'],
    queryFn: () => getAllVoucherState(),
  });
};
