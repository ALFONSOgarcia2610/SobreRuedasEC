/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/base/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Copy,
  Check,
  AlertCircle,
  Building2,
  User,
  Hash,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { useGetAllEntityFinances } from "@/Services/admin/product.query";
import { useGetCurrentLottery } from "@/Services/admin/product.query";
import {
  useCreateVoucherMutation,
  useCreateTicketMutation,
} from "@/Services/user/usercompra.muation";
import { Skeleton } from "@/components/ui/skeleton";

interface PurchaseVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  numeros: number;
  precio: number;
}

interface ProcessingState {
  step: "voucher" | "tickets" | "complete";
  progress: number;
  total: number;
}

// Datos de contacto constantes
const DATOS_CONTACTO = {
  email: "sobreruedasec@hotmail.com",
  whatsapp: "+593 98 594 1069",
} as const;

export function PurchaseVerificationDialog({
  isOpen,
  onClose,
  numeros,
  precio,
}: PurchaseVerificationDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<string>("");
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [entityMemoria, setEntityMemoria] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    step: "voucher",
    progress: 0,
    total: 0,
  });

  // Obtener cuentas financieras y sorteo activo
  const { data: cuentasFinancieras, isLoading: isLoadingCuentas } =
    useGetAllEntityFinances();
  const { data: currentLottery } = useGetCurrentLottery();

  // Mutations
  const createVoucherMutation = useCreateVoucherMutation();
  const createTicketMutation = useCreateTicketMutation();

  // Obtener datos de la cuenta seleccionada
  const datosBancarios = cuentasFinancieras?.find(
    (cuenta) =>
      cuenta.entityFinanceId === cuentaSeleccionada ||
      cuenta.id === cuentaSeleccionada
  );

  // Función para copiar al portapapeles
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Función para confirmar compra y crear voucher + tickets
  const handleConfirmar = async () => {
    // Validaciones
    if (!cuentaSeleccionada) {
      toast.error("Selecciona una cuenta bancaria");
      return;
    }

    if (!referenceNumber.trim()) {
      toast.error("Ingresa el número de referencia de la transferencia");
      return;
    }

    if (!entityMemoria.trim()) {
      toast.error("Ingresa el banco desde donde enviaste la transferencia");
      return;
    }

    if (!currentLottery?.lotteryId && !currentLottery?.id) {
      toast.error("No hay sorteo activo disponible");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Crear el voucher
      const voucherData = {
        entityFinanceId: cuentaSeleccionada, // ID temporal (se ignora por ahora)
        entidadEmisora: entityMemoria.trim(), // Banco desde donde se envió la transferencia
        referenceNumber: referenceNumber.trim(),
        amount: precio,
      };

      const voucherResponse = await createVoucherMutation.mutateAsync(
        voucherData
      );

      const voucherId = voucherResponse.voucherId;

      if (!voucherId) {
        throw new Error("No se pudo obtener el ID del voucher creado");
      }

      // 2. Crear los tickets (uno por cada número de boleto)
      const lotteryId = currentLottery.lotteryId || currentLottery.id;

      if (!lotteryId) {
        throw new Error("No se pudo obtener el ID del sorteo activo");
      }

      // Actualizar estado para mostrar progreso de tickets
      setProcessingState({
        step: "tickets",
        progress: 0,
        total: numeros,
      });

      // Mostrar el spinner mientras se procesan los tickets
      for (let i = 0; i < numeros; i++) {
        const ticketData = {
          userId: "", // Se valida con el token en el backend
          voucherId: voucherId,
          lotteryId: lotteryId,
        };
        await createTicketMutation.mutateAsync(ticketData);

        // Actualizar progreso
        setProcessingState({
          step: "tickets",
          progress: i + 1,
          total: numeros,
        });
      }

      // Éxito
      toast.success("¡Compra registrada exitosamente!", {
        description: `Tu compra se pasó al departamento financiero. Cuando se valide se te asignarán los ${numeros} números.`,
        duration: 5000,
      });

      // Limpiar estados
      setReferenceNumber("");
      setEntityMemoria("");
      setCuentaSeleccionada("");
      setProcessingState({
        step: "voucher",
        progress: 0,
        total: 0,
      });

      // Resetear procesamiento y cerrar
      setIsProcessing(false);

      // Llamar onClose directamente
      onClose();
    } catch (error: any) {
      console.error("Error al procesar la compra:", error);
      toast.error("Error al procesar la compra", {
        description:
          error?.message ||
          "Ocurrió un error inesperado. Por favor, intenta nuevamente.",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen && !isProcessing}
      onOpenChange={(open) => {
        // Si se intenta cerrar y no está procesando, permitir
        if (!open && !isProcessing) {
          onClose();
        }
      }}
    >
      {/* Overlay de loading con progreso */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-16 h-16 animate-spin text-green-400" />

              {processingState.step === "voucher" && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Registrando Voucher
                  </h3>
                  <p className="text-sm text-slate-400">
                    Validando información de pago...
                  </p>
                </div>
              )}

              {processingState.step === "tickets" && (
                <div className="text-center w-full">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Asignando Tickets
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {processingState.progress} de {processingState.total}{" "}
                    tickets asignados
                  </p>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out"
                      style={{
                        width: `${
                          (processingState.progress / processingState.total) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-green-400 mt-2 font-medium">
                    {Math.round(
                      (processingState.progress / processingState.total) * 100
                    )}
                    % completado
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <DialogPopup className="bg-slate-900 border-slate-700 text-white max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            Verificación de Compra
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            Realiza la transferencia y envía tu comprobante
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Resumen de compra */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Boletos</p>
                  <p className="text-xl font-bold text-white">{numeros}</p>
                </div>
                <div className="h-10 w-px bg-slate-700"></div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total a Pagar</p>
                  <p className="text-xl font-bold text-green-200">
                    ${precio.toFixed(2)}
                  </p>
                </div>
              </div>
              <Hash className="w-6 h-6 text-green-200" />
            </div>
          </div>

          {/* Datos bancarios compactos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-white">
                  Datos de Transferencia
                </span>
              </div>
            </div>

            {/* Selector de Banco */}
            <div className="mb-3">
              <label className="text-xs text-slate-400 mb-1.5 block">
                Selecciona la cuenta bancaria
              </label>
              {isLoadingCuentas ? (
                <Skeleton className="h-10 w-full bg-slate-800" />
              ) : !cuentasFinancieras || cuentasFinancieras.length === 0 ? (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-red-400 font-medium">
                      No hay cuentas bancarias disponibles
                    </p>
                    <p className="text-xs text-red-400/70 mt-1">
                      Contacta al administrador
                    </p>
                  </div>
                </div>
              ) : (
                <Select
                  value={cuentaSeleccionada}
                  onValueChange={setCuentaSeleccionada}
                >
                  <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-white h-10">
                    <SelectValue placeholder="Selecciona una cuenta" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {cuentasFinancieras.map((cuenta) => (
                      <SelectItem
                        key={cuenta.entityFinanceId || cuenta.id}
                        value={cuenta.entityFinanceId || cuenta.id || ""}
                        className="text-white hover:bg-slate-700 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-400" />
                          <span>{cuenta.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Mostrar datos bancarios solo si hay cuenta seleccionada */}
            {datosBancarios ? (
              <>
                {/* Grid compacto 2 columnas */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800 rounded p-2">
                    <p className="text-slate-400 mb-0.5">Banco</p>
                    <p className="font-semibold text-white">
                      {datosBancarios.name}
                    </p>
                  </div>
                  <div className="bg-slate-800 rounded p-2">
                    <p className="text-slate-400 mb-0.5">Nº Cuenta</p>
                    <p className="font-semibold text-white font-mono">
                      {datosBancarios.numberAccount}
                    </p>
                  </div>
                </div>

                {/* Beneficiario con botón copiar */}
                <div className="bg-slate-800 rounded p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 mb-0.5">Titular</p>
                      <p className="font-semibold text-white truncate">
                        {datosBancarios.nameOwner}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(datosBancarios.nameOwner, "titular")
                    }
                    className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                  >
                    {copiedField === "titular" ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* RUC/Cédula con botón copiar */}
                <div className="bg-slate-800 rounded p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <Hash className="w-3.5 h-3.5 text-slate-400" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 mb-0.5">
                        RUC / Cédula
                      </p>
                      <p className="font-semibold text-white font-mono">
                        {datosBancarios.identification}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        datosBancarios.identification,
                        "identification"
                      )
                    }
                    className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                  >
                    {copiedField === "identification" ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                </div>
              </>
            ) : cuentaSeleccionada === "" &&
              !isLoadingCuentas &&
              cuentasFinancieras &&
              cuentasFinancieras.length > 0 ? (
              <div className=""></div>
            ) : null}
          </div>

          {/* Instrucciones */}
          <div className="rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-200">
                Pasos a Seguir
              </span>
            </div>
            <ol className="space-y-1.5 text-xs text-slate-300">
              <li className="flex gap-2">
                <span className="text-white font-bold">1.</span>
                <span>
                  Realiza la transferencia de{" "}
                  <strong className="text-white">${precio.toFixed(2)}</strong>{" "}
                  exactos a la cuenta seleccionada
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-white font-bold">2.</span>
                <span>Toma captura del comprobante de pago</span>
              </li>
              <li className="flex gap-2">
                <span className="text-white font-bold">3.</span>
                <span>
                  Ingresa el{" "}
                  <strong className="text-blue-400">
                    número de referencia
                  </strong>{" "}
                  y el{" "}
                  <strong className="text-blue-400">banco de origen</strong>{" "}
                  abajo
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-white font-bold">4.</span>
                <span>
                  Envía el comprobante de pago por WhatsApp o correo (opcional
                  pero recomendado)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-white font-bold">5.</span>
                <span>
                  Click en{" "}
                  <strong className="text-green-400">"Validar Compra"</strong>{" "}
                  para completar el proceso
                </span>
              </li>
            </ol>
          </div>

          {/* Campos de datos de transferencia */}
          <div className="space-y-3">
            {/* Campo para número de referencia */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
              <Label
                htmlFor="referenceNumber"
                className="text-sm text-white mb-2 flex items-center gap-2"
              >
                Número de Referencia de la Transferencia
              </Label>
              <Input
                id="referenceNumber"
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Ej: 1234567890"
                className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400 focus:ring-amber-400"
                disabled={isProcessing}
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Este número aparece en tu comprobante bancario
              </p>
            </div>

            {/* Campo para banco de origen */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
              <Label
                htmlFor="entityMemoria"
                className="text-sm text-white mb-2 flex items-center gap-2"
              >
                Banco desde donde enviaste la transferencia
              </Label>
              <Input
                id="entityMemoria"
                type="text"
                value={entityMemoria}
                onChange={(e) => setEntityMemoria(e.target.value)}
                placeholder="Ej: Banco Pichincha, Banco Guayaquil, etc."
                className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400"
                disabled={isProcessing}
              />
              <p className="text-xs text-slate-400 mt-1.5">
                El banco de tu cuenta personal desde donde hiciste la
                transferencia
              </p>
            </div>
          </div>

          {/* Contacto compacto */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => copyToClipboard(DATOS_CONTACTO.email, "email")}
              className="bg-slate-800 hover:bg-slate-700 rounded p-2 transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <Mail className="w-3 h-3 text-amber-400" />
                {copiedField === "email" ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500 group-hover:text-slate-400" />
                )}
              </div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-xs font-semibold text-white truncate">
                {DATOS_CONTACTO.email}
              </p>
            </button>

            <button
              onClick={() =>
                copyToClipboard(DATOS_CONTACTO.whatsapp, "whatsapp")
              }
              className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded p-2 transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <Phone className="w-3 h-3 text-green-400" />
                {copiedField === "whatsapp" ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500 group-hover:text-green-400" />
                )}
              </div>
              <p className="text-xs text-slate-400">WhatsApp</p>
              <p className="text-xs font-semibold text-white">
                {DATOS_CONTACTO.whatsapp}
              </p>
            </button>
          </div>

          {/* Nota final */}
          <div className="bg-green-100 border border-green-500/30 rounded p-2">
            <p className="text-xs text-green-800">
              ✓ Recibirás factura y números de boletos en máximo 24h tras
              validación
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-red-400 hover:bg-red-500 text-red-900 font-bold text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={
              isProcessing ||
              !cuentaSeleccionada ||
              !referenceNumber.trim() ||
              !entityMemoria.trim()
            }
            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-500 disabled:hover:to-green-600"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Procesando...</span>
              </div>
            ) : (
              "Validar Compra"
            )}
          </button>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
