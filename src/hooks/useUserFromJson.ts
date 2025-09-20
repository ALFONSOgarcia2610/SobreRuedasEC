import { useState, useEffect } from 'react'
import { type UserRole } from '@/config/roles.config'
import userConfig from '@/data/user-config.json'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
}

export function useUserFromJson() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga del JSON
    const loadUser = async () => {
      setIsLoading(true)
      
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Cargar usuario del JSON
      const user: User = {
        id: userConfig.currentUser.id,
        name: userConfig.currentUser.name,
        email: userConfig.currentUser.email,
        avatar: userConfig.currentUser.avatar,
        role: userConfig.currentUser.role as UserRole
      }
      
      setCurrentUser(user)
      setIsLoading(false)
    }

    loadUser()
  }, [])

  // Función para recargar el usuario (útil si cambias el JSON)
  const reloadUser = async () => {
    setIsLoading(true)
    
    // Simular recarga
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const user: User = {
      id: userConfig.currentUser.id,
      name: userConfig.currentUser.name,
      email: userConfig.currentUser.email,
      avatar: userConfig.currentUser.avatar,
      role: userConfig.currentUser.role as UserRole
    }
    
    setCurrentUser(user)
    setIsLoading(false)
  }

  return {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    reloadUser
  }
}
