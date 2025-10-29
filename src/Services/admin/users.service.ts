import { envs } from "@/commons/envs";
import type { getAllUsersResponse } from "@/interfaces/usuario/usuario.interface";
import { networkClient } from "@/providers/restClient";

// Servicio para obtener todos los usuarios
export const getAllUsersService = async (): Promise<getAllUsersResponse[]> => {
  const response = await networkClient.get<{ 
    success: boolean; 
    message: string; 
    data: getAllUsersResponse[];
  }>(
    `${envs.VITE_API_URL}/api/User`
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Error al obtener usuarios');
  }

  return response.data;
};
