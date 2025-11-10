import type { User } from '@/interfaces/usuario/usuario.interface';
import { Store } from '@tanstack/react-store';

export interface UsuarioState {
  usuario: User | null;
}

// Función para cargar el estado inicial desde localStorage
const loadInitialState = (): UsuarioState => {
  try {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
      const usuario = JSON.parse(savedUser) as User;
      return { usuario };
    }
  } catch (error) {
    console.error('Error al cargar usuario desde localStorage:', error);
  }
  return { usuario: null };
};

// Crear el store con el estado inicial desde localStorage
export const usuarioStore = new Store<UsuarioState>(loadInitialState());

// Suscribirse a cambios para guardar en localStorage
usuarioStore.subscribe(() => {
  const state = usuarioStore.state;
  try {
    if (state.usuario) {
      localStorage.setItem('user_data', JSON.stringify(state.usuario));
    } else {
      localStorage.removeItem('user_data');
    }
  } catch (error) {
    console.error('Error al guardar usuario en localStorage:', error);
  }
});

// Función para cargar el estado inicial de autenticación
const loadAuthState = (): { autenticado: boolean } => {
  try {
    const savedAuth = localStorage.getItem('auth_state');
    if (savedAuth) {
      return JSON.parse(savedAuth);
    }
  } catch (error) {
    console.error('Error al cargar estado de autenticación:', error);
  }
  return { autenticado: false };
};

export const authStore = new Store<{ autenticado: boolean }>(loadAuthState());

// Suscribirse a cambios para guardar en localStorage
authStore.subscribe(() => {
  const state = authStore.state;
  try {
    localStorage.setItem('auth_state', JSON.stringify(state));
  } catch (error) {
    console.error('Error al guardar estado de autenticación:', error);
  }
});

/* 
export const cookiesStore = new Store<{ sendToken: boolean }>({
  sendToken: false,
});

 */

/* export const cambiarPasswordModalStore = new Store<{ isOpen: boolean }>({
  isOpen: false,
}); */