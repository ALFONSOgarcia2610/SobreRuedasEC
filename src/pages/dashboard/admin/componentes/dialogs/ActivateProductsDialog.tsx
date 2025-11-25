import { useState } from 'react';
import { useCreateLotteryProduct } from '@/Services/admin/product.mutation';
import { useGetAllProducts, useGetAllLotteries } from '@/Services/admin/product.query';
import { Button } from '@/components/ui/button';
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, Link2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ActivateProductsDialog() {
  const [open, setOpen] = useState(false);
  const createLotteryProduct = useCreateLotteryProduct();

  const { data: allProducts = [], isLoading: loadingProducts } = useGetAllProducts();
  const { data: allLotteries = [], isLoading: loadingLotteries } = useGetAllLotteries();

  const [openProductsCombobox, setOpenProductsCombobox] = useState(false);
  const [openLotteryCombobox, setOpenLotteryCombobox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedLottery, setSelectedLottery] = useState<string>('');

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const removeSelectedProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(id => id !== productId));
  };

  const handleActivate = async () => {
    if (!selectedLottery) {
      toast.error('Debe seleccionar un sorteo');
      return;
    }

    if (selectedProducts.length === 0) {
      toast.error('Debe seleccionar al menos un producto');
      return;
    }

    try {
      for (let i = 0; i < selectedProducts.length; i++) {
        await createLotteryProduct.mutateAsync({
          lotteryId: selectedLottery,
          productId: selectedProducts[i]
        });
      }

      // Limpiar selecciones y cerrar
      setSelectedProducts([]);
      setSelectedLottery('');
      setOpen(false);

      if (selectedProducts.length > 1) {
        toast.success(`${selectedProducts.length} productos activados exitosamente`);
      }
    } catch (error: any) {
      console.error('Error al activar productos:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-300 hover:bg-blue-400 text-blue-900 font-bold cursor-pointer">
          <Link2 className="mr-2 h-4 w-4" />
          Activar Productos
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-400">Activar Productos en Sorteo</DialogTitle>
          <DialogDescription className="text-slate-400">
            Seleccione un sorteo y los productos que desea asociar a él
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Selector de Sorteo */}
          <div className="space-y-2">
            <Label className="text-white text-sm font-medium">
              Sorteo <span className="text-red-500">*</span>
            </Label>
            
            <Popover open={openLotteryCombobox} onOpenChange={setOpenLotteryCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openLotteryCombobox}
                  className="w-full justify-between bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-green-500"
                >
                  {selectedLottery
                    ? allLotteries.find((lottery) => lottery.lotteryId === selectedLottery)?.number
                      ? `Sorteo #${allLotteries.find((lottery) => lottery.lotteryId === selectedLottery)?.number}`
                      : "Seleccione un sorteo..."
                    : "Seleccione un sorteo..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-slate-900 border-slate-700">
                <Command className="bg-slate-900">
                  <CommandInput 
                    placeholder="Buscar sorteo..." 
                    className="h-9 bg-slate-900 text-white" 
                  />
                  <CommandList>
                    <CommandEmpty className="text-slate-400 py-6 text-center text-sm">
                      {loadingLotteries ? 'Cargando sorteos...' : 'No se encontraron sorteos.'}
                    </CommandEmpty>
                    <CommandGroup>
                      {allLotteries.map((lottery) => (
                        <CommandItem
                          key={lottery.lotteryId}
                          value={`${lottery.number}`}
                          onSelect={() => {
                            setSelectedLottery(lottery.lotteryId);
                            setOpenLotteryCombobox(false);
                          }}
                          className="text-white cursor-pointer hover:bg-green-600/20"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 text-green-400",
                              selectedLottery === lottery.lotteryId ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div>
                            <div className="font-medium">Sorteo #{lottery.number}</div>
                            <div className="text-xs text-slate-400">
                              {lottery.maxTickets} tickets - ${lottery.voucherPrice.toFixed(2)}
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Selector Múltiple de Productos */}
          <div className="space-y-2">
            <Label className="text-white text-sm font-medium">
              Productos <span className="text-red-500">*</span>
            </Label>
            
            <Popover open={openProductsCombobox} onOpenChange={setOpenProductsCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProductsCombobox}
                  className="w-full justify-between bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-green-500 h-auto min-h-[40px]"
                >
                  <span className="text-left flex-1 truncate">
                    {selectedProducts.length > 0
                      ? `${selectedProducts.length} producto(s) seleccionado(s)`
                      : "Seleccione productos..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-slate-900 border-slate-700">
                <Command className="bg-slate-900">
                  <CommandInput 
                    placeholder="Buscar producto..." 
                    className="h-9 bg-slate-900 text-white" 
                  />
                  <CommandList>
                    <CommandEmpty className="text-slate-400 py-6 text-center text-sm">
                      {loadingProducts ? 'Cargando productos...' : 'No se encontraron productos.'}
                    </CommandEmpty>
                    <CommandGroup>
                      {allProducts.map((product) => (
                        <CommandItem
                          key={product.productId}
                          value={`${product.name} ${product.code}`}
                          onSelect={() => {}}
                          className="text-white cursor-pointer hover:bg-green-600/20"
                        >
                          <div 
                            className="flex items-center justify-between w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleProductSelection(product.productId);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Check
                                className={cn(
                                  "h-4 w-4 text-green-400",
                                  selectedProducts.includes(product.productId) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-slate-400">
                                  {product.code} - ${product.value.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Lista de productos seleccionados */}
            {selectedProducts.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                {allProducts
                  .filter(p => selectedProducts.includes(p.productId))
                  .map(product => (
                    <div
                      key={product.productId}
                      className="flex items-center gap-1 bg-green-700/20 text-green-400 border border-green-700 px-3 py-1 rounded-md text-sm"
                    >
                      <span>{product.name}</span>
                      <button
                        onClick={() => removeSelectedProduct(product.productId)}
                        className="ml-1 hover:bg-green-700/30 rounded-sm p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedProducts([]);
              setSelectedLottery('');
              setOpen(false);
            }}
            disabled={createLotteryProduct.isPending}
            className="bg-red-200 border-slate-700 text-red-900"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleActivate}
            disabled={selectedProducts.length === 0 || !selectedLottery || createLotteryProduct.isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {createLotteryProduct.isPending ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Activando...</span>
              </span>
            ) : (
              `Activar ${selectedProducts.length > 0 ? `${selectedProducts.length} Producto(s)` : 'Productos'}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
