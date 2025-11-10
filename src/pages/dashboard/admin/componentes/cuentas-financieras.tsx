import { useState } from 'react';
import { useCreateEntityFinance } from '@/Services/admin/product.mutation';
import { useGetAllEntityFinances } from '@/Services/admin/product.query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Building2, CreditCard, User, Hash, Calendar, Plus, Wallet } from 'lucide-react';
import type { CreateEntityFinanceDto } from '@/interfaces/product.interface';

export default function CuentasFinancieras() {
  const [formData, setFormData] = useState<CreateEntityFinanceDto>({
    name: '',
    numberAccount: '',
    identification: '',
    nameOwner: '',
  });

  const createMutation = useCreateEntityFinance();
  const { data: entityFinances, isLoading } = useGetAllEntityFinances();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.name || !formData.numberAccount || !formData.identification || !formData.nameOwner) {
      return;
    }

    await createMutation.mutateAsync(formData);
    
    // Limpiar formulario
    setFormData({
      name: '',
      numberAccount: '',
      identification: '',
      nameOwner: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-600/20 rounded-lg">
          <Wallet className="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Cuentas Financieras</h1>
          <p className="text-slate-400">Gestiona las cuentas bancarias del sistema</p>
        </div>
      </div>

      {/* Formulario de Creación */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <Plus className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                Agregar Nueva Cuenta
              </CardTitle>
              <CardDescription className="text-slate-300">
                Registra una nueva entidad financiera en el sistema
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre de la Entidad */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200 text-sm font-medium">
                  Nombre de la Entidad Financiera *
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Banco Pichincha, Cooperativa 29 de Octubre"
                    className="pl-11 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Número de Cuenta */}
              <div className="space-y-2">
                <Label htmlFor="numberAccount" className="text-slate-200 text-sm font-medium">
                  Número de Cuenta *
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="numberAccount"
                    name="numberAccount"
                    value={formData.numberAccount}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className="pl-11 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Identificación */}
              <div className="space-y-2">
                <Label htmlFor="identification" className="text-slate-200 text-sm font-medium">
                  RUC / Cédula *
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="identification"
                    name="identification"
                    value={formData.identification}
                    onChange={handleChange}
                    placeholder="1234567890001"
                    className="pl-11 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Nombre del Propietario */}
              <div className="space-y-2">
                <Label htmlFor="nameOwner" className="text-slate-200 text-sm font-medium">
                  Nombre del Titular *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="nameOwner"
                    name="nameOwner"
                    value={formData.nameOwner}
                    onChange={handleChange}
                    placeholder="Juan Pérez García"
                    className="pl-11 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({
                  name: '',
                  numberAccount: '',
                  identification: '',
                  nameOwner: '',
                })}
                className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Limpiar
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6"
              >
                {createMutation.isPending ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Creando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Cuenta
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Cuentas Financieras */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  Cuentas Registradas
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {isLoading 
                    ? 'Cargando cuentas...' 
                    : entityFinances && entityFinances.length > 0 
                      ? `${entityFinances.length} cuenta${entityFinances.length > 1 ? 's' : ''} financiera${entityFinances.length > 1 ? 's' : ''} en el sistema`
                      : 'No hay cuentas registradas aún'
                  }
                </CardDescription>
              </div>
            </div>
            {entityFinances && entityFinances.length > 0 && (
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600 px-4 py-2 text-base">
                Total: {entityFinances.length}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                  <Skeleton className="h-6 w-3/4 bg-slate-700 mb-3" />
                  <Skeleton className="h-4 w-1/2 bg-slate-700 mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full bg-slate-700" />
                    <Skeleton className="h-10 w-full bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          ) : !entityFinances || entityFinances.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-6 bg-slate-800/50 rounded-full mb-4">
                <Building2 className="w-16 h-16 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No hay cuentas financieras registradas
              </h3>
              <p className="text-slate-500 mb-6">
                Comienza agregando tu primera cuenta bancaria usando el formulario de arriba
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                <Plus className="w-4 h-4" />
                <span>Agrega una cuenta para comenzar</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {entityFinances.map((entity, index) => (
                <div
                  key={entity.id || entity.entityFinanceId}
                  className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2.5 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                        <Building2 className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                          {entity.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm text-slate-400">
                            {entity.nameOwner}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600">
                        Activa
                      </Badge>
                      <span className="text-xs text-slate-500 font-mono">
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Información Principal */}
                  <div className="space-y-3 pt-4 border-t border-slate-700">
                    {/* Número de Cuenta */}
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-600/20 rounded-lg">
                          <CreditCard className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                            Número de Cuenta
                          </p>
                          <p className="text-base font-mono font-semibold text-green-400">
                            {entity.numberAccount}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Identificación */}
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600/20 rounded-lg">
                          <Hash className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                            RUC / Cédula
                          </p>
                          <p className="text-base font-mono font-semibold text-purple-400">
                            {entity.identification}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer con Fecha */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Registrado:</span>
                      <span className="font-medium text-slate-300">
                        {new Date(entity.createdAt).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-slate-500 font-mono">
                        ID: {entity.entityFinanceId?.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Información adicional */}
      {entityFinances && entityFinances.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <div className="p-2 bg-blue-600/20 rounded-lg mt-0.5">
                <Building2 className="w-4 h-4 text-blue-400" />
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
