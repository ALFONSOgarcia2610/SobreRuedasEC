import { axiosInstance } from '@/lib/axios-interceptor';

interface GetConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  [key: string]: any; // permite pasar otras opciones como timeout, signal, etc.
}

/**
 * Cliente HTTP para hacer peticiones a la API usando Axios
 */
export const networkClient = {
  /**
   * Realiza una petición GET
   */
  async get<T>(url: string, config?: GetConfig): Promise<T> {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  /**
   * Realiza una petición POST
   */
  async post<T>(url: string, data: any, config?: object): Promise<T> {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  /**
   * Realiza una petición PATCH
   */
  async patch<T>(url: string, data: any, config?: object): Promise<T> {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },

  /**
   * Realiza una petición DELETE
   */
  async delete<T>(url: string, config?: GetConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};

