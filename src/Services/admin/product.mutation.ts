import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  lotteryService,
  productService,
  lotteryProductService,
  createEntityFinanceService,
  approveVoucherService,
  rejectVoucherService,
  completeLotteryService,
  cancelLotteryService,
} from "./products.service";
import type {
  CreateLotteryDto,
  CreateProductDto,
  CreateLotteryProductDto,
  CreateEntityFinanceDto,
} from "@/interfaces/product.interface";
import { toast } from "sonner";
import type { AxiosError } from "axios";

/**
 * Función helper para extraer mensajes de error del backend
 * Maneja diferentes formatos de respuesta de error
 */
const getErrorMessage = (error: any): string => {
  // Si el error tiene response.data (respuesta de Axios)
  if (error?.response?.data) {
    const data = error.response.data;

    // Si tiene un array de errores
    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0]; // Retorna el primer error
    }

    // Si tiene un mensaje directo
    if (data.message) {
      return data.message;
    }

    // Si tiene title (algunas APIs usan este formato)
    if (data.title) {
      return data.title;
    }
  }

  // Si el error tiene un mensaje directo
  if (error?.message) {
    return error.message;
  }

  // Mensaje genérico si no se puede extraer información
  return "Ha ocurrido un error inesperado";
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => productService.createProduct(data),
    onSuccess: () => {
      // Invalidar las queries de productos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
      toast.success("Producto creado exitosamente");
    },
    onError: (error: AxiosError) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error("Error en useCreateProduct:", error);
    },
  });
};

export const useCreateLottery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLotteryDto) => lotteryService.createLottery(data),
    onSuccess: () => {
      // Invalidar las queries de sorteos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["get-all-lotteries"] });
      // Invalidar la query de la lotería actual
      queryClient.invalidateQueries({ queryKey: ["current-lottery"] });
      toast.success("Sorteo creado exitosamente");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error("Error en useCreateLottery:", error);
    },
  });
};

export const useCreateLotteryProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLotteryProductDto) =>
      lotteryProductService.createLotteryProduct(data),
    onSuccess: () => {
      // Invalidar múltiples queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["lotteryProducts"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-lotteries"] });
      toast.success("Producto activado en el sorteo exitosamente");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error("Error en useCreateLotteryProduct:", error);
    },
  });
};

export const useLotteryProducts = () => {
  return useQuery({
    queryKey: ["lotteryProducts"],
    queryFn: lotteryProductService.getLotteryProducts,
  });
};

export const useLotteryProductById = (id: string) => {
  return useQuery({
    queryKey: ["lotteryProduct", id],
    queryFn: () => lotteryProductService.getLotteryProductById(id),
    enabled: !!id,
  });
};

// ==================== ENTITY FINANCE MUTATIONS ====================

/**
 * Hook para crear una cuenta financiera
 * Invalida la lista de cuentas financieras después de crear una nueva
 */
export const useCreateEntityFinance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEntityFinanceDto) =>
      createEntityFinanceService(data),
    onSuccess: () => {
      // Invalidar la query de cuentas financieras
      queryClient.invalidateQueries({ queryKey: ["get-all-entity-finances"] });
      toast.success("Cuenta financiera creada exitosamente");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error("Error al crear cuenta financiera:", error);
    },
  });
};

// ==================== VOUCHER MUTATIONS ====================

/**
 * Hook para aprobar un voucher
 * Invalida la lista de vouchers después de aprobar
 */
export const useApproveVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveVoucherService(id),
    onSuccess: () => {
      // Invalidar queries relacionadas con vouchers
      queryClient.invalidateQueries({
        queryKey: ["voucher-entity-finance"],
      });
      toast.success("Voucher aprobado exitosamente");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error("Error al aprobar voucher:", error);
    },
  });
};

/**
 * Hook para rechazar un voucher
 * Invalida la lista de vouchers después de rechazar
 */
export const useRejectVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rejectVoucherService(id),
    onSuccess: () => {
      // Invalidar queries relacionadas con vouchers
      queryClient.invalidateQueries({
        queryKey: ["voucher-entity-finance"],
      });
      toast.success("Voucher rechazado exitosamente");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error("Error al rechazar voucher:", error);
    },
  });
};

// ==================== LOTTERY COMPLETE MUTATIONS ====================

/**
 * Hook para completar un sorteo
 * Invalida las queries de sorteos después de completar
 */
export const useCompleteLottery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lotteryId: string) => completeLotteryService(lotteryId),
    onSuccess: () => {
      // Invalidar queries relacionadas con sorteos
      queryClient.invalidateQueries({ queryKey: ["get-all-lotteries"] });
      queryClient.invalidateQueries({ queryKey: ["current-lottery"] });
      queryClient.invalidateQueries({ queryKey: ["sorteo-progreso"] });
      queryClient.invalidateQueries({ queryKey: ["sorteo-progreso-faltante"] });
      toast.success("Sorteo completado exitosamente", {
        description: "El sorteo ha sido marcado como completo",
      });
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      toast.error("Error al completar sorteo", {
        description: errorMessage,
      });
      console.error("Error al completar sorteo:", error);
    },
  });
};

/**
 * Hook para cancelar un sorteo
 * Invalida las queries de sorteos después de cancelar
 */
export const useCancelLottery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lotteryId: string) => cancelLotteryService(lotteryId),
    onSuccess: () => {
      // Invalidar queries relacionadas con sorteos
      queryClient.invalidateQueries({ queryKey: ["get-all-lotteries"] });
      queryClient.invalidateQueries({ queryKey: ["current-lottery"] });
      toast.success("Sorteo cancelado exitosamente", {
        description: "El sorteo ha sido marcado como cancelado",
      });
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      toast.error("Error al cancelar sorteo", {
        description: errorMessage,
      });
      console.error("Error al cancelar sorteo:", error);
    },
  });
};
