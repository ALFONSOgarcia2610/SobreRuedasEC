export interface CreateProductDto {
  code: string;
  name: string;
  description: string;
  value: number;
  isCash: boolean;
  lotteryId: string;
}

export interface Product {
  productId: string;
  productStateId: string;
  secuencial: string;
  code: string;
  name: string;
  description: string;
  value: number;
  isCash: boolean;
  createdAt: string;
  updatedAt: string;
  // Alias para compatibilidad
  id?: string;
}

export interface CreateLotteryDto {
  lotteryStateId?: string;
  number: number;
  maxTickets: number;
  voucherPrice: number;
}

export interface Lottery {
  lotteryId: string;
  lotteryStateId: string;
  secuencial: number;
  number: number;
  maxTickets: number;
  voucherPrice: number;
  createdAt: string;
  updatedAt: string;
  // Alias para compatibilidad
  id?: string;
}

export interface CreateLotteryProductDto {
  lotteryId: string;
  productId: string;
}

export interface LotteryProduct {
  id: string;
  lotteryId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntityFinanceDto {
  name: string;
  numberAccount: string;
  identification: string;
  nameOwner: string;
}

export interface EntityFinance {
  entityFinanceId: string;
  secuencial: string;
  name: string;
  numberAccount: string;
  identification: string;
  nameOwner: string;
  createdAt: string;
  updatedAt: string;
  // Alias para compatibilidad
  id?: string;
}
