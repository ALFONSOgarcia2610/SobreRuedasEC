import { useEffect, useState } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createAppRouter } from './router';
import { authStore } from '@/Store/usuario.store';
import { useSorteoCarros } from '@/pages/services/landing.query';


export const AppRouter = () => {
  const [router, setRouter] = useState<any>(null);
  const DataSorteo = useSorteoCarros();

  // Actualizar el título dinámicamente basado en los datos del sorteo
  useEffect(() => {
    if (DataSorteo.data?.Premio) {
      document.title = `SobreRuedasEc - Sorteo ${DataSorteo.data.Premio}`;
    } else {
      document.title = 'SobreRuedasEc';
    }
  }, [DataSorteo.data]);

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
