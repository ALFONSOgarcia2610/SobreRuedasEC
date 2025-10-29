import { DataTable } from "@/commons/data-table";
import { useGetAllUsers } from "@/Services/admin/users.query";
import { userColumns, userMobileColumns } from "./componentes/user-columns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UsersPage() {
  const { data, isLoading, isError, error } = useGetAllUsers();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando usuarios...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive font-semibold">Error al cargar usuarios</p>
            <p className="text-muted-foreground mt-2">{error?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios del sistema
          </p>
        </div>
        <Button onClick={() => toast.info("Crear nuevo usuario")}>
          Nuevo Usuario
        </Button>
      </div>

      <DataTable
        columns={userColumns}
        mobileColumns={userMobileColumns}
        data={data || []}
        filterConfig={{
          columnId: "firstName",
          placeholder: "Buscar por nombre...",
          className: "max-w-sm",
        }}
        selectConfig={{
          columnId: "userStateCode",
          options: [
            { value: "all", label: "Todos los estados" },
            { value: "Activo", label: "Activo" },
            { value: "Inactivo", label: "Inactivo" },
          ],
          placeholder: "Filtrar por estado",
          defaultValue: "all",
          className: "w-[200px]",
        }}
        pageSizeConfig={{
          options: [10, 20, 50, 100],
          defaultValue: 10,
          placeholder: "10 Filas",
        }}
        showColumnToggle={true}
      />
    </div>
  );
}
