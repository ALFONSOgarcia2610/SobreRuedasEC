import { envs } from '@/commons/envs';
import type { 
  RegisterResponse, 
  RegisterUserDto, 
  LoginDto, 
  LoginResponse 
} from '@/interfaces/usuario/usuario.interface';
import { networkClient } from '@/providers/restClient';
import { usuarioStore, authStore } from '@/Store/usuario.store';
import Cookies from 'js-cookie';
const getErrorMessage = (error: any): string => {
  // Si el error tiene response.data (respuesta de Axios)
  if (error?.response?.data) {
    const data = error.response.data;
    
    // Si tiene un array de errores
    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0]; // Retorna el primer error
    }
    
    // Si tiene un mensaje directo
    if (data.message) {
      return data.message;
    }
    
    // Si tiene title (algunas APIs usan este formato)
    if (data.title) {
      return data.title;
    }
  }
  
  // Si el error tiene un mensaje directo
  if (error?.message) {
    return error.message;
  }
  
  // Mensaje genérico si no se puede extraer información
  return 'Ha ocurrido un error inesperado';
};
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
    if (userData.token) {
      Cookies.set('auth_token', userData.token, { expires: 0.125 });
    }

    // Actualizar el store del usuario
    usuarioStore.setState((prev) => ({
      ...prev,
      usuario: {
        userId: userData.userId,
        userStateCode: userData.userStateCode,
        userRoleCode: userData.userRoleCode,
        secuencial: userData.secuencial,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        city: userData.city,
        province: userData.province,
        identification: userData.identification,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        sendNotices: userData.sendNotices,
        createdAt: userData.createdAt,
        updateAt: userData.updateAt,
        token: response.data!.token,
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

  try {
    const response = await networkClient.post<LoginResponse>(
      envs.VITE_API_URL + '/api/Auth/login',
      payload,
    );

    if (!response || !response.success || !response.data) {
      throw new Error(response?.message || 'Credenciales inválidas');
    }

    // Guardar el token en las cookies (expira en 7 días)
    if (response.data.token) {
      Cookies.set('auth_token', response.data.token, { expires: 0.125 });
    }

    // Actualizar el store del usuario (se guardará automáticamente en localStorage por la suscripción)
    usuarioStore.setState((prev) => ({
      ...prev,
      usuario: {
        userId: response.data!.userId,
        userStateCode: response.data!.userStateCode,
        userRoleCode: response.data!.userRoleCode,
        secuencial: response.data!.secuencial,
        firstName: response.data!.firstName,
        lastName: response.data!.lastName,
        address: response.data!.address,
        city: response.data!.city,
        province: response.data!.province,
        identification: response.data!.identification,
        phoneNumber: response.data!.phoneNumber,
        email: response.data!.email,
        sendNotices: response.data!.sendNotices,
        createdAt: response.data!.createdAt,
        updateAt: response.data!.updateAt,
        token: response.data!.token,
        loginAt: response.data!.loginAt,
      },
    }));

    // Actualizar el estado de autenticación
    authStore.setState((prev) => ({
      ...prev,
      autenticado: true,
    }));

    return `${response.data.firstName} ${response.data.lastName}`;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }

  // (Eliminado: código duplicado e inválido después del catch)
};

/**
 * Servicio de logout
 */
export const logoutService = async (): Promise<void> => {
  // Eliminar el token de las cookies
  Cookies.remove('auth_token');
  
  // Limpiar el store del usuario
  usuarioStore.setState({ usuario: null });
  
  // Actualizar el estado de autenticación
  authStore.setState({ autenticado: false });
  
  // Recargar la página
  window.location.reload();
};

/**
 * Inicializar sesión desde cookies
 * Verifica si hay un token en las cookies al cargar la app
 * Los datos del usuario se cargan automáticamente desde localStorage por el store
 */
export const initializeAuthFromCookies = (): boolean => {
  const token = Cookies.get('auth_token');
  const currentUser = usuarioStore.state.usuario;
  
  // Si no hay token, limpiar todo
  if (!token) {
    usuarioStore.setState({ usuario: null });
    authStore.setState({ autenticado: false });
    return false;
  }
  
  // Si hay token y hay usuario en el store (cargado desde localStorage)
  if (currentUser && currentUser.token === token) {
    authStore.setState({ autenticado: true });
    return true;
  }
  
  // Si hay token pero no coincide o no hay usuario, limpiar
  if (!currentUser || currentUser.token !== token) {
    Cookies.remove('auth_token');
    usuarioStore.setState({ usuario: null });
    authStore.setState({ autenticado: false });
    return false;
  }
  
  return false;
};



