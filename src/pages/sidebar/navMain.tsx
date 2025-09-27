"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
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
    url: string
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
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-slate-800/50 text-slate-200 hover:text-white">
                <a href={item.url} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90 text-slate-400 hover:text-white">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="hover:bg-slate-800/30 text-slate-300 hover:text-white">
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
