import { useEffect, useState } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createAppRouter } from './router';
import { authStore } from '@/Store/usuario.store';
import { useGetCurrentLottery, useGetProductsByLotteryId } from '@/Services/admin/product.query';


export const AppRouter = () => {
  const [router, setRouter] = useState<any>(null);
    const { data: currentLottery } = useGetCurrentLottery();
    const { data: products } = useGetProductsByLotteryId(currentLottery?.lotteryId);

    // Concatenar nombres de productos con " & "
    const productosTexto = products && products.length > 0
        ? products.map(p => p.name).join(' & ')
        : 'Premios increíbles';

  // Actualizar el título dinámicamente basado en los datos del sorteo
  useEffect(() => {
    if (productosTexto) {
      document.title = `SobreRuedasEc -  ${productosTexto}`;
    } else {
      document.title = 'SobreRuedasEc';
    }
  }, [productosTexto]);

  useEffect(() => {
    const unsubscribe = authStore.subscribe(async () => {
      const { autenticado } = authStore.state;
      if (autenticado) {
        const newRouter = await createAppRouter();
        setRouter(newRouter);
      } else {
        const cleanRouter = await createAppRouter();
        setRouter(cleanRouter);
      }
    });

    createAppRouter().then(setRouter);

    return () => unsubscribe();
  }, []);

  if (!router) return <div>Cargando rutas...</div>;

  return <RouterProvider router={router} />;
};
