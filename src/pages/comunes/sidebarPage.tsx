
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../sidebar/appsidebar"
import { type ReactNode } from "react"

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface SidebarPageProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  title?: string
  className?: string
}

export default function SidebarPage({ 
  children, 
  breadcrumbs = [], 
  title,
  className = ""
}: SidebarPageProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    
                    return (
                      <div key={index} className="flex items-center">
                        <BreadcrumbItem className={index > 0 ? "hidden md:block" : ""}>
                          {breadcrumb.isActive || isLast ? (
                            <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={breadcrumb.href || "#"}>
                              {breadcrumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </div>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
            {title && !breadcrumbs.length && (
              <div className="font-semibold text-slate-800">{title}</div>
            )}
          </div>
        </header>
        <div className={`flex flex-1 flex-col gap-4 p-4 pt-0 ${className}`}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
