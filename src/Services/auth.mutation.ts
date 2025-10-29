import { useMutation } from '@tanstack/react-query';
import { registerUser, loginService } from './auth.service';
import type { RegisterResponse, RegisterUserDto, LoginDto } from '@/interfaces/usuario/usuario.interface';
import { toast } from 'sonner';

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
        onSuccess: (data) => {
            toast.success('¡Cuenta creada exitosamente!', {
                description: `Bienvenido ${data.data?.firstName} ${data.data?.lastName}`,
                duration: 4000,
            });
        },
        onError: (error) => {
            toast.error('Error en el registro', {
                description: error.message || 'No se pudo completar el registro. Por favor, intenta nuevamente.',
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
                description: error.message || 'Credenciales inválidas. Por favor, verifica tus datos.',
                duration: 5000,
            });
        },
    });
};
