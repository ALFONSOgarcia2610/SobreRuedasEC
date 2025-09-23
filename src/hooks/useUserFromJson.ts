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
    // Verificar si hay una sesión válida
    const hasValidSession = localStorage.getItem('userSession') !== 'logged_out'
    
    if (!hasValidSession) {
      setCurrentUser(null)
      setIsLoading(false)
      return
    }

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

  // Función para hacer logout
  const logout = () => {
    localStorage.setItem('userSession', 'logged_out')
    setCurrentUser(null)
  }

  // Función para hacer login (restaurar sesión)
  const login = async () => {
    localStorage.removeItem('userSession')
    setIsLoading(true)
    
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
    reloadUser,
    logout,
    login
  }
}
