import { useEffect, useState } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createAppRouter } from './router';
import { authStore } from '@/Store/usuario.store';


export const AppRouter = () => {
  const [router, setRouter] = useState<any>(null);

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
