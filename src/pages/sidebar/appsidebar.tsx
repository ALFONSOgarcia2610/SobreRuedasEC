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
import { getRoleConfig } from "@/config/roles.config"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const usuario = useStore(usuarioStore, (state) => state.usuario)
  const dataSorteo = useSorteoCarros();

  // Trabajar solo con porcentajes - convertir datos a porcentaje
  const totalBoletos = dataSorteo.data?.TotalBoletos || 1000;
  const boletosVendidos = dataSorteo.data?.BoletosVendidos || 0;
  const targetValue = Math.round((boletosVendidos / totalBoletos) * 100); // Porcentaje base

  // Si no hay usuario, usar configuración por defecto
  if (!usuario) {
    return null
  }

  // Por ahora usar rol de usuario por defecto, más adelante se puede agregar al User interface
  const roleConfig = getRoleConfig('usuario')

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
            <div className="mt-2 flex items-center !justify-center space-x-6 text-sm ">
              <div className="flex items-center space-x-2">
                <span className="animate-pulse">🔥</span>
                <span className="font-bold text-white">{targetValue}% VENDIDO</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-slate-800">
        <NavMain items={roleConfig.navMain} userRole={'usuario'} />
        <NavSecondary items={roleConfig.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="bg-slate-800 border-t border-slate-700">
        <NavUser
          user={{
            name: nombreCompleto,
            email: usuario.email,
            avatar: `/api/placeholder/40/40?text=${iniciales}`
          }}
          userRole={'usuario'}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
