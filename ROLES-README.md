# 🎭 Sistema de Roles con JSON

Sistema simple para cambiar roles de usuario editando un archivo JSON.

## 📁 Archivos Importantes

- `src/data/user-config.json` - **Configuración del usuario actual**
- `src/hooks/useUserFromJson.ts` - Hook que lee el JSON
- `src/config/roles.config.ts` - Definición de roles y permisos

## 🚀 Cómo Cambiar de Rol

### 1. Abre el archivo JSON
```
src/data/user-config.json
```

### 2. Cambia solo el campo "role"
```json
{
  "currentUser": {
    "id": "1",
    "name": "Alfonso García",
    "email": "alfonso@sobreruedas.ec",
    "avatar": "/avatars/alfonso.jpg",
    "role": "admin"  ← Cambia solo este valor
  }
}
```

### 3. Valores disponibles para "role":
- `"super-admin"` - Super Administrador (acceso total)
- `"admin"` - Administrador (gestión general)
- `"distribuidor"` - Distribuidor (ventas y comisiones)
- `"usuario"` - Usuario (solo lectura)

### 4. Guarda el archivo
Los cambios se aplicarán automáticamente al recargar la página.

## 🎯 Roles Disponibles

### 🛡️ Super Admin (`super-admin`)
- **Color:** Rojo
- **Permisos:** Acceso total (*)
- **Menús:** Sistema, Admins, Base de datos, Finanzas globales

### 🛡️ Admin (`admin`) 
- **Color:** Azul
- **Permisos:** sorteos, distribuidores, usuarios, reportes
- **Menús:** Sorteos, Distribuidores, Participantes, Reportes, Pagos

### 🚛 Distribuidor (`distribuidor`)
- **Color:** Verde  
- **Permisos:** ventas, clientes, comisiones
- **Menús:** Mi Zona, Ventas, Clientes, Comisiones, Sorteos

### 👁️ Usuario (`usuario`)
- **Color:** Gris
- **Permisos:** view-only
- **Menús:** Sorteos (vista), Mis Participaciones, Resultados, Información

## 📄 Ejemplo de JSON Completo

```json
{
  "currentUser": {
    "id": "1",
    "name": "Alfonso García",
    "email": "alfonso@sobreruedas.ec",
    "avatar": "/avatars/alfonso.jpg",
    "role": "admin"
  },
  "availableRoles": [
    {
      "key": "super-admin",
      "label": "Super Admin",
      "description": "Control total del sistema",
      "permissions": ["*"]
    },
    {
      "key": "admin", 
      "label": "Administrador",
      "description": "Gestión de sorteos y usuarios",
      "permissions": ["sorteos", "distribuidores", "usuarios", "reportes"]
    },
    {
      "key": "distribuidor",
      "label": "Distribuidor", 
      "description": "Ventas y comisiones",
      "permissions": ["ventas", "clientes", "comisiones"]
    },
    {
      "key": "usuario",
      "label": "Usuario",
      "description": "Solo visualización",
      "permissions": ["view-only"]
    }
  ]
}
```

## 🧪 Páginas de Ejemplo

- `src/pages/ejemplos/dashboard-roles.tsx` - Dashboard que cambia según el rol
- `src/pages/ejemplos/configuracion-json.tsx` - Página con instrucciones completas

## ✅ Lo Que Cambia Al Cambiar Rol

- **Menús del Sidebar** - Cada rol ve diferentes opciones
- **Colores e Iconos** - Identificación visual por rol
- **Información del Usuario** - Se muestra el rol actual
- **Permisos** - Funciones disponibles según el rol
- **Contenido** - Dashboards específicos por tipo de usuario

## 💡 Tips

- Solo necesitas cambiar el campo `"role"` en el JSON
- Guarda el archivo y recarga la página
- Los menús del sidebar se actualizan automáticamente
- Cada rol tiene colores distintivos para fácil identificación

¡Es súper simple! Solo edita el JSON y listo. 🎉
