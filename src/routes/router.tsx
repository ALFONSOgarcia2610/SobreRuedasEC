import { lazy } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  Router,
} from '@tanstack/react-router';
// import { authStore, usuarioStore } from '@/store/parametros/usuario.store';
// import { componentMap } from './generate-routes';
// import { TokenValidator } from './TokenValidator';
// import Cookies from 'js-cookie';

// const isAuthenticated = () => {
// const isAuthStoreAuthenticated = authStore.state.autenticado;
// const hasToken = !!Cookies.get('auth_token');

// if (isAuthStoreAuthenticated) return true;

// return hasToken;
// };

export async function createAppRouter(): Promise<Router<typeof rootRoute>> {
  //  const usuario = usuarioStore.state.usuario;

  const rootRoute = createRootRoute({
    component: () => (
      //<TokenValidator>
      <Outlet />
      //</TokenValidator>
    ),
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
    // beforeLoad: () => {
    //   if (isAuthenticated()) throw redirect({ to: '/home' });
    //  },
  });

  const DashboardRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: lazy(() => import('@/pages/dashboard/gestionusuariosadmin')),
    // beforeLoad: () => {
    //   if (isAuthenticated()) throw redirect({ to: '/home' });
    //  },
  });
  const UsuarioCompraRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/usuario/compraSorteo',
    component: lazy(() => import('@/pages/dashboard/usuario/compra-boletos')),
    // beforeLoad: () => {
    //   if (isAuthenticated()) throw redirect({ to: '/home' });
    //  },
  });

  const loginRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: lazy(() => import('@/pages/gestion/login/login')),
    // beforeLoad: () => {
    //  if (isAuthenticated()) throw redirect({ to: '/home' });
    // },
  });
  const RegisterRootRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: lazy(() => import('@/pages/gestion/registro/registro')),
    // beforeLoad: () => {
    //  if (isAuthenticated()) throw redirect({ to: '/home' });
    // },
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
    UsuarioCompraRootRoute
    // homeRoute,
    // fallbackRoute,
    // ...dynamic,
  ]);

  return createRouter<typeof rootRoute>({
    routeTree: routeTree as typeof rootRoute,
  });
}
