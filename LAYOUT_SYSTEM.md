# Sistema de Layout Simplificado

## 📋 Descripción General

Sistema simplificado que muestra automáticamente:
- **Header** cuando el usuario NO está autenticado (en el router)
- **Sidebar** cuando el usuario SÍ está autenticado (en cada página con SidebarPage)

## 🏗️ Arquitectura

### Componente Principal: `RootLayout` en router.tsx

**Ubicación:** `src/routes/router.tsx`

**Funcionalidad:**
```tsx
function RootLayout() {
  const isAuth = useStore(authStore, (state) => state.autenticado);

  return (
    <>
      {!isAuth && <Header />}  {/* Solo muestra Header si NO está autenticado */}
      <Outlet />
    </>
  );
}
```

- Lee el estado de autenticación desde `authStore`
- Renderiza `<Header />` solo para usuarios NO autenticados
- Renderiza `<Outlet />` que muestra las páginas hijas

## 🔄 Flujo de Autenticación

### 1. Usuario NO Autenticado
```
Landing (/landing)
  └─ RootLayout detecta: isAuth = false
     └─ Renderiza: <Header /> + <Outlet />
        └─ Outlet muestra: landing-page.tsx (sin wrapper)
     
Login (/login)
  └─ RootLayout detecta: isAuth = false
     └─ Renderiza: <Header /> + <Outlet />
        └─ Outlet muestra: login.tsx (sin wrapper)
```

### 2. Usuario Autenticado
```
Dashboard (/dashboard)
  └─ RootLayout detecta: isAuth = true
     └─ Renderiza SOLO: <Outlet /> (sin Header)
        └─ Outlet muestra: gestionusuariosadmin.tsx
           └─ Página usa: <SidebarPage breadcrumbs={...}>

Usuarios (/gestionUsuarios)
  └─ RootLayout detecta: isAuth = true
     └─ Renderiza SOLO: <Outlet /> (sin Header)
        └─ Outlet muestra: users.tsx
           └─ Página usa: <SidebarPage breadcrumbs={...}>
```

## 📝 Implementación en Páginas

### Páginas Públicas (NO autenticadas)
```tsx
// landing-page.tsx
export default function LandingPage() {
  // NO usa wrapper - RootLayout agrega Header automáticamente
  
  return (
    <div className="min-h-screen w-full bg-slate-900">
      <section>...</section>
      <Footer />
    </div>
  );
}
```

### Páginas Privadas (autenticadas)
```tsx
// users.tsx
import SidebarPage from "@/pages/comunes/sidebarPage";

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/dashboard" },
    { label: "Usuarios", isActive: true }
  ];

  return (
    <SidebarPage breadcrumbs={breadcrumbs}>
      <div className="container mx-auto">
        <h1>Usuarios</h1>
        <DataTable ... />
      </div>
    </SidebarPage>
  );
}
```

## 🔧 Cambios Realizados

### 1. Actualizado `router.tsx`
- Creado componente `RootLayout` que decide mostrar Header o no
- Header solo se muestra si el usuario NO está autenticado
- Todas las validaciones de autenticación están centralizadas en `beforeLoad`

```tsx
function RootLayout() {
  const isAuth = useStore(authStore, (state) => state.autenticado);
  return (
    <>
      {!isAuth && <Header />}
      <Outlet />
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <Error404Page />,
});
```

### 2. Páginas Actualizadas

**Páginas NO autenticadas (sin wrapper):**
- ✅ `landing-page.tsx` - Sin Header (lo agrega RootLayout)
- ✅ `login.tsx` - Sin Header (lo agrega RootLayout)
- ✅ `registro.tsx` - Sin Header (lo agrega RootLayout)

**Páginas autenticadas (usan `<SidebarPage>`):**
- ✅ `gestionusuariosadmin.tsx` - Usa SidebarPage con breadcrumbs
- ✅ `users.tsx` - Usa SidebarPage con breadcrumbs
- ✅ `compra-boletos.tsx` - Usa SidebarPage con breadcrumbs
- ✅ `boletos-comprados.tsx` - Usa SidebarPage con breadcrumbs

## 🎯 Ventajas

1. **Simple:** Una sola validación en el router
2. **Claro:** Cada página maneja su propio layout (SidebarPage o nada)
3. **Sin duplicación:** Header se renderiza una sola vez en RootLayout
4. **Mantenible:** Lógica centralizada en router.tsx
5. **Predecible:** Fácil de entender el flujo

## 🔐 Control de Acceso

El sistema trabaja en conjunto con:
- `authStore.state.autenticado` - Estado de autenticación
- `beforeLoad` en rutas - Redirecciones automáticas
- `AppLayout` - Renderizado condicional de UI

## 📦 Estructura de Archivos

```
src/
├── routes/
│   └── router.tsx             ← RootLayout maneja Header
├── pages/
│   ├── comunes/
│   │   └── sidebarPage.tsx    ← Componente reutilizable para sidebar
│   ├── landing/
│   │   ├── componentes/
│   │   │   └── header.tsx     ← Header usado por RootLayout
│   │   └── landing-page.tsx   ← Sin wrapper
│   ├── gestion/
│   │   ├── login/
│   │   │   └── login.tsx      ← Sin wrapper
│   │   └── registro/
│   │       └── registro.tsx   ← Sin wrapper
│   └── dashboard/
│       ├── gestionusuariosadmin.tsx  ← Usa <SidebarPage>
│       ├── admin/
│       │   └── users.tsx             ← Usa <SidebarPage>
│       └── usuario/
│           ├── compra-boletos.tsx    ← Usa <SidebarPage>
│           └── boletos-comprados.tsx ← Usa <SidebarPage>
└── Store/
    └── usuario.store.ts       ← authStore
```

## 🚀 Uso Futuro

### Página Pública (sin autenticación)
```tsx
export default function MiPaginaPublica() {
  return (
    <div>
      {/* Contenido directo - RootLayout agrega Header */}
      <section>Mi contenido</section>
    </div>
  );
}
```

### Página Privada (con autenticación)
```tsx
import SidebarPage from "@/pages/comunes/sidebarPage";

export default function MiPaginaPrivada() {
  const breadcrumbs = [
    { label: "Inicio", href: "/dashboard" },
    { label: "Mi Página", isActive: true }
  ];

  return (
    <SidebarPage breadcrumbs={breadcrumbs}>
      <div>Mi contenido</div>
    </SidebarPage>
  );
}
```

## ✅ Estado Actual

- ✅ Sistema implementado y funcionando
- ✅ Todas las páginas actualizadas
- ✅ Sin errores de compilación
- ✅ Navegación con Link de TanStack Router
- ✅ Autenticación reactiva (cambia en tiempo real)
