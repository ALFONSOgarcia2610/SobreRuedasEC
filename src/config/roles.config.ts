import {
    Shield,
    ShieldCheck,
    Users,
    Eye,
    Settings,
    Database,
    UserCheck,
    Truck,
    BarChart3,
    FileText,
    CreditCard,
    Gift,
    HelpCircle,
    Star,
    Target,
    Wallet,
    TrendingUp,
    type LucideIcon,
    TicketCheck
} from "lucide-react"

export type UserRole = 'super-admin' | 'admin' | 'distribuidor' | 'usuario'

export interface MenuItem {
    title: string
    url: string
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
    'super-admin': {
        role: 'super-admin',
        label: 'Super Admin',
        color: 'text-red-600',
        icon: Shield,
        permissions: ['*'], // Acceso total
        navMain: [
            {
                title: "Sistema",
                url: "/sistema",
                icon: Database,
                items: [
                    { title: "Configuración Global", url: "/sistema/config" },
                    { title: "Base de Datos", url: "/sistema/database" },
                    { title: "Respaldos", url: "/sistema/backups" },
                    { title: "Logs del Sistema", url: "/sistema/logs" }
                ]
            },
            {
                title: "Administradores",
                url: "/admins",
                icon: ShieldCheck,
                items: [
                    { title: "Gestionar Admins", url: "/admins/manage" },
                    { title: "Crear Admin", url: "/admins/create" },
                    { title: "Permisos", url: "/admins/permissions" },
                    { title: "Auditoría", url: "/admins/audit" }
                ]
            },
            {
                title: "Sorteos Globales",
                url: "/sorteos-global",
                icon: Target,
                items: [
                    { title: "Todos los Sorteos", url: "/sorteos/all" },
                    { title: "Crear Sorteo", url: "/sorteos/create" },
                    { title: "Configuración", url: "/sorteos/config" },
                    { title: "Estadísticas", url: "/sorteos/stats" }
                ]
            },
            {
                title: "Distribuidores",
                url: "/distribuidores",
                icon: Truck,
                items: [
                    { title: "Gestionar Distribuidores", url: "/distribuidores/manage" },
                    { title: "Crear Distribuidor", url: "/distribuidores/create" },
                    { title: "Comisiones", url: "/distribuidores/commissions" },
                    { title: "Reportes", url: "/distribuidores/reports" }
                ]
            },
            {
                title: "Usuarios",
                url: "/usuarios",
                icon: Users,
                items: [
                    { title: "Todos los Usuarios", url: "/usuarios/all" },
                    { title: "Participantes", url: "/usuarios/participants" },
                    { title: "Suspendidos", url: "/usuarios/suspended" },
                    { title: "Estadísticas", url: "/usuarios/stats" }
                ]
            },
            {
                title: "Finanzas",
                url: "/finanzas",
                icon: BarChart3,
                items: [
                    { title: "Dashboard Financiero", url: "/finanzas/dashboard" },
                    { title: "Ingresos Totales", url: "/finanzas/income" },
                    { title: "Gastos", url: "/finanzas/expenses" },
                    { title: "Reportes", url: "/finanzas/reports" }
                ]
            }
        ],
        navSecondary: [
            { title: "Configuración Sistema", url: "/settings/system", icon: Settings }
        ]
    },

