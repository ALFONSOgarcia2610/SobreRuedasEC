"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { type UserRole, getRoleConfig } from "@/config/roles.config"

export function NavUser({
  user,
  userRole = 'usuario',
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
  userRole?: UserRole
}) {
  const { isMobile } = useSidebar()
  const roleConfig = getRoleConfig(userRole)
  const RoleIcon = roleConfig.icon

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-slate-800/50 data-[state=open]:text-white hover:bg-slate-800/50 text-slate-200 hover:text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg border-2 border-blue-500/30">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-white">{user.name}</span>
                <div className="flex items-center gap-1">
                  <RoleIcon className={`w-3 h-3 ${roleConfig.color}`} />
                  <span className={`truncate text-xs font-medium ${roleConfig.color}`}>
                    {roleConfig.label}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-slate-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-[#020617] border-slate-700"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border-2 border-blue-500/30">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-white">{user.name}</span>
                  <div className="flex items-center gap-1">
                    <RoleIcon className={`w-3 h-3 ${roleConfig.color}`} />
                    <span className={`truncate text-xs ${roleConfig.color}`}>
                      {roleConfig.label}
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />

            <DropdownMenuGroup>
              {userRole === 'super-admin' && (
                <>
                  <DropdownMenuItem className="hover:bg-slate-800/50 text-slate-200 hover:text-white cursor-pointer">
                    <Sparkles />
                    Panel Super Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-800/50 text-slate-200 hover:text-white cursor-pointer">
                    <BadgeCheck />
                    Configuración Sistema
                  </DropdownMenuItem>
                </>
              )}

              {(userRole === 'admin' || userRole === 'super-admin') && (
                <DropdownMenuItem className="hover:bg-slate-800/50 text-slate-200 hover:text-white cursor-pointer">
                  <BadgeCheck />
                  Panel Administrador
                </DropdownMenuItem>
              )}

              {userRole === 'distribuidor' && (
                <>
                  <DropdownMenuItem className="hover:bg-slate-800/50 text-slate-200 hover:text-white cursor-pointer">
                    <BadgeCheck />
                    Mi Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-800/50 text-slate-200 hover:text-white cursor-pointer">
                    <CreditCard />
                    Mis Comisiones
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-700" />

            <a href="/login">
              <DropdownMenuItem className="hover:bg-red-900/30 text-slate-200 hover:text-red-400 cursor-pointer">
                <LogOut />
                Salir
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
