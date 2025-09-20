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
import { Link } from "@tanstack/react-router"
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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <div className="flex items-center gap-1">
                  <RoleIcon className={`w-3 h-3 ${roleConfig.color}`} />
                  <span className={`truncate text-xs font-medium ${roleConfig.color}`}>
                    {roleConfig.label}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <div className="flex items-center gap-1">
                    <RoleIcon className={`w-3 h-3 ${roleConfig.color}`} />
                    <span className={`truncate text-xs ${roleConfig.color}`}>
                      {roleConfig.label}
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {userRole === 'super-admin' && (
                <>
                  <DropdownMenuItem>
                    <Sparkles />
                    Panel Super Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Configuración Sistema
                  </DropdownMenuItem>
                </>
              )}

              {(userRole === 'admin' || userRole === 'super-admin') && (
                <DropdownMenuItem>
                  <BadgeCheck />
                  Panel Administrador
                </DropdownMenuItem>
              )}

              {userRole === 'distribuidor' && (
                <>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Mi Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Mis Comisiones
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <Link to="/login">
              <DropdownMenuItem>
                <LogOut />
                Salir
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
