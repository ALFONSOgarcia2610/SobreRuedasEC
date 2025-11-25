import { 
    Dialog, 
    DialogTrigger, 
    DialogPopup, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
} from "@/components/animate-ui/components/base/dialog";

interface TerminosCondicionesProps {
    trigger: React.ReactNode;
}

export function TerminosCondiciones({ trigger }: TerminosCondicionesProps) {
    return (
        <Dialog>
            <DialogTrigger >
                {trigger}
            </DialogTrigger>
            <DialogPopup className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700">
                <DialogHeader className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                        <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-8 h-8 object-contain" />
                    </div>
                    <DialogTitle className="text-base font-bold text-white">Términos y Condiciones</DialogTitle>
                    <DialogDescription className="sr-only">
                        Términos y condiciones de uso de la plataforma SobreRuedas Ecuador
                    </DialogDescription>
                </DialogHeader>

                {/* Content */}
                <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)] text-gray-300">
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">1. Aceptación de los Términos</h3>
                            <p className="text-sm leading-relaxed">
                                Al acceder y utilizar la plataforma SobreRuedas Ecuador, usted acepta estar sujeto a estos
                                términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos,
                                no debe utilizar nuestros servicios.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">2. Descripción del Servicio</h3>
                            <p className="text-sm leading-relaxed">
                                SobreRuedas Ecuador es una plataforma digital que facilita la participación en sorteos
                                de vehículos y otros premios.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">3. Registro de Usuario</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Para participar en los sorteos, debe:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Ser mayor de 18 años</li>
                                    <li>Proporcionar información verídica y actualizada</li>
                                    <li>Mantener la confidencialidad de su cuenta</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">4. Compra de Boletos</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Al comprar boletos en nuestra plataforma:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>El precio por boleto puede variar conforme al sorteo</li>
                                    <li>Los pagos son procesados de forma segura</li>
                                    <li>No se permiten reembolsos una vez confirmada la compra</li>
                                    <li>Cada boleto tiene un número único e irrepetible</li>
                                    <li>Recibirá confirmación por correo electrónico de su compra</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">5. Realización del Sorteo</h3>
                            <p className="text-sm leading-relaxed">
                                Los sorteos se realizarán en las fechas anunciadas públicamente cuando se complete la venta del 100% de los boletos, El ganador sera seleccionado conforme los resultados de la Loteria Nacional. El proceso es completamente
                                transparente. Los resultados son definitivos e inapelables.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">6. Premios y Reclamación</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">En caso de resultar ganador:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Será notificado a través de correo electrónico y teléfono</li>
                                    <li>Debe reclamar su premio en un plazo máximo de 60 días</li>
                                    <li>Debe presentar identificación válida</li>
                                    <li>Los impuestos aplicables son responsabilidad del ganador</li>
                                    <li>No se permite la transferencia del premio a terceros</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">7. Responsabilidades del Usuario</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">El usuario se compromete a:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Utilizar la plataforma de manera responsable</li>
                                    <li>Mantener actualizada su información de contacto</li>
                                    <li>Cumplir con todas las leyes aplicables</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">8. Limitación de Responsabilidad</h3>
                            <p className="text-sm leading-relaxed">
                                SobreRuedas Ecuador no se hace responsable por pérdidas o daños indirectos, incidentales
                                o consecuentes que puedan surgir del uso de la plataforma. Nos reservamos el derecho de
                                suspender o cancelar sorteos en caso de fuerza mayor.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">9. Modificaciones</h3>
                            <p className="text-sm leading-relaxed">
                                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
                                Los cambios serán notificados a través de la plataforma y entrarán en vigencia inmediatamente
                                después de su publicación.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">10. Jurisdicción</h3>
                            <p className="text-sm leading-relaxed">
                                Estos términos se rigen por las leyes de la República del Ecuador. Cualquier disputa será
                                resuelta en los tribunales competentes de Portoviejo, Manabí.
                            </p>
                        </section>

                        <section className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <p className="text-sm text-gray-400">
                                <strong className="text-white">Última actualización:</strong> 27 Noviembre de 2025
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Para consultas sobre estos términos, contáctenos a: sobreruedasec@hotmail.com
                            </p>
                        </section>
                    </div>
                </div>
            </DialogPopup>
        </Dialog>
    );
}
