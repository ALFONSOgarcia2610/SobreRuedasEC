import { envs } from '@/commons/envs';
import type { 
  RegisterResponse, 
  RegisterUserDto, 
  LoginDto, 
  LoginResponse 
} from '@/interfaces/usuario/usuario.interface';
import { networkClient } from '@/providers/restClient';
import { usuarioStore, authStore } from '@/Store/usuario.store';

/**
 * Servicio de registro de usuario
 * @param payload - Datos del usuario a registrar
 * @returns Promise con la respuesta del registro
 */
export const registerUser = async (payload: RegisterUserDto): Promise<RegisterResponse> => {
  const response = await networkClient.post<RegisterResponse>(
    envs.VITE_API_URL + '/api/Auth/register',
    payload,
  );

  if (!response) {
    throw new Error('Error en el registro');
  }

  // Si el registro es exitoso, actualizar el store
  if (response.success && response.data) {
    console.log('✅ Usuario registrado:', response.data);
    
    const userData = response.data;
    
    // Actualizar el store del usuario
    usuarioStore.setState((prev) => ({
      ...prev,
      usuario: {
        userId: userData.userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        loginAt: new Date().toISOString(),
      }
    }));

    // Actualizar el estado de autenticación
    authStore.setState((prev) => ({
      ...prev,
      autenticado: true,
    }));
  }

  return response;
};

/**
 * Servicio de login de usuario
 * @param payload - Credenciales del usuario (email y password)
 * @returns Promise con el nombre del usuario
 */
export const loginService = async (payload: LoginDto): Promise<string> => {
  const response = await networkClient.post<LoginResponse>(
    envs.VITE_API_URL + '/api/Auth/login',
    payload,
  );

  if (!response || !response.success || !response.data) {
    throw new Error(response?.message || 'Credenciales inválidas');
  }

  // Actualizar el store del usuario
  usuarioStore.setState((prev) => ({
    ...prev,
    usuario: {
      userId: response.data!.userId,
      email: response.data!.email,
      firstName: response.data!.firstName,
      lastName: response.data!.lastName,
      loginAt: response.data!.loginAt,
    },
  }));

  // Actualizar el estado de autenticación
  authStore.setState((prev) => ({
    ...prev,
    autenticado: true,
  }));

  return `${response.data.firstName} ${response.data.lastName}`;
};

/**
 * Servicio de logout
 */
export const logoutService = async (): Promise<void> => {
  // Limpiar el store del usuario
  usuarioStore.setState({ usuario: null });
  
  // Actualizar el estado de autenticación
  authStore.setState({ autenticado: false });
  
  // Recargar la página
  window.location.reload();
};



