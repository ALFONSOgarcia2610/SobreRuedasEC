import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import imagenesCarrosData from '@/data/imagenesCarros.json';

// Tipos TypeScript para las imágenes
export interface CarroImagen {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ImagenesResponse {
  status: string;
  data: CarroImagen[];
}

// Función que simula obtener las imágenes de los carros
const fetchImagenesCarros = async (): Promise<ImagenesResponse> => {
  // Simular delay de red
  const delay = Math.random() * 800 + 300;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(imagenesCarrosData as ImagenesResponse);
    }, delay);
  });
};

// Hook para obtener las imágenes de los carros
export const useImagenesCarros = (): UseQueryResult<ImagenesResponse, Error> => {
  return useQuery({
    queryKey: ['imagenes-carros'],
    queryFn: fetchImagenesCarros,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};