import { useState } from 'react';
import { useGenerateTickets } from '@/Services/admin/product.mutation';
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
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useGetCurrentLottery } from '@/Services/admin/product.query';

export default function GenerateTicketsDialog() {
  const { data: currentLottery } = useGetCurrentLottery();
  const lotteryId = currentLottery?.lotteryId ?? "";

  const [quantity, setQuantity] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const generateTickets = useGenerateTickets();

  const handleGenerate = async () => {
    // Validaciones
    if (!lotteryId) {
      toast.error('No hay un sorteo activo');
      return;
    }

    if (quantity <= 0) {
      toast.error('La cantidad debe ser mayor a 0');
      return;
    }

    try {
      await generateTickets.mutateAsync({ lotteryId, quantity });
      setQuantity(0);
      setOpen(false);
    } catch (error: any) {
      console.error('Error al generar tickets:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white font-bold hover:bg-purple-700 cursor-pointer">
          <Sparkles className="mr-2 h-4 w-4" />
          Generar Números Bendecidos
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-400">
            Generar Números Aleatorios Bendecidos
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Genera múltiples números aleatorios bendecidos para el sorteo actual
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-white text-sm font-medium">
              Cantidad de Números <span className="text-red-500">*</span>
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="Ej: 10"
              value={quantity || ''}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="bg-slate-800 border-slate-700 text-white focus:border-purple-500"
            />
            <p className="text-xs text-slate-400">
              Se generarán {quantity || 0} números aleatorios bendecidos para el sorteo actual
            </p>
          </div>

          {currentLottery && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Sorteo Actual:</p>
              <p className="text-sm font-semibold text-white">#{currentLottery.number}</p>
              <p className="text-xs text-slate-400 mt-1">
                Tickets máximos: {currentLottery.maxTickets}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={generateTickets.isPending}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={generateTickets.isPending || !lotteryId}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {generateTickets.isPending ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generando...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Generar Números</span>
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
