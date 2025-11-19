import {
    ShieldCheck,
    Eye,
    UserCheck,
    FileText,
    Gift,
    HelpCircle,
    Target,
    type LucideIcon,
    TicketCheck
} from "lucide-react"

export type UserRole = 'ADMIN' | 'USER' 

export interface MenuItem {
    title: string
    url?: string  // Ahora es opcional
    icon: LucideIcon
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}

export interface RoleConfig {
    role: UserRole
    label: string
    color: string
    icon: LucideIcon
    navMain: MenuItem[]
    navSecondary: MenuItem[]
    permissions: string[]
}

export const roleConfigs: Record<UserRole, RoleConfig> = {
  
    'ADMIN': {
        role: 'ADMIN',
        label: 'Administrador',
        color: 'text-blue-600',
        icon: ShieldCheck,
        permissions: ['sorteos', 'distribuidores', 'usuarios', 'reportes'],
        navMain: [
            {
                title: "Sorteos",
                icon: Target,
                isActive: true,
                items: [
                    { title: "Activo", url: "/sorteos/active" },
                    { title: "Gestion Sorteo", url: "/sorteos/settings" },
                    { title: "Financiero", url: "/sorteos/financial" }
                ]
            },
           /*  {
                title: "Distribuidores",
                icon: Truck,
                items: [
                    { title: "Lista", url: "/distribuidores/list" },
                    { title: "Nuevo Distribuidor", url: "/distribuidores/new" },
                    { title: "Comisiones", url: "/distribuidores/commissions" },
                    { title: "Rendimiento", url: "/distribuidores/performance" }
                ]
            }, */
             {
                title: "Usuarios",
                icon: FileText,
                items: [
                    { title: "Ventas", url: "/usuarios/sales" },
                    { title: "Usuarios", url: "/gestionUsuarios" }
                ]
            },
         
        ],
        navSecondary: [
            { title: "Soporte", url: "/support", icon: HelpCircle }
        ]
    },

    'USER': {
        role: 'USER',
        label: 'Usuario',
        color: 'text-gray-600',
        icon: Eye,
        permissions: ['view-only'],
        navMain: [
            {
                title: "Sorteos",
                icon: Gift,
                isActive: true,
                items: [
                    { title: "Comprar", url: "/usuario/compraSorteo" },
                    { title: "Sorteo Activo", url: "/sorteos/active" },
                    { title: "Boletos", url: "/usuario/boletosComprados" },
                ]
            }
              
        ],
        navSecondary: [
            { title: "Comprar Ahora", url: "/usuario/compraSorteo", icon: TicketCheck },
            { title: "Mi Cuenta", url: "/landing", icon: UserCheck },
            { title: "Ayuda", url: "/help", icon: HelpCircle }
        ]
    }
}

// Función para obtener la configuración basada en el rol
export const getRoleConfig = (role: UserRole): RoleConfig => {
    return roleConfigs[role] || roleConfigs.USER
}

// Función para verificar permisos
export const hasPermission = (userRole: UserRole, permission: string): boolean => {
    const config = getRoleConfig(userRole)
    return config.permissions.includes('*') || config.permissions.includes(permission)
}

// Función para obtener todas las rutas permitidas para un rol
export const getAllowedRoutes = (role: UserRole): string[] => {
    const config = getRoleConfig(role)
    const routes: string[] = []
    
    // Extraer URLs de navMain
    config.navMain.forEach(item => {
        if (item.url) routes.push(item.url)
        if (item.items) {
            item.items.forEach(subItem => routes.push(subItem.url))
        }
    })
    
    // Extraer URLs de navSecondary
    config.navSecondary.forEach(item => {
        if (item.url) routes.push(item.url)
    })
    
    return routes
}

// Función para verificar si un usuario puede acceder a una ruta
export const canAccessRoute = (userRole: UserRole, routePath: string): boolean => {
    const allowedRoutes = getAllowedRoutes(userRole)
    
    // Rutas públicas siempre accesibles
    const publicRoutes = ['/landing', '/login', '/register', '/']
    if (publicRoutes.includes(routePath)) return true
    
    // Rutas comunes para todos los usuarios autenticados
    const commonAuthRoutes = ['/dashboard']
    if (commonAuthRoutes.includes(routePath)) return true
    
    // Verificar si la ruta está en las rutas permitidas del rol
    return allowedRoutes.includes(routePath)
}
