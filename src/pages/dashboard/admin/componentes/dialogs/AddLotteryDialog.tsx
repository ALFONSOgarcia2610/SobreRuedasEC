import { useState } from 'react';
import { useCreateLottery } from '@/Services/admin/product.mutation';
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
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AddLotteryDialog() {
  const [open, setOpen] = useState(false);
  const createLottery = useCreateLottery();

  const [lotteryData, setLotteryData] = useState({
    number: 0,
    maxTickets: 0,
    voucherPrice: 0,
  });

  const handleInputChange = (field: string, value: number) => {
    setLotteryData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Validaciones
    if (lotteryData.number <= 0) {
      toast.error('El número de sorteo debe ser mayor a 0');
      return;
    }

    if (lotteryData.maxTickets <= 0) {
      toast.error('El máximo de tickets debe ser mayor a 0');
      return;
    }

    if (lotteryData.voucherPrice <= 0) {
      toast.error('El precio del voucher debe ser mayor a 0');
      return;
    }

    try {
      await createLottery.mutateAsync(lotteryData);
      
      // Limpiar formulario y cerrar
      setLotteryData({
        number: 0,
        maxTickets: 0,
        voucherPrice: 0,
      });
      setOpen(false);
    } catch (error: any) {
      console.error('Error al crear sorteo:', error);
    }
  };

  const totalValue = lotteryData.maxTickets * lotteryData.voucherPrice;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-300 hover:bg-green-400 text-green-900 font-bold cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Sorteo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-400">Nuevo Sorteo</DialogTitle>
          <DialogDescription className="text-slate-400">
            Configure los datos del nuevo sorteo
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number" className="text-white text-sm font-medium">
                Número de Sorteo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="number"
                type="number"
                min="0"
                placeholder="1"
                value={lotteryData.number || ''}
                onChange={(e) => handleInputChange('number', parseInt(e.target.value) || 0)}
                className="bg-slate-800 border-slate-700 text-white focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTickets" className="text-white text-sm font-medium">
                Máximo de Tickets <span className="text-red-500">*</span>
              </Label>
              <Input
                id="maxTickets"
                type="number"
                min="0"
                placeholder="100"
                value={lotteryData.maxTickets || ''}
                onChange={(e) => handleInputChange('maxTickets', parseInt(e.target.value) || 0)}
                className="bg-slate-800 border-slate-700 text-white focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voucherPrice" className="text-white text-sm font-medium">
                Precio del Voucher <span className="text-red-500">*</span>
              </Label>
              <Input
                id="voucherPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="5.00"
                value={lotteryData.voucherPrice || ''}
                onChange={(e) => handleInputChange('voucherPrice', parseFloat(e.target.value) || 0)}
                className="bg-slate-800 border-slate-700 text-white focus:border-green-500"
              />
            </div>
          </div>

          {/* Resumen */}
          {totalValue > 0 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-2">
              <h4 className="text-sm font-semibold text-green-400 mb-2">Resumen del Sorteo</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-400">Total Tickets:</span>
                  <span className="ml-2 text-white font-semibold">
                    {new Intl.NumberFormat("es-EC").format(lotteryData.maxTickets)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Precio Unitario:</span>
                  <span className="ml-2 text-white font-semibold">
                    {new Intl.NumberFormat("es-EC", {
                      style: "currency",
                      currency: "USD",
                    }).format(lotteryData.voucherPrice)}
                  </span>
                </div>
                <div className="col-span-2 mt-2 pt-2 border-t border-slate-700">
                  <span className="text-slate-400">Valor Total:</span>
                  <span className="ml-2 text-green-400 font-bold text-lg">
                    {new Intl.NumberFormat("es-EC", {
                      style: "currency",
                      currency: "USD",
                    }).format(totalValue)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={createLottery.isPending}
            className="bg-red-200 border-slate-700 text-red-900 hover:bg-red-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={createLottery.isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {createLottery.isPending ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creando...</span>
              </span>
            ) : (
              'Crear Sorteo'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