    'admin': {
        role: 'admin',
        label: 'Administrador',
        color: 'text-blue-600',
        icon: ShieldCheck,
        permissions: ['sorteos', 'distribuidores', 'usuarios', 'reportes'],
        navMain: [
            {
                title: "Sorteos",
                url: "/sorteos",
                icon: Target,
                isActive: true,
                items: [
                    { title: "Activos", url: "/sorteos/active" },
                    { title: "Crear Sorteo", url: "/sorteos/create" },
                    { title: "Configuración", url: "/sorteos/settings" }
                ]
            },
            {
                title: "Distribuidores",
                url: "/distribuidores",
                icon: Truck,
                items: [
                    { title: "Lista", url: "/distribuidores/list" },
                    { title: "Nuevo Distribuidor", url: "/distribuidores/new" },
                    { title: "Comisiones", url: "/distribuidores/commissions" },
                    { title: "Rendimiento", url: "/distribuidores/performance" }
                ]
            },
            {
                title: "Participantes",
                url: "/participantes",
                icon: Users,
                items: [
                    { title: "Todos", url: "/participantes/all" },
                    { title: "Activos", url: "/participantes/active" },
                    { title: "Ganadores", url: "/participantes/winners" },
                    { title: "Estadísticas", url: "/participantes/stats" }
                ]
            },
            {
                title: "Reportes",
                url: "/reportes",
                icon: FileText,
                items: [
                    { title: "Ventas", url: "/reportes/sales" },
                    { title: "Participación", url: "/reportes/participation" }
                ]
            },
            {
                title: "Pagos",
                url: "/pagos",
                icon: CreditCard,
                items: [
                    { title: "Transacciones", url: "/pagos/transactions" },
                    { title: "Pendientes", url: "/pagos/pending" },
                    { title: "Verificación", url: "/pagos/verification" }
                ]
            }
        ],
        navSecondary: [
            { title: "Configuración", url: "/settings", icon: Settings },
            { title: "Soporte", url: "/support", icon: HelpCircle }
        ]
    },

    'distribuidor': {
        role: 'distribuidor',
        label: 'Distribuidor',
        color: 'text-green-600',
        icon: Truck,
        permissions: ['ventas', 'clientes', 'comisiones'],
        navMain: [
            {
                title: "Ventas",
                url: "/ventas",
                icon: TrendingUp,
                items: [
                    { title: "Vender Números", url: "/ventas/sell" },
                    { title: "Mis Ventas", url: "/ventas/my-sales" },
                ]
            },
            {
                title: "Clientes",
                url: "/clientes",
                icon: Users,
                items: [
                    { title: "Mis Clientes", url: "/clientes/my-clients" },
                    { title: "Nuevo Cliente", url: "/clientes/new" }
                ]
            },
            {
                title: "Comisiones",
                url: "/comisiones",
                icon: Wallet,
                items: [
                    { title: "Mis Comisiones", url: "/comisiones/my-commissions" },
                    { title: "Pagos", url: "/comisiones/payments" }
                ]
            },
            {
                title: "Sorteos",
                url: "/sorteos-dist",
                icon: Gift,
                items: [
                    { title: "Sorteos Activos", url: "/sorteos/active" },
                    { title: "Resultados", url: "/sorteos/results" }
                ]
            }
        ],
        navSecondary: [
            { title: "Mi Perfil", url: "/profile", icon: UserCheck }
        ]
    },

    'usuario': {
        role: 'usuario',
        label: 'Usuario',
        color: 'text-gray-600',
        icon: Eye,
        permissions: ['view-only'], // Solo visualización
        navMain: [
            {
                title: "Sorteos",
                url: "/sorteos-view",
                icon: Gift,
                isActive: true,
                items: [
                    { title: "Comprar", url: "/participaciones/my-numbers" },
                    { title: "Sorteos Activos", url: "/sorteos/view-active" },
                    { title: "Ganadores", url: "/sorteos/winners" }
                ]
            },
            {
                title: "Mis Participaciones",
                url: "/participaciones",
                icon: Star,
                items: [

                    { title: "Números Comprados", url: "/participaciones/my-numbers" },
                    { title: "Historial", url: "/participaciones/history" }
                ]
            },
            {
                title: "Información",
                url: "/informacion",
                icon: FileText,
                items: [
                    { title: "Cómo Participar", url: "/info/how-to" },
                    { title: "Términos", url: "/info/terms" },
                    { title: "Contacto", url: "/info/contact" }
                ]
            }
        ],
        navSecondary: [
            { title: "Comprar Ahora", url: "/account", icon: TicketCheck },
            { title: "Mi Cuenta", url: "/account", icon: UserCheck },
            { title: "Ayuda", url: "/help", icon: HelpCircle }
        ]
    }
}

// Función para obtener la configuración basada en el rol
export const getRoleConfig = (role: UserRole): RoleConfig => {
    return roleConfigs[role] || roleConfigs.usuario
}

// Función para verificar permisos
export const hasPermission = (userRole: UserRole, permission: string): boolean => {
    const config = getRoleConfig(userRole)
    return config.permissions.includes('*') || config.permissions.includes(permission)
}
