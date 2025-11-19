import { lazy } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  Router,
} from '@tanstack/react-router';
import { authStore, usuarioStore } from '@/Store/usuario.store';
import Cookies from 'js-cookie';
import { initializeAuthFromCookies } from '@/Services/auth.service';
import Error404Page from '@/pages/comunes/error';
import { AppLayout } from '@/layouts/AppLayout';
import { LayoutProvider } from '@/contexts/LayoutContext';
import { canAccessRoute, type UserRole } from '@/config/roles.config';

// Inicializar autenticación desde cookies al cargar la app
initializeAuthFromCookies();

const isAuthenticated = () => {
  // Verificar si hay token en las cookies
  const token = Cookies.get('auth_token');
  
  // Verificar si el store dice que está autenticado
  const isAuthStoreAuthenticated = authStore.state.autenticado;
  
  // Usuario está autenticado si existe el token Y el store lo confirma
  return !!token && isAuthStoreAuthenticated;
};

// Función para mapear código de rol a UserRole
const mapRoleCodeToUserRole = (roleCode: string): UserRole => {
  const roleMap: Record<string, UserRole> = {
    'ADMIN': 'ADMIN',
    'USER': 'USER',
    'USUARIO': 'USER',
  }
  return roleMap[roleCode.toUpperCase()] || 'USER'
}

// Función para verificar acceso a ruta basado en rol
const checkRouteAccess = (path: string) => {
  if (!isAuthenticated()) {
    throw redirect({ to: '/landing' });
  }
  
  const usuario = usuarioStore.state.usuario;
  if (!usuario) {
    throw redirect({ to: '/landing' });
  }
  
  const userRole = mapRoleCodeToUserRole(usuario.userRoleCode);
  
  // Verificar si el usuario puede acceder a esta ruta
  if (!canAccessRoute(userRole, path)) {
    // Redirigir al dashboard si no tiene acceso
    throw redirect({ to: '/dashboard' });
  }
};

export async function createAppRouter(): Promise<Router<typeof rootRoute>> {
  const rootRoute = createRootRoute({
    component: () => (
      <LayoutProvider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </LayoutProvider>
    ),
    notFoundComponent: () => <Error404Page />,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: () => {
      throw redirect({ to: '/landing' });
    },
  });

  const landingRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landing',
    component: lazy(() => import('@/pages/landing/landing-page')),
    beforeLoad: () => {
      if (isAuthenticated()) throw redirect({ to: '/dashboard' });
    },
  });

  const DashboardRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: lazy(() => import('@/pages/dashboard/gestionusuariosadmin')),
    beforeLoad: () => {
      checkRouteAccess('/dashboard');
    },
  });

  const ProductRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sorteos/settings',
    component: lazy(() => import('@/pages/dashboard/admin/componentes/CreateProduct')),
    beforeLoad: () => {
      checkRouteAccess('/sorteos/settings');
    },
  });

  
  const SorteoActivoRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sorteos/active',
    component: lazy(() => import('@/pages/dashboard/admin/componentes/sorteo-activo')),
    beforeLoad: () => {
      checkRouteAccess('/sorteos/active');
    },
  });

  const ConfiguracionRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sorteos/financial',
    component: lazy(() => import('@/pages/dashboard/admin/componentes/cuentas-financieras')),
    beforeLoad: () => {
      checkRouteAccess('/sorteos/financial');
    },
  });

  const GestionUsuariosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/gestionUsuarios',
    component: lazy(() => import('@/pages/dashboard/admin/users')),
    beforeLoad: () => {
      checkRouteAccess('/gestionUsuarios');
    },
  });

  const GestionUsuariosVouchersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/usuarios/sales',
    component: lazy(() => import('@/pages/dashboard/admin/componentes/voucher-vendidos')),
    beforeLoad: () => {
      checkRouteAccess('/usuarios/sales');
    },
  });

  const UsuarioCompraRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/usuario/compraSorteo',
    component: lazy(() => import('@/pages/dashboard/usuario/compra-boletos')),
    beforeLoad: () => {
      checkRouteAccess('/usuario/compraSorteo');
    },
  });

  const UsuarioBoletosCompradosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/usuario/boletosComprados',
    component: lazy(() => import('@/pages/dashboard/usuario/boletos-comprados')),
    beforeLoad: () => {
      checkRouteAccess('/usuario/boletosComprados');
    },
  });

  const loginRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: lazy(() => import('@/pages/gestion/login/login')),
    beforeLoad: () => {
      if (isAuthenticated()) throw redirect({ to: '/dashboard' });
    },
  });
  const RegisterRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: lazy(() => import('@/pages/gestion/registro/registro')),
    beforeLoad: () => {
      if (isAuthenticated()) throw redirect({ to: '/dashboard' });
    },
  });


  {/*  const dashboardRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: lazy(() => import('@/layout/dashboard.page')),
    beforeLoad: () => {
      if (!isAuthenticated()) throw redirect({ to: '/login' });
    },
  });

  const homeRoute = createRoute({
    getParentRoute: () => dashboardRootRoute,
    path: '/home',
    component: componentMap['home'],
    beforeLoad: () => {
      if (!isAuthenticated()) throw redirect({ to: '/login' });
    },
  });

  const fallbackRoute = createRoute({
    getParentRoute: () => dashboardRootRoute,
    path: '*',
    component: componentMap['home'],
  });

  const uniquePaths = new Set<string>();

  const dynamic =
    usuario?.userRole
      ?.filter((ur) => ur.estaActivo && ur.role?.estaActivo)
      .flatMap((ur) =>
        ur.role.submenuRoles
          ?.filter((sr) => sr.estaActivo && sr.submenu?.estaActivo)
          .filter((sr) => {
            const path = sr.submenu.path;
            if (uniquePaths.has(path)) return false;
            uniquePaths.add(path);
            return true;
          })
          .map((sr) =>
            createRoute({
              getParentRoute: () => dashboardRootRoute,
              path: sr.submenu.path,
              component: componentMap[sr.submenu.path],
              beforeLoad: () => {
                if (!isAuthenticated()) throw redirect({ to: '/login' });
              },
            }),
          ),
      ) || [];
*/}
  const routeTree = rootRoute.addChildren([
    indexRoute,
    landingRootRoute,
    loginRootRoute,
    RegisterRootRoute,
    DashboardRootRoute,
    UsuarioCompraRootRoute,
    UsuarioBoletosCompradosRoute,
    GestionUsuariosRoute,
    ProductRootRoute,
    SorteoActivoRootRoute,
    ConfiguracionRootRoute,
    GestionUsuariosVouchersRoute,
    // homeRoute,
    // fallbackRoute,
    // ...dynamic,
  ]);

  return createRouter<typeof rootRoute>({
    routeTree: routeTree as typeof rootRoute,
  });
}
