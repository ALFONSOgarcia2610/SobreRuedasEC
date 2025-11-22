import { envs } from "@/commons/envs";
import { networkClient } from "@/providers/restClient";

export interface CreateVoucherDto {
  entityFinanceId: string;
  entidadEmisora: string;
  referenceNumber: string;
  amount: number;
}

export interface Voucher {
  voucherId: string;
  entityFinanceId: string;
  entidadEmisora: string;
  referenceNumber: string;
  amount: number;
  active: boolean;
  createAt: string;
  updateAt: string;
  userId?: string;
}

export interface CreateTicketDto {
  userId: string;
  voucherId: string;
  lotteryId: string;
}

export interface Ticket {
  success: boolean;
  message: string;
  data: {
    ticketId: string;
    ticketStateId: string;
    userId: string;
    voucherId: string;
    lotteryId: string;
    productId: string | null;
    economical: number;
    number: number;
    paymentId: string | null;
    createAt: string;
    updateAt: string;
  };
  errors: any[];
}

export const createVoucherService = async (
  voucherData: CreateVoucherDto
): Promise<Voucher> => {
  const response = await networkClient.post<{
    success: boolean;
    message: string;
    data: Voucher;
  }>(`${envs.VITE_API_URL}/api/Voucher`, voucherData);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al crear voucher");
  }

  // Normalizar el ID si es necesario
  const result = {
    ...response.data,
    id: response.data.voucherId || response.data.voucherId,
  };

  return result;
};

export const createTicketService = async (
  ticketData: CreateTicketDto
): Promise<Ticket> => {
  const response = await networkClient.post<Ticket>(
    `${envs.VITE_API_URL}/api/Ticket`,
    ticketData
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al crear ticket");
  }

  return response;
};

//Obetener voucher por usuario
// Servicio para obtener todos los vouchers por usuario
export const getAllVoucherbyUserService = async (): Promise<Voucher[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: Voucher[];
  }>(`${envs.VITE_API_URL}/api/Voucher/my-vouchers?pageNumber=1&pageSize=250`);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener vouchers");
  }

  return response.data;
};

// Servicio para obtener tickets por voucher
export const getAllTicketsByVoucherService = async (
  voucherId: string
): Promise<Ticket[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: Ticket[];
  }>(
    `${envs.VITE_API_URL}/api/Ticket/voucher/${voucherId}?pageNumber=1&pageSize=250`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener tickets");
  }

  return response.data;
};

// Servicio para obtener entidades financieras por id
export const getAllEntityFinanceService = async (
  id: string
): Promise<string[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: string[];
  }>(`${envs.VITE_API_URL}/api/EntityFinance/${id}`);

  if (!response || !response.success || !response.data) {
    throw new Error(
      response?.message || "Error al obtener entidades financieras"
    );
  }
  return response.data;
};
