import { useEffect } from 'react';
import { useStore } from '@tanstack/react-store';
import { useVerifyTokenMutation } from '@/services/parametros/auth/auth.mutation';
import { cookiesStore, usuarioStore, authStore } from '@/store/parametros/usuario.store';
import { useLocation, useNavigate } from '@tanstack/react-router';
import Cookies from 'js-cookie';

interface TokenValidatorProps {
  children: React.ReactNode;
}

export function TokenValidator({ children }: TokenValidatorProps) {
  const usuario = useStore(usuarioStore, (s) => s.usuario);
  const sendToken = useStore(cookiesStore, (s) => s.sendToken);
  const autenticado = useStore(authStore, (s) => s.autenticado);
  const location = useLocation();
  const navigate = useNavigate();
  const token = useVerifyTokenMutation(false);

  useEffect(() => {
    const authToken = Cookies.get('auth_token');

    if (authToken && !sendToken) {
      cookiesStore.setState((prev) => ({
        ...prev,
        sendToken: true,
      }));
    }

    if (authToken && !autenticado && !sendToken) {
      token.mutate();
    }
  }, [usuario, sendToken, autenticado, location.pathname, token, navigate]);
  return <>{children}</>;
}
