import { envs } from "@/commons/envs";
import type {
  CreateLotteryDto,
  CreateProductDto,
  Lottery,
  Product,
  CreateLotteryProductDto,
  LotteryProduct,
  CreateEntityFinanceDto,
  EntityFinance,
} from "@/interfaces/product.interface";
import { networkClient } from "@/providers/restClient";
import type { TicketGanador, Voucher } from "../user/usercompra.service";
export interface DataState {
  data: number;
}
export const productService = {
  createProduct: async (data: CreateProductDto): Promise<Product> => {
    const productData = {
      code: String(data.code),
      name: String(data.name),
      description: String(data.description),
      value: Number(data.value),
      isCash: Boolean(data.isCash),
      lotteryId: String(data.lotteryId),
    };
    const response = await networkClient.post<any>(
      `${envs.VITE_API_URL}/api/Product`,
      productData
    );
    // Extraer datos y normalizar el ID
    const apiData = response?.data?.data || response?.data || response;
    const result = {
      ...apiData,
      id: apiData.productId || apiData.id, // Normalizar productId -> id
    };
    return result;
  },
};

export const lotteryService = {
  createLottery: async (data: CreateLotteryDto): Promise<Lottery> => {
    const lotteryData = {
      lotteryStateId:
        data.lotteryStateId || "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
      number: parseInt(String(data.number), 10),
      maxTickets: parseInt(String(data.maxTickets), 10),
      voucherPrice: parseFloat(String(data.voucherPrice)),
    };

    const response = await networkClient.post<any>(
      `${envs.VITE_API_URL}/api/Lottery`,
      lotteryData
    );

    // Extraer datos y normalizar el ID
    const apiData = response?.data?.data || response?.data || response;
    const result = {
      ...apiData,
      id: apiData.lotteryId || apiData.id, // Normalizar lotteryId -> id
    };
    return result;
  },
};

export const lotteryProductService = {
  createLotteryProduct: async (
    data: CreateLotteryProductDto
  ): Promise<LotteryProduct> => {
    const response = await networkClient.post<LotteryProduct>(
      `${envs.VITE_API_URL}/api/LotteryProduct`,
      data
    );
    return response;
  },

  getLotteryProducts: async (): Promise<LotteryProduct[]> => {
    const response = await networkClient.get<LotteryProduct[]>(
      `${envs.VITE_API_URL}/api/LotteryProduct`
    );
    return response;
  },

  getLotteryProductById: async (id: string): Promise<LotteryProduct> => {
    const response = await networkClient.get<LotteryProduct>(
      `${envs.VITE_API_URL}/api/LotteryProduct/${id}`
    );
    return response;
  },
};

// Servicio para obtener todos los productos
export const getAllProductsService = async (): Promise<Product[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: Product[];
  }>(`${envs.VITE_API_URL}/api/Product`);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener productos");
  }

  return response.data;
};

// Servicio para obtener todos los sorteos
export const getAllLotteriesService = async (): Promise<Lottery[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: Lottery[];
  }>(`${envs.VITE_API_URL}/api/Lottery`);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener sorteos");
  }

  return response.data;
};

// Servicio para obtener la lotería activa actual
export const getCurrentLotteryService = async (): Promise<Lottery> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: Lottery;
  }>(`${envs.VITE_API_URL}/api/Lottery/current`);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener la lotería activa");
  }

  return response.data;
};

// Servicio para obtener productos por ID de lotería
export const getProductsByLotteryIdService = async (
  lotteryId: string
): Promise<Product[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: Product[];
  }>(
    `${envs.VITE_API_URL}/api/Product/lottery/${lotteryId}?pageNumber=1&pageSize=10`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(
      response?.message || "Error al obtener productos de la lotería"
    );
  }

  return response.data;
};

// ==================== ENTITY FINANCE SERVICES ====================

// Servicio para crear una cuenta financiera
export const createEntityFinanceService = async (
  data: CreateEntityFinanceDto
): Promise<EntityFinance> => {
  const response = await networkClient.post<{
    success: boolean;
    message: string;
    data: EntityFinance;
  }>(`${envs.VITE_API_URL}/api/EntityFinance`, data);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al crear cuenta financiera");
  }

  // Normalizar el ID
  const result = {
    ...response.data,
    id: response.data.entityFinanceId || response.data.id,
  };

  return result;
};

// Servicio para obtener todas las cuentas financieras
export const getAllEntityFinancesService = async (): Promise<
  EntityFinance[]
> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: EntityFinance[];
  }>(`${envs.VITE_API_URL}/api/EntityFinance?pageNumber=1&pageSize=10`);

  if (!response || !response.success || !response.data) {
    throw new Error(
      response?.message || "Error al obtener cuentas financieras"
    );
  }

  return response.data;
};

// Servicio para obtener voucher por sorteo
export const getAllVoucherbyLoterry = async (
  lotteryId: string
): Promise<Voucher[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: Voucher[];
  }>(
    `${envs.VITE_API_URL}/api/Voucher/lottery/${lotteryId}?pageNumber=1&pageSize=250`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener vouchers");
  }
  return response.data;
};

// Servicio para obtener usuario por id
export const getUserID = async (id: string): Promise<User> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: User;
  }>(`${envs.VITE_API_URL}/api/User/${id}`);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener usuario por ID");
  }
  return response.data; // <-- Solo retorna el usuario
};

// Servicio para obtener todos los estados de voucher
import type { VoucherState } from "./product.query";
import type { User } from "@/interfaces/usuario/usuario.interface";
export const getAllVoucherState = async (): Promise<VoucherState[]> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: VoucherState[];
  }>(`${envs.VITE_API_URL}/api/VoucherState`);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener estados de voucher");
  }
  return response.data;
};

// Servicio para aprobar un voucher
export const approveVoucherService = async (id: string): Promise<void> => {
  const response = await networkClient.patch<{
    success: boolean;
    message: string;
  }>(`${envs.VITE_API_URL}/api/Voucher/${id}/approve`, {});

  if (!response || !response.success) {
    throw new Error(response?.message || "Error al aprobar voucher");
  }
};

// Servicio para rechazar un voucher
export const rejectVoucherService = async (id: string): Promise<void> => {
  const response = await networkClient.patch<{
    success: boolean;
    message: string;
  }>(`${envs.VITE_API_URL}/api/Voucher/${id}/reject`, {});

  if (!response || !response.success) {
    throw new Error(response?.message || "Error al rechazar voucher");
  }
};

// Servicio para obtener el progreso del sorteo
export const getProgresoSorteo = async (
  lotteryId: string
): Promise<DataState> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: DataState;
  }>(`${envs.VITE_API_URL}/api/Ticket/lottery/${lotteryId}/occupancy`, {});

  if (!response || !response.success || !response.data) {
    throw new Error(
      response?.message || "Error al obtener progreso del sorteo"
    );
  }

  return response.data;
};

// Servicio para obtener el progreso del sorteo
export const getProgresoSorteoFaltante = async (
  lotteryId: string
): Promise<DataState> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: DataState;
  }>(
    `${envs.VITE_API_URL}/api/Ticket/lottery/${lotteryId}/available-count`,
    {}
  );

  if (!response || !response.success || !response.data) {
    throw new Error(
      response?.message || "Error al obtener progreso del sorteo"
    );
  }

  return response.data;
};

// Servicio para completar un sorteo
export const completeLotteryService = async (
  lotteryId: string
): Promise<void> => {
  const response = await networkClient.patch<{
    success: boolean;
    message: string;
  }>(`${envs.VITE_API_URL}/api/Lottery/${lotteryId}/complete`, {});

  if (!response || !response.success) {
    throw new Error(response?.message || "Error al completar sorteo");
  }
};

// Servicio para cancelar un sorteo
export const cancelLotteryService = async (
  lotteryId: string
): Promise<void> => {
  const response = await networkClient.patch<{
    success: boolean;
    message: string;
  }>(`${envs.VITE_API_URL}/api/Lottery/${lotteryId}/cancel`, {});

  if (!response || !response.success) {
    throw new Error(response?.message || "Error al cancelar sorteo");
  }
};

// Interface para estados de lotería
export interface LotteryState {
  lotteryProductStateId: string;
  secuencial: number;
  code: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Servicio para obtener un estado de lotería por ID
export const getLotteryStateByIdService = async (
  id: string
): Promise<LotteryState> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: LotteryState;
  }>(`${envs.VITE_API_URL}/api/LotteryState/${id}`);

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener estado de lotería");
  }
  return response.data;
};

// Servicio para obtener los datos de un ticket por su número
export const getTicketByNumberService = async (
  number: number
): Promise<TicketGanador> => {
  const response = await networkClient.get<{
    success: boolean;
    message: string;
    data: TicketGanador;
  }>(
    `${envs.VITE_API_URL}/api/Ticket/number/${number}`
  );
  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || "Error al obtener ticket por número");
  }
  return response.data; // <-- Solo retorna el ticket
};
