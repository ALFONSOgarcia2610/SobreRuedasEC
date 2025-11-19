import { useGetAllVoucherByLottery, useGetCurrentLottery } from '@/Services/admin/product.query';
import { DataTable } from '@/commons/data-table';
import { makeVouchersColumns } from '../../usuario/componentes/colums-vouchers-users';

export default function VoucherVendidos() {
    const { data: currentLottery } = useGetCurrentLottery();
    const lotteryId = currentLottery?.lotteryId || currentLottery?.id;
    const QueryVouchers = useGetAllVoucherByLottery(lotteryId || '');

    // sin entidades en admin por ahora (se puede construir mapa como en usuario)
    const columns = makeVouchersColumns({});

    return (
        <div>
            <h3 className="text-lg font-semibold">Vouchers vendidos ({QueryVouchers.isLoading ? '...' : QueryVouchers.data?.length ?? 0})</h3>
            <DataTable columns={columns} data={QueryVouchers.data || []} />
        </div>
    );
}
