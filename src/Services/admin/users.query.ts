import { useQuery } from '@tanstack/react-query';
import { getAllUsersService } from './users.service';
import type { getAllUsersResponse } from '@/interfaces/usuario/usuario.interface';

// Hook para obtener todos los usuarios
export const useGetAllUsers = () => {
  return useQuery<getAllUsersResponse[], Error>({
    queryKey: ['get-all-users'],
    queryFn: getAllUsersService,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });
};

