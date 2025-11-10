"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { type UserRole, getRoleConfig } from "@/config/roles.config"

export function NavMain({
  items,
  userRole,
}: {
  items: {
    title: string
    url?: string  // Ahora es opcional
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  userRole: UserRole
}) {
  const roleConfig = getRoleConfig(userRole)
  const RoleIcon = roleConfig.icon

  return (
    <SidebarGroup>
      <SidebarGroupLabel className=" flex items-center gap-2 text-slate-200">
        <RoleIcon className={`w-4 h-4 ${roleConfig.color}`} />
        <span>{roleConfig.label}</span>
        <div className={`w-2 h-2 rounded-full bg-current ${roleConfig.color} opacity-60`}></div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const [isOpen, setIsOpen] = useState(item.isActive || false)
          
          return (
            <Collapsible 
              key={item.title} 
              open={isOpen} 
              onOpenChange={setIsOpen}
            >
              <SidebarMenuItem>
                {/* Si tiene URL, es un enlace. Si NO tiene URL, es un trigger para el collapsible */}
                {item.url ? (
                  // Menu con URL (navegación directa)
                  <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-slate-800/50 text-slate-200 hover:text-white">
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  // Menu sin URL (solo para desplegar submenús)
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className="hover:bg-slate-800/50 text-slate-200 hover:text-white">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      <ChevronRight className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                )}
                
                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="hover:bg-slate-800/30 text-slate-300 hover:text-white">
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
