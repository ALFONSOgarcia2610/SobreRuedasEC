import { useState } from 'react';
import { useCreateProduct } from '@/Services/admin/product.mutation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useGetCurrentLottery } from '@/Services/admin/product.query';

interface ProductFormData {
  code: string;
  name: string;
  description: string;
  value: number;
  isCash: boolean;
  lotteryId: string;
}

export default function AddProductDialog() {
  const { data: currentLottery } = useGetCurrentLottery();
  const lotteryId = currentLottery?.lotteryId ?? "";

  const [productData, setProductData] = useState<ProductFormData>({
    code: '',
    name: '',
    description: '',
    value: 0,
    isCash: false,
    lotteryId,
  });
  const [open, setOpen] = useState(false);
  const createProduct = useCreateProduct();

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Validaciones
    if (!productData.code || !productData.name || !productData.description) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    if (productData.value <= 0) {
      toast.error('El valor del producto debe ser mayor a 0');
      return;
    }

    try {
      // Siempre manda lotteryId actualizado
      await createProduct.mutateAsync({ ...productData, lotteryId });

      // Limpiar formulario y cerrar
      setProductData({
        code: '',
        name: '',
        description: '',
        value: 0,
        isCash: false,
        lotteryId,
      });
      setOpen(false);
    } catch (error: any) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-300 text-green-900 font-bold hover:bg-green-400 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-400">Nuevo Producto</DialogTitle>
          <DialogDescription className="text-slate-400">
            Complete los datos del nuevo producto
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-white text-sm font-medium">
                Código <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                placeholder="PROD001"
                value={productData.code}
                onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                className="bg-slate-800 border-slate-700 text-white focus:border-green-500 uppercase"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm font-medium">
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Nombre del producto"
                value={productData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-slate-800 border-slate-700 text-white focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value" className="text-white text-sm font-medium">
              Valor <span className="text-red-500">*</span>
            </Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={productData.value}
              onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
              className="bg-slate-800 border-slate-700 text-white focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white text-sm font-medium">
              Descripción <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Descripción detallada del producto"
              className="resize-none min-h-[100px] bg-slate-800 border-slate-700 text-white focus:border-green-500"
              value={productData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={createProduct.isPending}
            className="bg-red-200 border-slate-700 text-red-900 hover:bg-red-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={createProduct.isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {createProduct.isPending ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando...</span>
              </span>
            ) : (
              'Guardar Producto'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
