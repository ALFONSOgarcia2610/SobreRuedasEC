import type { ColumnDef } from "@tanstack/react-table";
import type { getAllUsersResponse } from "@/interfaces/usuario/usuario.interface";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Funciones de manejo de acciones
const handleView = (user: getAllUsersResponse) => {
  toast.info(`Ver detalles de ${user.firstName} ${user.lastName}`);
  // TODO: Implementar vista de detalles
};

const handleEdit = (user: getAllUsersResponse) => {
  toast.info(`Editar ${user.firstName} ${user.lastName}`);
  // TODO: Implementar edición
};

const handleDelete = (user: getAllUsersResponse) => {
  toast.error(`Eliminar ${user.firstName} ${user.lastName}`);
  // TODO: Implementar confirmación y eliminación
};

export const userColumns: ColumnDef<getAllUsersResponse>[] = [
  {
    accessorKey: "secuencial",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">#{row.getValue("secuencial")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: "Nombre Completo",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "identification",
    header: "Identificación",
  },
  {
    accessorKey: "phoneNumber",
    header: "Teléfono",
  },
  {
    accessorKey: "city",
    header: "Ciudad",
    cell: ({ row }) => (
      <div>
        {row.original.city}, {row.original.province}
      </div>
    ),
  },
  {
    accessorKey: "userRoleCode",
    header: "Rol",
    cell: ({ row }) => {
      const role = row.getValue("userRoleCode") as string | null;
      return (
        <Badge variant={role === "Admin" ? "default" : "secondary"}>
          {role || "Sin rol"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "userStateCode",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("userStateCode") as string | null;
      const getVariant = () => {
        if (!estado) return "secondary";
        if (estado.toLowerCase().includes("activo")) return "default";
        if (estado.toLowerCase().includes("inactivo")) return "destructive";
        return "secondary";
      };
      return (
        <Badge variant={getVariant()}>
          {estado || "Sin estado"}
        </Badge>
      );
    },
  },
/*   {
    accessorKey: "sendNotices",
    header: "Notificaciones",
    cell: ({ row }) => (
      <Badge variant={row.getValue("sendNotices") ? "default" : "outline"}>
        {row.getValue("sendNotices") ? "Sí" : "No"}
      </Badge>
    ),
  }, */
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.userId);
                toast.success("ID copiado al portapapeles");
              }}
            >
              Copiar ID de usuario
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleView(user)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(user)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(user)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Columnas simplificadas para vista móvil
export const userMobileColumns: ColumnDef<getAllUsersResponse>[] = [
  {
    accessorKey: "firstName",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.firstName}
      </div>
    ),
  },
  {
    accessorKey: "identification",
    header: "Identification",
    cell: ({ row }) => (
      <div className="lowercase text-xs">{row.getValue("identification")}</div>
    ),
  },
    {
    accessorKey: "phoneNumber",
    header: "Teléfono",
    cell: ({ row }) => (
      <div className="lowercase text-xs">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleView(user)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(user)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(user)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
