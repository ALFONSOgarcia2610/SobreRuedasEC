import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReglamentoSorteoProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ReglamentoSorteo({ isOpen, onClose }: ReglamentoSorteoProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700">
                {/* Header */}
                <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                        <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-8 h-8 object-contain" />
                    </div>
                    <h2 className="text-base font-bold text-white">Reglamento del Sorteo</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)] text-gray-300">
                    <div className="space-y-6">
                        <section className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
                            <p className="text-sm text-blue-300 leading-relaxed">
                                Este reglamento establece las bases y condiciones para participar en los sorteos
                                organizados por SobreRuedas Ecuador. Al comprar un boleto, usted acepta cumplir
                                con todas las disposiciones aquí establecidas.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">1. Organizador del Sorteo</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">
                                    <strong className="text-white">Razón Social:</strong> SobreRuedas Ecuador S.A.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">RUC:</strong> 1234567890001
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">Domicilio:</strong> Portoviejo, Manabí, Ecuador
                                </p>
                                <p className="leading-relaxed">
                                    El organizador es responsable de la correcta ejecución del sorteo y la entrega del premio.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">2. Descripción del Premio</h3>
                            <div className="space-y-3 text-sm">
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                    <p className="leading-relaxed">
                                        <strong className="text-white">Premio Principal:</strong> Vehículo automóvil según especificaciones
                                        publicadas en la plataforma
                                    </p>
                                    <p className="leading-relaxed mt-2">
                                        <strong className="text-white">Características:</strong>
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                                        <li>Documentación en regla</li>
                                        <li>Matriculado y transferido al ganador</li>
                                    </ul>
                                </div>
                                <p className="leading-relaxed">
                                    El premio no incluye impuestos de transferencia, los cuales son responsabilidad del ganador.
                                    El premio no es canjeable por dinero en efectivo ni por otro vehículo.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">3. Requisitos de Participación</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Para participar en el sorteo, debe cumplir con:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Ser mayor de 18 años al momento de la compra</li>
                                    <li>Poseer cédula de identidad ecuatoriana vigente</li>
                                    <li>Completar el registro en la plataforma con datos verídicos</li>
                                    <li>Realizar el pago completo del boleto</li>
                                    <li>Aceptar los términos y condiciones del sorteo</li>
                                </ul>

                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">4. Compra de Boletos</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Condiciones de compra:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Precio por boleto puede avriar conforme al sorteo</li>
                                    <li>No hay límite en la cantidad de boletos por persona</li>
                                    <li>Cada boleto tiene un número único</li>
                                    <li>Los boletos no son reembolsables ni transferibles</li>
                                    <li>La compra se considera válida una vez confirmado el pago</li>
                                    <li>Recibirá confirmación por email con sus números</li>
                                </ul>
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mt-3">
                                    <p className="leading-relaxed">
                                        <strong className="text-white">Métodos de pago aceptados:</strong>
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                                        {/*    <li>Tarjetas de crédito (Visa, Mastercard)</li>
                                        <li>Tarjetas de débito</li> */}
                                        <li>Transferencias bancarias</li>
                                        {/*  <li>Pagos en línea seguros</li> */}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">5. Fecha y Mecanismo del Sorteo</h3>
                            <div className="space-y-3 text-sm">
                                <div className="bg-green-900/20 p-4 rounded-lg border border-green-700">
                                    <p className="leading-relaxed text-green-300">
                                        <strong className="text-white">Fecha del sorteo:</strong> Se realizará en la fecha
                                        anunciada públicamente en la plataforma, una vez vendidos todos los boletos disponibles.
                                    </p>
                                    <p className="leading-relaxed text-green-300 mt-2">
                                        <strong className="text-white">Hora:</strong> 19:00 horas (hora de Ecuador)
                                    </p>
                                </div>
                                <p className="leading-relaxed">
                                    <strong className="text-white">Mecanismo del sorteo:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Se utilizará el número ganador conforme a la Lotería Nacional</li>
                                    <li>El sorteo será transmitido en vivo por redes sociales</li>
                                    <li>Se sorteará el número ganador entre todos los boletos vendidos</li>
                                    <li>El resultado es inapelable e irrevocable</li>
                                </ul>
                                <p className="leading-relaxed mt-3">
                                    En caso de fuerza mayor que impida realizar el sorteo en la fecha programada,
                                    se reprogramará y se notificará con 48 horas de anticipación.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">6. Determinación del Ganador</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">
                                    El ganador será el titular del boleto cuyo número coincida exactamente con el número
                                    sorteado por la Lotería Nacional.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">Notificación del ganador:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Se contactará por teléfono inmediatamente después del sorteo</li>
                                    <li>Se enviará notificación por correo electrónico </li>
                                    <li>Se publicará el número ganador en la plataforma </li>
                                    <li>El ganador debe confirmar su identidad en un plazo de 48 horas</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">7. Entrega del Premio</h3>
                            <div className="space-y-3 text-sm">
                                <p className="leading-relaxed">
                                    <strong className="text-white">Requisitos para reclamar el premio:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Presentar cédula de identidad original</li>
                                    <li>Presentar el boleto ganador (digital o impreso)</li>
                                    <li>Firmar acta de entrega del premio</li>
                                    <li>Completar documentación de transferencia del vehículo</li>
                                    <li>Pagar impuestos de transferencia (si aplican)</li>
                                </ul>
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mt-3">
                                    <p className="leading-relaxed">
                                        <strong className="text-white">Plazo para reclamar:</strong> 60 días calendario desde
                                        la fecha del sorteo
                                    </p>
                                    <p className="leading-relaxed text-yellow-400 mt-2">
                                        <strong>Advertencia:</strong> Si el premio no es reclamado en el plazo establecido,
                                        se considerará abandonado.
                                    </p>
                                </div>
                                <p className="leading-relaxed mt-3">
                                    La entrega se realizará en nuestras oficinas en Portoviejo, Ecuador, previa coordinación
                                    de fecha y hora.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">8. Obligaciones Fiscales</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">
                                    El ganador es responsable de:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Impuestos de transferencia del vehículo</li>
                                    <li>Gastos de matriculación y placas</li>
                                    <li>Cualquier otro impuesto que la ley requiera</li>
                                </ul>

                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">9. Causas de Descalificación</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Un participante será descalificado si:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Proporciona información falsa o fraudulenta</li>
                                    <li>Intenta manipular el sistema o el sorteo</li>
                                    <li>No cumple con los requisitos de participación</li>
                                    <li>No reclama el premio en el plazo establecido</li>
                                    <li>No presenta la documentación requerida</li>
                                    <li>Viola los términos y condiciones</li>
                                </ul>
                                <p className="leading-relaxed mt-3 text-red-400">
                                    En caso de descalificación, no habrá reembolso del costo del boleto.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">10. Transparencia y Verificación</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Para garantizar transparencia:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Se realizará transmisión en vivo por nuestras redes sociales</li>
                                    <li>Los participantes pueden verificar la validez de los números</li>
                                    <li>Se mantendrá registro completo del proceso</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">11. Cancelación del Sorteo</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">
                                    SobreRuedas Ecuador se reserva el derecho de cancelar el sorteo en caso de:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Fuerza mayor o caso fortuito</li>
                                    <li>Orden de autoridad competente</li>
                                    <li>Fraude o irregularidades detectadas</li>
                                    <li>Imposibilidad de adquirir el premio anunciado</li>
                                </ul>
                                <p className="leading-relaxed mt-3 text-red-400">
                                    En caso de cancelación, no se realizará reembolso alguno, dado que los fondos recaudados
                                    se destinarán a cubrir los costos administrativos, logísticos y de auditoría del proceso.
                                </p>
                            </div>
                        </section>


                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">12. Uso de Imagen</h3>
                            <p className="text-sm leading-relaxed">
                                El ganador autoriza a SobreRuedas Ecuador a utilizar su nombre, fotografía y testimonio
                                para fines publicitarios y de marketing, sin compensación adicional. Si el ganador no
                                desea que se publique su imagen, debe manifestarlo por escrito, respetando su derecho
                                a la privacidad.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">13. Resolución de Conflictos</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">
                                    Cualquier disputa relacionada con el sorteo será resuelta mediante:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Diálogo directo con el organizador como primera instancia</li>
                                    <li>Mediación ante centro de mediación autorizado</li>
                                    <li>Jurisdicción de los tribunales de Portoviejo, Manabí</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">14. Modificaciones al Reglamento</h3>
                            <p className="text-sm leading-relaxed">
                                SobreRuedas Ecuador se reserva el derecho de modificar este reglamento antes del inicio
                                del sorteo. Las modificaciones serán notificadas con al menos 7 días de anticipación y
                                publicadas en la plataforma.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">15. Información y Contacto</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">
                                    Para consultas sobre el sorteo:
                                </p>
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-1">
                                    <p><strong className="text-white">Email:</strong> sorteos@sobreruedas.ec</p>
                                    <p><strong className="text-white">Teléfono:</strong> +593 99 123 4567</p>
                                    <p><strong className="text-white">WhatsApp:</strong> +593 99 123 4567</p>
                                    <p><strong className="text-white">Horario:</strong> Lun - Dom, 8:00 AM - 10:00 PM</p>
                                    <p><strong className="text-white">Dirección:</strong> Portoviejo, Manabí, Ecuador</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700">
                            {/*     <p className="text-sm text-yellow-300">
                                <strong className="text-white">Autorización Legal:</strong> Este sorteo está autorizado
                                y cumple con toda la normativa ecuatoriana vigente en materia de juegos de azar y sorteos.
                            </p> */}
                            <p className="text-sm text-yellow-300 mt-2">
                                <strong className="text-white">Última actualización:</strong> 25 de Octubre de 2025
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 px-6 py-4 flex justify-end">
                    <Button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Entendido
                    </Button>
                </div>
            </div>
        </div>
    );
}
