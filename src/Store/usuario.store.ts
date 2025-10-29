import type { User } from '@/interfaces/usuario/usuario.interface';
import { Store } from '@tanstack/react-store';

export interface UsuarioState {
  usuario: User | null;
}

export const usuarioStore = new Store<UsuarioState>({ usuario: null });

export const authStore = new Store<{ autenticado: boolean }>({
  autenticado: false,
});

/* 
export const cookiesStore = new Store<{ sendToken: boolean }>({
  sendToken: false,
});

 */

/* export const cambiarPasswordModalStore = new Store<{ isOpen: boolean }>({
  isOpen: false,
}); */