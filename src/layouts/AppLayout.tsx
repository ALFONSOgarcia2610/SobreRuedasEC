import { useStore } from "@tanstack/react-store";
import { authStore } from "@/Store/usuario.store";
import { Header } from "@/pages/landing/componentes/header";
import SidebarPage from "@/pages/comunes/sidebarPage";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * Layout principal de la aplicación
 * - Muestra Header si el usuario NO está autenticado
 * - Muestra Sidebar si el usuario SÍ está autenticado
 */
export function AppLayout({ children }: AppLayoutProps) {
  const isAuthenticated = useStore(authStore, (state) => state.autenticado);

  // Si está autenticado, mostrar Sidebar
  if (isAuthenticated) {
    return (
      <SidebarPage>
        {children}
      </SidebarPage>
    );
  }

  // Si NO está autenticado, mostrar Header
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}
