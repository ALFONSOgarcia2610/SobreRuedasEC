export type UserRole = 'SuperAdmin' | 'Admin' | 'Distribuidor' | 'Usuario'

export interface User {
  name: string
  email: string
  avatar: string
  role: UserRole
}

export interface MenuOption {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

// Definición de menús por rol
export interface RoleMenus {
  SuperAdmin: MenuOption[]
  Admin: MenuOption[]
  Distribuidor: MenuOption[]
  Usuario: MenuOption[]
}
