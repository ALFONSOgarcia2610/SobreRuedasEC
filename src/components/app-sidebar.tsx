"use client"

import * as React from "react"
import { useStore } from "@tanstack/react-store"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usuarioStore } from "@/Store/usuario.store"
import { getRoleConfig, type UserRole } from "@/config/roles.config"
import { NavUser } from "@/pages/sidebar/navUser"

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

  // Obtener el rol del usuario desde el store y mapearlo
  const userRole = usuario ? mapRoleCodeToUserRole(usuario.userRoleCode) : 'USER'
  const roleConfig = getRoleConfig(userRole)

  // Crear nombre completo y iniciales si hay usuario
  const nombreCompleto = usuario ? `${usuario.firstName} ${usuario.lastName}` : ''
  const iniciales = usuario 
    ? `${usuario.firstName.charAt(0)}${usuario.lastName.charAt(0)}`.toUpperCase() 
    : 'U'

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center">
                    <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">SobreRuedas</h1>
                    <p className="text-xs">Entregando Sueños</p>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {usuario ? (
          <NavMain items={roleConfig.navMain} />
        ) : (
          <div className="p-4 text-sm text-muted-foreground">
            Cargando...
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        {usuario ? (
          <NavUser
            user={{
              name: nombreCompleto,
              email: usuario.email,
              avatar: `/api/placeholder/40/40?text=${iniciales}`
            }}
            userRole={userRole}
          />
        ) : (
          <div className="p-4 text-sm text-muted-foreground text-center">
            No autenticado
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
