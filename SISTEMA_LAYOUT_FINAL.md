# Sistema de Layout Simplificado ✅

## 📋 Concepto

**UNA sola validación en el `rootRoute` del router:**
- Si está autenticado → Muestra `Sidebar` 
- Si NO está autenticado → Muestra `Header`

## 🏗️ Arquitectura

```
rootRoute
  └─ <LayoutProvider>
       └─ <AppLayout>  ← AQUÍ se decide qué mostrar
            └─ <Outlet />
```

## 📁 Componentes Clave

### 1. `AppLayout.tsx`
```tsx
export function AppLayout({ children }: AppLayoutProps) {
  const isAuthenticated = useStore(authStore);
  const { breadcrumbs, title } = useLayout();

  if (isAuthenticated) {
    return <SidebarPage breadcrumbs={breadcrumbs}>{children}</SidebarPage>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
```

### 2. `LayoutContext.tsx`
- Maneja breadcrumbs globalmente
- Las páginas establecen breadcrumbs vía hook

### 3. `useBreadcrumbs.ts`
- Hook para establecer breadcrumbs desde las páginas
- Se limpia automáticamente al desmontar

## 📝 Uso en Páginas

### Páginas Públicas (NO autenticadas)
```tsx
// landing-page.tsx
export default function LandingPage() {
  // NO usa breadcrumbs, NO importa nada de sidebar
  
  return (
    <div>
      {/* Contenido directamente */}
      {/* AppLayout agrega Header automáticamente */}
    </div>
  );
}
```

### Páginas Privadas (autenticadas)
```tsx
// users.tsx
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function UsersPage() {
  // Solo establece breadcrumbs
  useBreadcrumbs([
    { label: "Inicio", href: "/dashboard" },
    { label: "Usuarios", isActive: true }
  ]);

  return (
    <div>
      {/* Contenido directamente */}
      {/* AppLayout agrega Sidebar automáticamente */}
    </div>
  );
}
```

## ✅ Reglas Importantes

### ❌ NO HACER:
```tsx
// ❌ NO importar SidebarPage en las páginas
import SidebarPage from "@/pages/comunes/sidebarPage";

// ❌ NO envolver en SidebarPage
<SidebarPage breadcrumbs={...}>
  <div>Contenido</div>
</SidebarPage>

// ❌ NO importar Header en las páginas
import { Header } from "@/pages/landing/componentes/header";
```

### ✅ SÍ HACER:
```tsx
// ✅ Solo usar el hook en páginas autenticadas
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function MiPagina() {
  useBreadcrumbs([...]); // Solo si es página autenticada
  
  return <div>Contenido</div>; // Directamente
}
```

## 🔄 Flujo Completo

```
1. Usuario navega a /dashboard
2. Router valida en beforeLoad → isAuthenticated? 
3. Si NO → redirect a /landing
4. Si SÍ → Permite acceso
5. AppLayout detecta isAuthenticated = true
6. AppLayout renderiza <SidebarPage>
7. Página establece breadcrumbs con useBreadcrumbs()
8. Sidebar muestra breadcrumbs del contexto
```

## 📦 Archivos del Sistema

```
src/
├── contexts/
│   └── LayoutContext.tsx       ← Contexto global
├── hooks/
│   └── useBreadcrumbs.ts       ← Hook para breadcrumbs
├── layouts/
│   └── AppLayout.tsx           ← Validación principal
├── routes/
│   └── router.tsx              ← beforeLoad redirects
└── pages/
    ├── landing/
    │   └── landing-page.tsx    ← Sin useBreadcrumbs
    ├── gestion/
    │   ├── login.tsx           ← Sin useBreadcrumbs
    │   └── registro.tsx        ← Sin useBreadcrumbs
    └── dashboard/
        ├── gestionusuariosadmin.tsx   ← Con useBreadcrumbs
        ├── admin/
        │   └── users.tsx              ← Con useBreadcrumbs
        └── usuario/
            ├── compra-boletos.tsx     ← Con useBreadcrumbs
            └── boletos-comprados.tsx  ← Con useBreadcrumbs
```

## 🎯 Ventajas

1. **Un solo lugar de validación** - `AppLayout`
2. **Sin duplicación** - Las páginas no saben si usan Header o Sidebar
3. **Automático** - El sistema decide qué mostrar
4. **Limpio** - Las páginas solo tienen su contenido
5. **Breadcrumbs dinámicos** - Via hook, no props

## 🚀 Para Nuevas Páginas

### Página pública:
```tsx
export default function MiPaginaPublica() {
  return <div>Mi contenido</div>;
}
```

### Página privada:
```tsx
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function MiPaginaPrivada() {
  useBreadcrumbs([
    { label: "Inicio", href: "/dashboard" },
    { label: "Mi Página", isActive: true }
  ]);
  
  return <div>Mi contenido</div>;
}
```

**¡Eso es todo!** El sistema hace el resto automáticamente. 🎉
