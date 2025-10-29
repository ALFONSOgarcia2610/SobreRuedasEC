# Servicios de Autenticación

## Estructura

Este módulo sigue el patrón de separación de responsabilidades con TanStack Query:

### 📁 Archivos

- **`auth.service.ts`**: Funciones puras para llamadas a la API
- **`auth.mutation.ts`**: Hooks de TanStack Query (mutations)
- **`.env`**: Variables de entorno

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:5000
```

## 📝 Uso

### Registro de Usuario

#### 1. En el componente

```tsx
import { useRegisterUser } from '@/Services/auth.mutation';

function RegistroForm() {
    const registerMutation = useRegisterUser();

    const handleSubmit = (formData) => {
        const userData = {
            userStateCode: "ACT",
            userRoleCode: "USR",
            firstName: formData.firstName,
            lastName: formData.lastName,
            // ... resto de campos
        };

        registerMutation.mutate(userData, {
            onSuccess: (response) => {
                console.log('Usuario registrado:', response.data);
                // Redirigir o mostrar mensaje
            },
            onError: (error) => {
                console.error('Error:', error.message);
                // Mostrar error al usuario
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... campos del formulario */}
            <button 
                type="submit" 
                disabled={registerMutation.isPending}
            >
                {registerMutation.isPending ? 'Registrando...' : 'Registrar'}
            </button>
        </form>
    );
}
```

#### 2. Estados de la mutación

```tsx
registerMutation.isPending  // true mientras se procesa
registerMutation.isError    // true si hay error
registerMutation.isSuccess  // true si fue exitoso
registerMutation.error      // objeto de error
registerMutation.data       // respuesta del servidor
```

## 📦 Interfaces

### RegisterUserDto (Input)

```typescript
{
    userStateCode: string;    // "ACT" = Activo
    userRoleCode: string;     // "USR" = Usuario
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    province: string;
    identification: string;
    phoneNumber: string;
    email: string;
    password: string;
    sendNotices: boolean;
}
```

### RegisterResponse (Output)

```typescript
{
    success: boolean;
    message: string;
    data?: {
        userId: string;
        userStateCode: string;
        userRoleCode: string;
        secuencial: number;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        province: string;
        identification: string;
        phoneNumber: string;
        email: string;
        sendNotices: boolean;
        createdAt: string;
        updateAt: string;
        userStateName: string;
        roleName: string;
    };
    errors?: string[];
}
```

## 🎯 Endpoint

```
POST ${VITE_API_URL}/api/Auth/register
Content-Type: application/json
```

## ✅ Ejemplo Completo

Ver: `src/pages/gestion/registro/componentes/formulario-registro.tsx`

## 🔐 Próximas Funcionalidades

- [ ] Login de usuario
- [ ] Recuperación de contraseña
- [ ] Actualización de perfil
- [ ] Manejo de sesión con JWT
