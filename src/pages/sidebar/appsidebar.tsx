"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./navMain"
import { NavSecondary } from "./navSecundary"
import { NavUser } from "./navUser"
import { useSorteoCarros } from "../services/landing.query"
import { useStore } from "@tanstack/react-store"
import { usuarioStore } from "@/Store/usuario.store"
import { getRoleConfig, type UserRole } from "@/config/roles.config"

// Exportar el porcentaje para usarlo en otros componentes
export function useSorteoPercentage() {
  const dataSorteo = useSorteoCarros();
  const totalBoletos = dataSorteo.data?.TotalBoletos || 1000;
  const boletosVendidos = dataSorteo.data?.BoletosVendidos || 0;
  return Math.round((boletosVendidos / totalBoletos) * 100);
}

/**
 * Mapea el código de rol de la API al tipo UserRole
 */
const mapRoleCodeToUserRole = (roleCode: string): UserRole => {
  const roleMap: Record<string, UserRole> = {
    'ADMIN': 'ADMIN',
    'USER': 'USER',
    'USUARIO': 'USER', // Alias para compatibilidad
  }
  
  const mappedRole = roleMap[roleCode.toUpperCase()]
  
  return mappedRole || 'USER'
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const usuario = useStore(usuarioStore, (state) => state.usuario)

  // Si no hay usuario, no mostrar sidebar
  if (!usuario) {
    return null
  }
  // Obtener el rol del usuario desde el store y mapearlo
  const userRole = mapRoleCodeToUserRole(usuario.userRoleCode)
  const roleConfig = getRoleConfig(userRole)


  // Crear nombre completo
  const nombreCompleto = `${usuario.firstName} ${usuario.lastName}`

  // Generar iniciales para el avatar
  const iniciales = `${usuario.firstName.charAt(0)}${usuario.lastName.charAt(0)}`.toUpperCase()

  return (
    <Sidebar variant="inset" {...props} className="bg-slate-800 border-slate-800">
      <SidebarHeader className="bg-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-slate-800/50">
              <a href="#">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center">
                    <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">SobreRuedas</h1>
                    <p className="text-xs text-slate-300">Entregado Sueños</p>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
    
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-slate-800">
        <NavMain items={roleConfig.navMain} userRole={userRole} />
        <NavSecondary items={roleConfig.navSecondary.filter((item): item is typeof item & { url: string } => item.url !== undefined)} />
      </SidebarContent>
      <SidebarFooter className="bg-slate-800 border-t border-slate-700">
        <NavUser
          user={{
            name: nombreCompleto,
            email: usuario.email,
            avatar: `/api/placeholder/40/40?text=${iniciales}`
          }}
          userRole={userRole}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
