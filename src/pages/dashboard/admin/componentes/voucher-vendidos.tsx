/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAllVoucherByLottery,
  useGetCurrentLottery,
  useGetAllVoucherStates,
  useGetAllEntityFinances,
  useGetProgresoSorteoFaltante,
} from "@/Services/admin/product.query";
import { useGetAllUsers } from "@/Services/admin/users.query";
import { DataTable } from "@/commons/data-table";
import { makeVouchersColumns } from "./columns/colums-voucher-admin";

export default function VoucherVendidos() {
  const { data: currentLottery } = useGetCurrentLottery();
  const lotteryId = currentLottery?.lotteryId || currentLottery?.id;
  const QueryVouchers = useGetAllVoucherByLottery(lotteryId || "");
  const { data: allEntityFinances = [] } = useGetAllEntityFinances();
  const { data: allVoucherStates = [] } = useGetAllVoucherStates();
  const { data: allUsers = [] } = useGetAllUsers();
   const progresoSorteo = useGetProgresoSorteoFaltante(lotteryId || "");
    const faltante = progresoSorteo.data;
  // Construir mapa id -> nombre para entidades
  const entityMap: Record<string, string> = {};
  (allEntityFinances || []).forEach((e: any) => {
    if (e.entityFinanceId || e.id) {
      entityMap[e.entityFinanceId || e.id] =
        e.name || e.displayName || e.nameOwner || "";
    }
  });

  // Construir mapa id -> nombre para estados de voucher
  const voucherStateMap: Record<string, string> = {};
  (allVoucherStates || []).forEach((s: any) => {
    if (s.voucherStateId) voucherStateMap[s.voucherStateId] = s.name;
  });

  // Construir mapa id -> nombre para usuarios
  const userMap: Record<string, string> = {};
  (allUsers || []).forEach((u: any) => {
    if (u.userId || u.id) {
      const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim();
      userMap[u.userId || u.id] = fullName || u.email || u.username || "";
    }
  });

  const columns = makeVouchersColumns(entityMap, voucherStateMap, userMap);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-1 bg-green-600 rounded-full" />
          <h3 className="text-xl font-semibold text-foreground">
            Vouchers vendidos (
            {QueryVouchers.isLoading ? "..." : QueryVouchers.data?.length ?? 0})
          </h3>
        </div>
        <p className="font-bold">
          {faltante ? (
            <span className="text-green-600">{`${faltante}`}</span>
          ) : (
            <span className="text-foreground">Sin información</span>
          )} números para completar el sorteo
        </p>
      </div>

      <DataTable
        columns={columns}
        data={QueryVouchers.data || []}
        filterConfig={{
          columnId: "referenceNumber",
          placeholder: "Buscar por referencia...",
        }}
        selectConfig={{
          columnId: "voucherStateId",
          placeholder: "Filtrar por estado...",
          options: [
            { label: "Todos", value: "all" },
            ...Object.entries(voucherStateMap).map(([value, label]) => ({
              label: label,
              value: value,
            })),
          ],
          exactMatch: true,
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
