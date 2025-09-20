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
import { useUserFromJson } from "@/hooks/useUserFromJson"
import { getRoleConfig } from "@/config/roles.config"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser } = useUserFromJson()
  const dataSorteo = useSorteoCarros();
  
  // Trabajar solo con porcentajes - convertir datos a porcentaje
  const totalBoletos = dataSorteo.data?.TotalBoletos || 1000;
  const boletosVendidos = dataSorteo.data?.BoletosVendidos || 0;
  const targetValue = Math.round((boletosVendidos / totalBoletos) * 100); // Porcentaje base

  // Si no hay usuario, usar configuración por defecto
  if (!currentUser) {
    return null
  }

  const roleConfig = getRoleConfig(currentUser.role)

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">SR</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800">SobreRuedas</h1>
                    <p className="text-xs text-slate-500">Entregado Sueños</p>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
            <div className="mt-2 flex items-center !justify-center space-x-6 text-sm ">
              <div className="flex items-center space-x-2">
                <span className="animate-pulse">🔥</span>
                <span className="font-bold text-slate-800">{targetValue}% VENDIDO</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={roleConfig.navMain} userRole={currentUser.role} />
        <NavSecondary items={roleConfig.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={{
            name: currentUser.name,
            email: currentUser.email,
            avatar: currentUser.avatar
          }} 
          userRole={currentUser.role}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
