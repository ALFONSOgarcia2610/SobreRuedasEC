import { useGetAllProducts, useGetAllLotteries } from '@/Services/admin/product.query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/commons/data-table';
import { productColumns } from './columns/product-columns';
import { lotteryColumns } from './columns/lottery-columns';
import AddProductDialog from './dialogs/AddProductDialog';
import AddLotteryDialog from './dialogs/AddLotteryDialog';
import ActivateProductsDialog from './dialogs/ActivateProductsDialog';

export default function CreateProductPage() {
  // Query para obtener todos los productos y sorteos
  const { data: allProducts = [], isLoading: loadingProducts } = useGetAllProducts();
  const { data: allLotteries = [], isLoading: loadingLotteries } = useGetAllLotteries();

  return (
    <div className="w-full max-w-full mx-auto">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-foreground">Gestión de Productos y Sorteos</CardTitle>
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
            <TabsContent value="productos" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-green-600 rounded-full" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Productos Registrados ({loadingProducts ? '...' : allProducts.length})
                  </h3>
                </div>
                <AddProductDialog />
              </div>

              <DataTable
                columns={productColumns}
                data={allProducts}
                filterConfig={{
                  columnId: 'name',
                  placeholder: 'Buscar por nombre...',
                }}
                selectConfig={{
                  columnId: 'isCash',
                  placeholder: 'Filtrar por tipo...',
                  options: [
                    { label: 'Efectivo', value: 'true' },
                    { label: 'Premio', value: 'false' },
                  ],
                }}
                pageSizeConfig={{
                  defaultValue: 10,
                  options: [5, 10, 20, 50],
                }}
                showColumnToggle={true}
              />
            </TabsContent>

            {/* TAB 2: SORTEOS */}
            <TabsContent value="sorteos" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-green-600 rounded-full" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Sorteos Registrados ({loadingLotteries ? '...' : allLotteries.length})
                  </h3>
                </div>
                <AddLotteryDialog />
              </div>

              <DataTable
                columns={lotteryColumns}
                data={allLotteries}
                filterConfig={{
                  columnId: 'number',
                  placeholder: 'Buscar por número...',
                }}
                pageSizeConfig={{
                  defaultValue: 10,
                  options: [5, 10, 20, 50],
                }}
                showColumnToggle={true}
              />
            </TabsContent>

            {/* TAB 3: ACTIVACIÓN (LOTTERY PRODUCTS) */}
            <TabsContent value="activacion" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-blue-600 rounded-full" />
                  <h3 className="text-xl font-semibold text-foreground">Asociar Productos a Sorteos</h3>
                </div>
                <ActivateProductsDialog />
              </div>

              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="text-6xl">🎯</div>
                  <h4 className="text-lg font-semibold text-white">Vincule productos a sus sorteos</h4>
                  <p className="text-sm text-slate-400">
                    Utilice el botón "Activar Productos" para asociar uno o más productos a un sorteo específico.
                    Esto determinará qué premios estarán disponibles en cada sorteo.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
