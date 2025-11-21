import { useMutation } from '@tanstack/react-query';
import { registerUser, loginService } from './auth.service';
import type { RegisterResponse, RegisterUserDto, LoginDto } from '@/interfaces/usuario/usuario.interface';
import { toast } from 'sonner';

// Utilidad para extraer mensajes de error claros
const getErrorMessage = (error: any): string => {
    if (error?.response?.data) {
        const data = error.response.data;
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            return data.errors[0];
        }
        if (data.message) {
            return data.message;
        }
        if (data.title) {
            return data.title;
        }
    }
    if (error?.message) {
        return error.message;
    }
    return 'Ha ocurrido un error inesperado';
};

/**
 * Hook para registrar un nuevo usuario
 * @returns Mutation hook de TanStack Query
 * 
 * @example
 * const registerMutation = useRegisterUser();
 * 
 * const handleSubmit = async (data: RegisterUserDto) => {
 *   registerMutation.mutate(data);
 * };
 */
export const useRegisterUser = () => {
    return useMutation<RegisterResponse, Error, RegisterUserDto>({
        mutationFn: registerUser,
        onSuccess: async (data, variables) => {
            toast.success('¡Cuenta creada exitosamente!', {
                description: `Bienvenido ${data.data?.firstName} ${data.data?.lastName}`,
                duration: 4000,
            });
            // Login automático tras registro exitoso
            if (data.data?.email && variables.password) {
                try {
                    await loginService({
                        email: data.data.email,
                        password: variables.password,
                    });
                } catch (e) {
                    toast.error('Error al iniciar sesión automáticamente', {
                        description: getErrorMessage(e),
                        duration: 5000,
                    });
                }
            }
        },
        onError: (error) => {
            toast.error('Error en el registro', {
                description: getErrorMessage(error) || 'No se pudo completar el registro. Por favor, intenta nuevamente.',
                duration: 5000,
            });
        },
    });
};

/**
 * Hook para iniciar sesión
 * @returns Mutation hook de TanStack Query
 * 
 * @example
 * const loginMutation = useLoginUser();
 * 
 * const handleLogin = async (credentials: LoginDto) => {
 *   loginMutation.mutate(credentials);
 * };
 */
export const useLoginUser = () => {
    return useMutation<string, Error, LoginDto>({
        mutationFn: loginService,
        onSuccess: (userName) => {
            toast.success('¡Inicio de sesión exitoso!', {
                description: `Bienvenido ${userName}`,
                duration: 3000,
            });
        },
        onError: (error) => {
            toast.error('Error al iniciar sesión', {
                description: getErrorMessage(error) || 'Credenciales inválidas. Por favor, verifica tus datos.',
                duration: 5000,
            });
        },
    });
};
