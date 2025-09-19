import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import imagenesCarrosData from '@/data/imagenesCarros.json';
import sorteoData from '@/data/DatosSorteo.json';

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

// Tipos TypeScript para los datos del sorteo
export interface Sorteo {
  id: number;
  Premio: string;
  precioporboleto: number;
  NumeroSorteo: string;
  TotalBoletos: number;
  EstadoSorteo: string;
  BoletosVendidos: number;
  BoletosPremiados: string[];
  BoletosPremiadosEntregados: string[];
}

export interface SorteoResponse {
  id: number;
  Premio: string;
  precioporboleto: number;
  NumeroSorteo: string;
  TotalBoletos: number;
  EstadoSorteo: string;
  BoletosVendidos: number;
  BoletosPremiados: string[];
  BoletosPremiadosEntregados: string[];
}

// Función que simula obtener los datos del sorteo
const fetchSorteoCarros = async (): Promise<SorteoResponse> => {
  const delay = Math.random() * 800 + 300;
  return new Promise((resolve) => {
    setTimeout(() => {
      // Extraer solo los datos internos, no toda la estructura JSON
      const jsonData = sorteoData as any;
      resolve(jsonData.data as SorteoResponse);
    }, delay);
  });
};

// Hook para obtener los datos del sorteo
export const useSorteoCarros = (): UseQueryResult<SorteoResponse, Error> => {
  return useQuery({
    queryKey: ['sorteo-carros'],
    queryFn: fetchSorteoCarros,
  });
};