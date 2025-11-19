
import { useGetAllVouchersByUser } from "@/Services/user/usercompra.query";
import { makeVouchersColumns } from "./componentes/colums-vouchers-users";
import { useGetAllVoucherStates } from '@/Services/admin/product.query';
import { useGetAllEntityFinances } from '@/Services/admin/product.query'
import { DataTable } from "@/commons/data-table";



export default function BoletosComprados() {
    const { data: useGetAllVouchers = [], isLoading: loadingVouchers } = useGetAllVouchersByUser();
    const { data: allEntityFinances = [] } = useGetAllEntityFinances();
    // Obtener todos los estados de voucher (solo una vez, sin id específica)
    const { data: allVoucherStates = [] } = useGetAllVoucherStates();
    

    // Construir mapa id -> nombre para entidades
    const entityMap: Record<string, string> = {};
    (allEntityFinances || []).forEach((e: any) => {
        if (e.entityFinanceId || e.id) {
            entityMap[e.entityFinanceId || e.id] = e.name || e.displayName || e.nameOwner || '';
        }
    });

    // Construir mapa id -> nombre para estados de voucher
    // Usar voucherStateId y name del nuevo tipado
    const voucherStateMap: Record<string, string> = {};
    (allVoucherStates || []).forEach((s: any) => {
        if (s.voucherStateId) voucherStateMap[s.voucherStateId] = s.name;
    });

    const vouchersColumns = makeVouchersColumns(entityMap, voucherStateMap);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-1 bg-green-600 rounded-full" />
                    <h3 className="text-xl font-semibold text-foreground">
                        Mis Vouchers ({loadingVouchers ? '...' : useGetAllVouchers.length})
                    </h3>
                </div>
            </div>

            <DataTable
                columns={vouchersColumns}
                data={useGetAllVouchers}
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
        </div>
    );
}
