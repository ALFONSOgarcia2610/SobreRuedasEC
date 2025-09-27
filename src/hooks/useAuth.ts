import { useState } from 'react'
import { type UserRole } from '@/config/roles.config'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
}

// Simulación de usuarios para testing
const mockUsers: Record<string, User> = {
  'super-admin': {
    id: '1',
    name: 'Alfonso García',
    email: 'alfonso@sobreruedas.ec',
    avatar: '/avatars/super-admin.jpg',
    role: 'super-admin'
  },
  'admin': {
    id: '2',
    name: 'María González',
    email: 'maria@sobreruedas.ec',
    avatar: '/avatars/admin.jpg',
    role: 'admin'
  },
  'distribuidor': {
    id: '3',
    name: 'Carlos Mendoza',
    email: 'carlos@sobreruedas.ec',
    avatar: '/avatars/distribuidor.jpg',
    role: 'distribuidor'
  },
  'usuario': {
    id: '4',
    name: 'Ana López',
    email: 'ana@gmail.com',
    avatar: '/avatars/usuario.jpg',
    role: 'usuario'
  }
}

export function useAuth() {
  // Por defecto, simular un usuario admin
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers.admin)
  const [isLoading, setIsLoading] = useState(false)

  // Función para cambiar de usuario (para testing)
  const switchUser = (roleKey: keyof typeof mockUsers) => {
    setCurrentUser(mockUsers[roleKey])
  }

  // Función para login
  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    // Simulación de login
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Lógica simple de login basada en email
    const user = Object.values(mockUsers).find(u => u.email === email)
    if (user) {
      setCurrentUser(user)
    }
    setIsLoading(false)
    return user !== undefined
  }

  // Función para logout
  const logout = () => {
    setCurrentUser(null)
  }

  return {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    switchUser // Solo para testing
  }
}

// Hook para obtener solo la información del usuario actual
export function useCurrentUser() {
  const { currentUser } = useAuth()
  return currentUser
}
