import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createVoucherService,
  createTicketService,
} from "./usercompra.service";
import type { CreateVoucherDto, CreateTicketDto } from "./usercompra.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";

/**
 * Función helper para extraer mensajes de error del backend
 */
const getErrorMessage = (error: any): string => {
  if (error?.response?.data) {
    const data = error.response.data;

    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0];
    }

    if (data.message) {
      return data.message;
    }

    if (data.title) {
      return data.title;
    }
  }

  if (error?.message) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
};

/**
 * Hook para crear un voucher
 */
export const useCreateVoucherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (voucherData: FormData) =>
      createVoucherService(voucherData),
    onSuccess: () => {
      // Invalida las queries relacionadas si las hay
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError: (error: AxiosError) => {
      const errorMessage = getErrorMessage(error);
      toast.error("Error al crear voucher", {
        description: errorMessage,
      });
      console.error("Error en la mutación de crear voucher:", error);
    },
  });
};

/**
 * Hook para crear un ticket
 */
export const useCreateTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketData: CreateTicketDto) =>
      createTicketService(ticketData),
    onSuccess: () => {
      // Invalida las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["lottery"] });
    },
    onError: (error: AxiosError) => {
      const errorMessage = getErrorMessage(error);
      toast.error("Error al crear ticket", {
        description: errorMessage,
      });
      console.error("Error en la mutación de crear ticket:", error);
    },
  });
};
