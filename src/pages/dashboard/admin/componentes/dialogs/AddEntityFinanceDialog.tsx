import { useState } from 'react';
import { useCreateEntityFinance } from '@/Services/admin/product.mutation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Building2, CreditCard, User, Hash, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { CreateEntityFinanceDto } from '@/interfaces/product.interface';

export default function AddEntityFinanceDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateEntityFinance();

  const [formData, setFormData] = useState<CreateEntityFinanceDto>({
    name: '',
    numberAccount: '',
    identification: '',
    nameOwner: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    // Validaciones
    if (!formData.name || !formData.numberAccount || !formData.identification || !formData.nameOwner) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
      
      // Limpiar formulario y cerrar
      setFormData({
        name: '',
        numberAccount: '',
        identification: '',
        nameOwner: '',
      });
      setOpen(false);
    } catch (error: any) {
      console.error('Error al crear cuenta financiera:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Cuenta
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-400">Nueva Cuenta Financiera</DialogTitle>
          <DialogDescription className="text-slate-400">
            Registra una nueva entidad financiera en el sistema
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre de la Entidad */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm font-medium">
                Nombre de la Entidad <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Banco Pichincha"
                  className="pl-11 bg-slate-800 border-slate-700 text-white focus:border-green-500"
                />
              </div>
            </div>

            {/* Número de Cuenta */}
            <div className="space-y-2">
              <Label htmlFor="numberAccount" className="text-white text-sm font-medium">
                Número de Cuenta <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="numberAccount"
                  name="numberAccount"
                  value={formData.numberAccount}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="pl-11 bg-slate-800 border-slate-700 text-white focus:border-green-500"
                />
              </div>
            </div>

            {/* Identificación */}
            <div className="space-y-2">
              <Label htmlFor="identification" className="text-white text-sm font-medium">
                RUC / Cédula <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="identification"
                  name="identification"
                  value={formData.identification}
                  onChange={handleChange}
                  placeholder="1234567890001"
                  className="pl-11 bg-slate-800 border-slate-700 text-white focus:border-green-500"
                />
              </div>
            </div>

            {/* Nombre del Propietario */}
            <div className="space-y-2">
              <Label htmlFor="nameOwner" className="text-white text-sm font-medium">
                Nombre del Titular <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="nameOwner"
                  name="nameOwner"
                  value={formData.nameOwner}
                  onChange={handleChange}
                  placeholder="Juan Pérez García"
                  className="pl-11 bg-slate-800 border-slate-700 text-white focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={createMutation.isPending}
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={createMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {createMutation.isPending ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando...</span>
              </span>
            ) : (
              'Guardar Cuenta'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
