import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  useGetProgresoSorteo,
  useGetCurrentLottery,
} from "@/Services/admin/product.query";
import {
  useCompleteLottery,
  useCancelLottery,
} from "@/Services/admin/product.mutation";
import type { Lottery } from "@/interfaces/product.interface";

export const LotteryActionsCell = ({ lottery }: { lottery: Lottery }) => {
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const { data: currentLottery, isLoading: isLoadingCurrent } =
    useGetCurrentLottery();

  const lotteryId = lottery.lotteryId || lottery.id || "";
  const currentLotteryId = currentLottery?.lotteryId ?? "";
  const isActiveLottery = lotteryId === currentLotteryId;

  const progresoSorteo = useGetProgresoSorteo(lotteryId);
  const completeMutation = useCompleteLottery();
  const cancelMutation = useCancelLottery();

  // Igual que en sorteo-activo: progresoSorteo.data ya es el número directamente
  const porcentaje = progresoSorteo.data as number | undefined;
  const isCompleto = (porcentaje ?? 0) >= 100;
  const isLoading = isLoadingCurrent || progresoSorteo.isLoading;

  const handleCompleteClick = () => {
    if (!isActiveLottery) {
      toast.warning("Solo sorteo activo", {
        description: "Solo puedes completar el sorteo activo actual",
      });
      return;
    }
    if (!isCompleto) {
      toast.warning("Sorteo incompleto", {
        description: `El sorteo debe estar al 100% para poder completarlo. Progreso actual: ${porcentaje}%`,
      });
      return;
    }
    setShowCompleteDialog(true);
  };

  const handleCancelClick = () => {
    if (!isActiveLottery) {
      toast.warning("Solo sorteo activo", {
        description: "Solo puedes cancelar el sorteo activo actual",
      });
      return;
    }
    setShowCancelDialog(true);
  };

  const handleComplete = () => {
    completeMutation.mutate(lotteryId, {
      onSuccess: () => {
        setShowCompleteDialog(false);
      },
    });
  };

  const handleCancel = () => {
    cancelMutation.mutate(lotteryId, {
      onSuccess: () => {
        setShowCancelDialog(false);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        <span className="text-xs text-gray-400">Verificando...</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          onClick={handleCompleteClick}
          disabled={
            completeMutation.isPending || !isActiveLottery || !isCompleto
          }
          className={`gap-2 ${
            isActiveLottery && isCompleto
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
          size="sm"
        >
          {completeMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
        </Button>

        <Button
          onClick={handleCancelClick}
          disabled={cancelMutation.isPending || !isActiveLottery}
          className="gap-2 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-600 disabled:text-gray-300"
          size="sm"
        >
          {cancelMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
        </Button>

        <span
          className={`text-xs ${
            isActiveLottery ? "text-green-400" : "text-gray-400"
          }`}
        >
          {isActiveLottery ? `${porcentaje}%` : "Inactivo"}
        </span>
      </div>

      {/* Dialog de completar */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Completar Sorteo</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas marcar el sorteo #{lottery.number} como
              completado? Esta acción indica que todos los tickets han sido
              vendidos (100% de progreso).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCompleteDialog(false)}
              disabled={completeMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleComplete}
              disabled={completeMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {completeMutation.isPending && (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              )}
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de cancelar */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Sorteo</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas cancelar el sorteo #{lottery.number}?
              Esta acción no se puede deshacer y el sorteo quedará inactivo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={cancelMutation.isPending}
            >
              No, volver
            </Button>
            <Button
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancelMutation.isPending && (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              )}
              Sí, cancelar sorteo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
