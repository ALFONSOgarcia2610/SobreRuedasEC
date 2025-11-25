import { useGetAllEntityFinances } from '@/Services/admin/product.query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import AddEntityFinanceDialog from './dialogs/AddEntityFinanceDialog';
import { DataTable } from '@/commons/data-table';
import { entityFinanceColumns } from './columns/entityfinance-columns';

export default function CuentasFinancieras() {
  const { data: entityFinances = [], isLoading } = useGetAllEntityFinances();

  return (
    <div className="space-y-6 p-6">
   

      {/* Lista de Cuentas Financieras */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-1 bg-green-600 rounded-full" />
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  Cuentas ({isLoading ? '...' : entityFinances.length})
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Gestiona las entidades financieras
                </CardDescription>
              </div>
            </div>
              <AddEntityFinanceDialog />
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={entityFinanceColumns}
            data={entityFinances}
            filterConfig={{
              columnId: 'name',
              placeholder: 'Buscar por nombre de entidad...',
            }}
            pageSizeConfig={{
              defaultValue: 10,
              options: [5, 10, 20, 50],
            }}
            showColumnToggle={true}
          />
        </CardContent>
      </Card>

      {/* Información adicional */}
      {entityFinances.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <div className="p-2 bg-blue-200 rounded-lg mt-0.5">
                <Wallet className="w-4 h-4 text-blue-900" />
              </div>
              <div>
                <p className="font-medium text-slate-300 mb-1">Información</p>
                <p className="text-slate-400">
                  Las cuentas financieras registradas se utilizan para procesar pagos y transferencias en el sistema de sorteos.
                  Asegúrate de que la información sea correcta antes de registrarla.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
