import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useGetLotteryStateById } from "@/Services/admin/product.query";

interface LotteryStatusCellProps {
  stateId: string;
}

export const LotteryStatusCell = ({ stateId }: LotteryStatusCellProps) => {
  const { data: stateData, isLoading } = useGetLotteryStateById(stateId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!stateData) {
    return (
      <Badge className="bg-gray-500 text-white font-bold">Desconocido</Badge>
    );
  }

  const statusConfig: Record<string, { label: string; className: string }> = {
    Active: { label: "Activo", className: "bg-green-500 text-white" },
    Completed: { label: "Completado", className: "bg-blue-500 text-white" },
    Cancelled: { label: "Cancelado", className: "bg-red-500 text-white" },
  };

  const config = statusConfig[stateData.code] || {
    label: stateData.name,
    className: "bg-gray-500 text-white",
  };

  return (
    <Badge className={`${config.className} font-bold`}>{config.label}</Badge>
  );
};
