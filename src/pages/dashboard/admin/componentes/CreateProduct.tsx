import { useState } from 'react';
import { useCreateProduct, useCreateLottery, useCreateLotteryProduct } from '@/Services/admin/product.mutation';
import { useGetAllProducts, useGetAllLotteries } from '@/Services/admin/product.query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductFormData {
  code: string;
  name: string;
  description: string;
  value: number;
  isCash: boolean;
}

export default function CreateProductPage() {
  const createProduct = useCreateProduct();
  const createLottery = useCreateLottery();
  const createLotteryProduct = useCreateLotteryProduct();

  // Query para obtener todos los productos y sorteos
  const { data: allProducts = [], isLoading: loadingProducts } = useGetAllProducts();
  const { data: allLotteries = [], isLoading: loadingLotteries } = useGetAllLotteries();

  const [products, setProducts] = useState<ProductFormData[]>([{
    code: '',
    name: '',
    description: '',
    value: 0,
    isCash: true,
  }]);

  const [lotteryData, setLotteryData] = useState({
    number: 0,
    maxTickets: 0,
    voucherPrice: 0,
  });

  // Estados para el tab de activación
  const [openProductsCombobox, setOpenProductsCombobox] = useState(false);
  const [openLotteryCombobox, setOpenLotteryCombobox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedLottery, setSelectedLottery] = useState<string>('');

  const handleProductInputChange = (index: number, field: string, value: string | number | boolean) => {
    setProducts(prev => {
      const newProducts = [...prev];
      newProducts[index] = { ...newProducts[index], [field]: value };
      return newProducts;
    });
  };

  const handleLotteryInputChange = (field: string, value: number) => {
    setLotteryData(prev => ({ ...prev, [field]: value }));
  };

  const addProduct = () => {
    setProducts(prev => [...prev, {
      code: '',
      name: '',
      description: '',
      value: 0,
      isCash: true,
    }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(prev => prev.filter((_, i) => i !== index));
    } else {
      toast.error('Debe haber al menos un producto');
    }
  };

  // Funciones para manejar la selección múltiple de productos
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


  // Función para guardar productos
  const handleSaveProducts = async () => {
    // Validaciones
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (!product.code || !product.name || !product.description) {
        toast.error(`Complete todos los campos del producto ${i + 1}`);
        return;
      }

      if (product.value <= 0) {
        toast.error(`El valor del producto ${i + 1} debe ser mayor a 0`);
        return;
      }
    }

    try {
      // Crear todos los productos
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        await createProduct.mutateAsync(productData);
      }

      // Limpiar formularios
      setProducts([{
        code: '',
        name: '',
        description: '',
        value: 0,
        isCash: true,
      }]);

      // El toast de éxito lo maneja la mutación automáticamente
      if (products.length > 1) {
        toast.success(`${products.length} productos creados exitosamente`);
      }
    } catch (error: any) {
      // Los errores los maneja la mutación automáticamente
      console.error('Error al crear productos:', error);
    }
  };

  // Función para crear sorteo
  const handleCreateLottery = async () => {
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
      // Crear sorteo
      await createLottery.mutateAsync(lotteryData);

      // Limpiar formulario
      setLotteryData({
        number: 0,
        maxTickets: 0,
        voucherPrice: 0,
      });

      // El toast de éxito lo maneja la mutación automáticamente
    } catch (error: any) {
      // Los errores los maneja la mutación automáticamente
      console.error('Error al crear sorteo:', error);
    }
  };

  // Función para activar productos en sorteo (crear relaciones LotteryProduct)
  const handleActivateProducts = async () => {
    // Validaciones
    if (!selectedLottery) {
      toast.error('Debe seleccionar un sorteo');
      return;
    }

    if (selectedProducts.length === 0) {
      toast.error('Debe seleccionar al menos un producto');
      return;
    }

    try {
      // Crear todas las relaciones LotteryProduct
      for (let i = 0; i < selectedProducts.length; i++) {
        await createLotteryProduct.mutateAsync({
          lotteryId: selectedLottery,
          productId: selectedProducts[i]
        });
      }

      // Limpiar selecciones
      setSelectedProducts([]);
      setSelectedLottery('');

      // El toast de éxito lo maneja la mutación automáticamente
      if (selectedProducts.length > 1) {
        toast.success(`${selectedProducts.length} productos activados exitosamente`);
      }
    } catch (error: any) {
      // Los errores los maneja la mutación automáticamente
      console.error('Error al activar productos:', error);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold text-foreground">Gestión de Productos y Sorteos</CardTitle>
          <p className="text-sm text-muted-foreground">Administre productos, sorteos y sus activaciones</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="productos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="productos" className="data-[state=active]:bg-green-700">
                Productos
              </TabsTrigger>
              <TabsTrigger value="sorteos" className="data-[state=active]:bg-green-700">
                Sorteos
              </TabsTrigger>
              <TabsTrigger value="activacion" className="data-[state=active]:bg-green-700">
                Activación
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: PRODUCTOS */}
            <TabsContent value="productos" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-green-600 rounded-full" />
                  <h3 className="text-xl font-semibold text-foreground">Productos ({products.length})</h3>
                </div>
                <Button
                  type="button"
                  onClick={addProduct}
                  variant="outline"
                  size="sm"
                  className="bg-green-600 border-slate-700 text-foreground hover:bg-green-700"
                >
                  + Agregar Producto
                </Button>
              </div>
            
              {products.map((product, index) => (
                <div key={index} className="space-y-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">Producto {index + 1}</h4>
                    {products.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeProduct(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`code-${index}`} className="text-foreground text-sm font-medium">
                        Código <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`code-${index}`}
                        placeholder="PROD001"
                        value={product.code}
                        onChange={(e) => handleProductInputChange(index, 'code', e.target.value.toUpperCase())}
                        className="bg-slate-800 border-slate-700 text-foreground focus:border-primary uppercase"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`} className="text-foreground text-sm font-medium">
                        Nombre <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`name-${index}`}
                        placeholder="Nombre del producto"
                        value={product.name}
                        onChange={(e) => handleProductInputChange(index, 'name', e.target.value)}
                        className="bg-slate-800 border-slate-700 text-foreground focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`value-${index}`} className="text-foreground text-sm font-medium">
                        Valor <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`value-${index}`}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={product.value}
                        onChange={(e) => handleProductInputChange(index, 'value', parseFloat(e.target.value) || 0)}
                        className="bg-slate-800 border-slate-700 text-foreground focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`} className="text-foreground text-sm font-medium">
                      Descripción <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Descripción detallada del producto"
                      className="resize-none min-h-[100px] bg-slate-800 border-slate-700 text-foreground focus:border-primary"
                      value={product.description}
                      onChange={(e) => handleProductInputChange(index, 'description', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <Checkbox
                      id={`isCash-${index}`}
                      checked={product.isCash}
                      onCheckedChange={(checked) => handleProductInputChange(index, 'isCash', checked === true)}
                      className="border-slate-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label
                      htmlFor={`isCash-${index}`}
                      className="text-sm font-medium text-foreground cursor-pointer select-none"
                    >
                      Acepta pago en efectivo
                    </Label>
                  </div>
                </div>
              ))}

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setProducts([{ code: '', name: '', description: '', value: 0, isCash: true }]);
                  }}
                  disabled={createProduct.isPending}
                  className="bg-slate-800 border-slate-700 text-foreground hover:bg-slate-700"
                >
                  Limpiar
                </Button>
                <Button
                  onClick={handleSaveProducts}
                  disabled={createProduct.isPending}
                  className="bg-green-700 text-primary-foreground hover:bg-green-900 min-w-[200px]"
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
                    `Guardar ${products.length} Producto(s)`
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* TAB 2: SORTEOS */}
            <TabsContent value="sorteos" className="space-y-4 mt-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-green-600 rounded-full" />
                <h3 className="text-xl font-semibold text-foreground">Configuración del Sorteo</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number" className="text-foreground text-sm font-medium">
                    Número de Sorteo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="number"
                    type="number"
                    min="0"
                    placeholder="1"
                    value={lotteryData.number}
                    onChange={(e) => handleLotteryInputChange('number', parseInt(e.target.value) || 0)}
                    className="bg-slate-800 border-slate-700 text-foreground focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxTickets" className="text-foreground text-sm font-medium">
                    Máximo de Tickets <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maxTickets"
                    type="number"
                    min="0"
                    placeholder="100"
                    value={lotteryData.maxTickets}
                    onChange={(e) => handleLotteryInputChange('maxTickets', parseInt(e.target.value) || 0)}
                    className="bg-slate-800 border-slate-700 text-foreground focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voucherPrice" className="text-foreground text-sm font-medium">
                    Precio del Voucher <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="voucherPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="5.00"
                    value={lotteryData.voucherPrice}
                    onChange={(e) => handleLotteryInputChange('voucherPrice', parseFloat(e.target.value) || 0)}
                    className="bg-slate-800 border-slate-700 text-foreground focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setLotteryData({ number: 0, maxTickets: 0, voucherPrice: 0 });
                  }}
                  disabled={createLottery.isPending}
                  className="bg-slate-800 border-slate-700 text-foreground hover:bg-slate-700"
                >
                  Limpiar
                </Button>
                <Button
                  onClick={handleCreateLottery}
                  disabled={createLottery.isPending}
                  className="bg-green-700 text-primary-foreground hover:bg-green-900 min-w-[200px]"
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
              </div>
            </TabsContent>

            {/* TAB 3: ACTIVACIÓN (LOTTERY PRODUCTS) */}
            <TabsContent value="activacion" className="space-y-4 mt-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-green-600 rounded-full" />
                <h3 className="text-xl font-semibold text-foreground">Activar Productos en Sorteo</h3>
              </div>

              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-sm text-muted-foreground mb-4">
                  Seleccione un sorteo y los productos que desea asociar a él.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm font-medium">
                      Sorteo <span className="text-red-500">*</span>
                    </Label>
                    
                    {/* Selector de sorteo */}
                    <Popover open={openLotteryCombobox} onOpenChange={setOpenLotteryCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openLotteryCombobox}
                          className="w-full justify-between bg-slate-800 border-slate-700 text-foreground hover:bg-slate-700"
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
                            className="h-9 bg-slate-900 text-foreground" 
                          />
                          <CommandList>
                            <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
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
                                  className="text-foreground cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedLottery === lottery.lotteryId ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">Sorteo #{lottery.number}</div>
                                    <div className="text-xs text-muted-foreground">
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

                  <div className="space-y-2">
                    <Label className="text-foreground text-sm font-medium">
                      Productos <span className="text-red-500">*</span>
                    </Label>
                    
                    {/* Selector múltiple de productos */}
                    <Popover open={openProductsCombobox} onOpenChange={setOpenProductsCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openProductsCombobox}
                          className="w-full justify-between bg-slate-800 border-slate-700 text-foreground hover:bg-slate-700 h-auto min-h-[40px]"
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
                            className="h-9 bg-slate-900 text-foreground" 
                          />
                          <CommandList>
                            <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
                              {loadingProducts ? 'Cargando productos...' : 'No se encontraron productos.'}
                            </CommandEmpty>
                            <CommandGroup>
                              {allProducts.map((product) => (
                                <CommandItem
                                  key={product.productId}
                                  value={`${product.name} ${product.code}`}
                                  onSelect={() => {
                                    // No hacer nada aquí, el click se maneja en el div
                                  }}
                                  className="text-foreground cursor-pointer aria-selected:bg-slate-800"
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
                                          "h-4 w-4",
                                          selectedProducts.includes(product.productId) ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div>
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-xs text-muted-foreground">
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
                      <div className="flex flex-wrap gap-2 mt-2">
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
                                className="ml-1 hover:bg-green-700/30 rounded-sm p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedProducts([]);
                        setSelectedLottery('');
                      }}
                      disabled={createLotteryProduct.isPending}
                      className="bg-slate-800 border-slate-700 text-foreground hover:bg-slate-700"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleActivateProducts}
                      disabled={selectedProducts.length === 0 || !selectedLottery || createLotteryProduct.isPending}
                      className="bg-green-700 text-primary-foreground hover:bg-green-900 min-w-[200px]"
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
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};