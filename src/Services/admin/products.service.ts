import { envs } from "@/commons/envs";
import type { CreateLotteryDto, CreateProductDto, Lottery, Product, CreateLotteryProductDto, LotteryProduct, CreateEntityFinanceDto, EntityFinance } from "@/interfaces/product.interface";
import { networkClient } from "@/providers/restClient";

export const productService = {
  createProduct: async (data: CreateProductDto): Promise<Product> => {
    const productData = {
      productStateId: data.productStateId || 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      code: String(data.code),
      name: String(data.name),
      description: String(data.description),
      value: Number(data.value),
      isCash: Boolean(data.isCash),
    };

    console.log('📤 Enviando datos de producto:', productData);
    const response = await networkClient.post<any>(`${envs.VITE_API_URL}/api/Product`, productData);
    console.log('✅ Respuesta completa de producto:', response);
    
    // Extraer datos y normalizar el ID
    const apiData = response?.data?.data || response?.data || response;
    const result = {
      ...apiData,
      id: apiData.productId || apiData.id // Normalizar productId -> id
    };
    console.log('📦 Datos normalizados del producto:', result);
    console.log('🆔 ID del producto:', result?.id);
    return result;
  },
};


export const lotteryService = {
  createLottery: async (data: CreateLotteryDto): Promise<Lottery> => {
    const lotteryData = {
      lotteryStateId: data.lotteryStateId || 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
      number: parseInt(String(data.number), 10),
      maxTickets: parseInt(String(data.maxTickets), 10),
      voucherPrice: parseFloat(String(data.voucherPrice)),
    };

    console.log('📤 Enviando datos de sorteo:', lotteryData);
    
    const response = await networkClient.post<any>(`${envs.VITE_API_URL}/api/Lottery`, lotteryData);
    console.log('✅ Respuesta completa de sorteo:', response);
    
    // Extraer datos y normalizar el ID
    const apiData = response?.data?.data || response?.data || response;
    const result = {
      ...apiData,
      id: apiData.lotteryId || apiData.id // Normalizar lotteryId -> id
    };
    console.log('📦 Datos normalizados del sorteo:', result);
    console.log('🆔 ID del sorteo:', result?.id);
    return result;
  },
};


export const lotteryProductService = {
  createLotteryProduct: async (data: CreateLotteryProductDto): Promise<LotteryProduct> => {
    const response = await networkClient.post<LotteryProduct>(`${envs.VITE_API_URL}/api/LotteryProduct`, data);
    return response;
  },

  getLotteryProducts: async (): Promise<LotteryProduct[]> => {
    const response = await networkClient.get<LotteryProduct[]>(`${envs.VITE_API_URL}/api/LotteryProduct`);
    return response;
  },

  getLotteryProductById: async (id: string): Promise<LotteryProduct> => {
    const response = await networkClient.get<LotteryProduct>(`${envs.VITE_API_URL}/api/LotteryProduct/${id}`);
    return response;
  },
};


// Servicio para obtener todos los productos
export const getAllProductsService = async (): Promise<Product[]> => {
  const response = await networkClient.get<{ 
    success: boolean; 
    message: string; 
    data: Product[];
  }>(
    `${envs.VITE_API_URL}/api/Product`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Error al obtener productos');
  }

  return response.data;
};


// Servicio para obtener todos los sorteos
export const getAllLotteriesService = async (): Promise<Lottery[]> => {
  const response = await networkClient.get<{ 
    success: boolean; 
    message: string; 
    data: Lottery[];
  }>(
    `${envs.VITE_API_URL}/api/Lottery`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Error al obtener sorteos');
  }

  return response.data;
};


// Servicio para obtener la lotería activa actual
export const getCurrentLotteryService = async (): Promise<Lottery> => {
  const response = await networkClient.get<{ 
    success: boolean; 
    message: string; 
    data: Lottery;
  }>(
    `${envs.VITE_API_URL}/api/Lottery/current`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Error al obtener la lotería activa');
  }

  return response.data;
};


// Servicio para obtener productos por ID de lotería
export const getProductsByLotteryIdService = async (lotteryId: string): Promise<Product[]> => {
  const response = await networkClient.get<{ 
    success: boolean; 
    message: string; 
    data: Product[];
  }>(
    `${envs.VITE_API_URL}/api/Product/lottery/${lotteryId}?pageNumber=1&pageSize=10`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Error al obtener productos de la lotería');
  }

  return response.data;
};


// ==================== ENTITY FINANCE SERVICES ====================

// Servicio para crear una cuenta financiera
export const createEntityFinanceService = async (data: CreateEntityFinanceDto): Promise<EntityFinance> => {
  const response = await networkClient.post<{
    success: boolean;
    message: string;
    data: EntityFinance;
  }>(
    `${envs.VITE_API_URL}/api/EntityFinance`,
    data
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Error al crear cuenta financiera');
  }

  // Normalizar el ID
  const result = {
    ...response.data,
    id: response.data.entityFinanceId || response.data.id
  };

  return result;
};


// Servicio para obtener todas las cuentas financieras
export const getAllEntityFinancesService = async (): Promise<EntityFinance[]> => {
  const response = await networkClient.get<{ 
    success: boolean; 
    message: string; 
    data: EntityFinance[];
  }>(
    `${envs.VITE_API_URL}/api/EntityFinance?pageNumber=1&pageSize=10`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Error al obtener cuentas financieras');
  }

  return response.data;
};
