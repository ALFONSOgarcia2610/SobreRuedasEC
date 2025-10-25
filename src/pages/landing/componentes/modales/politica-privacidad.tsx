import { 
    Dialog, 
    DialogTrigger, 
    DialogPopup, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
} from "@/components/animate-ui/components/base/dialog";

interface PoliticaPrivacidadProps {
    trigger: React.ReactNode;
}

export function PoliticaPrivacidad({ trigger }: PoliticaPrivacidadProps) {
    return (
        <Dialog>
            <DialogTrigger >
                {trigger}
            </DialogTrigger>
            <DialogPopup className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700">
                <DialogHeader className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                        <img src="/img/logoSR.png" alt="Logo SobreRuedasEc" className="w-8 h-8 object-contain" />
                    </div>
                    <DialogTitle className="text-base font-bold text-white">Política de Privacidad y Tratamiento de Datos</DialogTitle>
                    <DialogDescription className="sr-only">
                        Información sobre cómo recopilamos, usamos y protegemos sus datos personales
                    </DialogDescription>
                </DialogHeader>

                {/* Content */}
                <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)] text-gray-300">
                    <div className="space-y-6">
                        <section>
                            <p className="text-sm leading-relaxed">
                                En SobreRuedas Ecuador nos comprometemos a proteger su privacidad y sus datos personales.
                                Esta política explica cómo recopilamos, usamos, compartimos y protegemos su información.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">1. Información que Recopilamos</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Información Personal:</h4>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Nombre completo</li>
                                        <li>Número de cédula de identidad</li>
                                        <li>Fecha de nacimiento</li>
                                        <li>Dirección de residencia</li>
                                        <li>Correo electrónico</li>
                                        <li>Número de teléfono</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Información de Pago:</h4>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        {/* <li>Datos de tarjeta de crédito/débito (encriptados)</li>
                                        <li>Historial de transacciones</li> */}
                                        <li>Información de facturación</li>
                                    </ul>
                                </div>
                                {/*   <div>
                                    <h4 className="font-semibold text-white mb-2">Información de Uso:</h4>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Dirección IP</li>
                                        <li>Tipo de navegador</li>
                                        <li>Páginas visitadas</li>
                                        <li>Tiempo de navegación</li>
                                        <li>Dispositivo utilizado</li>
                                    </ul>
                                </div> */}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">2. Cómo Utilizamos su Información</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Utilizamos sus datos personales para:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Procesar su registro y compra de boletos</li>
                                    <li>Verificar su identidad y edad</li>
                                    <li>Realizar los sorteos y notificar a los ganadores</li>
                                    <li>Procesar pagos y prevenir fraudes</li>
                                    <li>Enviar confirmaciones y actualizaciones importantes</li>
                                    <li>Mejorar nuestros servicios y experiencia de usuario</li>
                                    <li>Cumplir con obligaciones legales y fiscales</li>
                                    <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">3. Base Legal para el Tratamiento</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Procesamos sus datos bajo las siguientes bases legales:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><strong className="text-white">Consentimiento:</strong> Para enviar comunicaciones de marketing</li>
                                    <li><strong className="text-white">Obligación legal:</strong> Para cumplir con requisitos fiscales y regulatorios</li>
                                    <li><strong className="text-white">Interés legítimo:</strong> Para prevenir fraudes y mejorar nuestros servicios</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">4. Compartir Información</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Podemos compartir su información con:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><strong className="text-white">Procesadores de pago:</strong> Para procesar transacciones de forma segura</li>
                                    <li><strong className="text-white">Autoridades competentes:</strong> Cuando sea requerido por ley</li>
                                    <li><strong className="text-white">Proveedores de servicios:</strong> Que nos ayudan a operar la plataforma (hosting, email, etc.)</li>
                                </ul>
                                <p className="leading-relaxed mt-3">
                                    <strong className="text-white">Importante:</strong> Nunca vendemos sus datos personales a terceros.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">5. Seguridad de los Datos</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Implementamos medidas de seguridad robustas:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Encriptación SSL/TLS para todas las transmisiones</li>
                                    <li>Almacenamiento seguro en servidores protegidos</li>
                                    <li>Acceso limitado a datos personales por personal autorizado</li>
                                    <li>Monitoreo de actividades sospechosas</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">6. Sus Derechos</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Usted tiene derecho a:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><strong className="text-white">Acceso:</strong> Solicitar una copia de sus datos personales</li>
                                    <li><strong className="text-white">Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">7. Retención de Datos</h3>
                            <p className="text-sm leading-relaxed">
                                Conservamos sus datos personales durante el tiempo necesario para cumplir con los fines
                                descritos en esta política, incluyendo requisitos legales, contables y de informes.
                                Los datos de transacciones se mantienen por un mínimo de 7 años.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">8. Cookies y Tecnologías Similares</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">Utilizamos cookies para:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Mantener su sesión activa</li>
                                    <li>Recordar sus preferencias</li>
                                    <li>Analizar el uso de la plataforma</li>
                                    <li>Mejorar la experiencia del usuario</li>
                                </ul>
                                <p className="leading-relaxed mt-3">
                                    Puede gestionar las cookies desde la configuración de su navegador.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">9. Transferencias Internacionales</h3>
                            <p className="text-sm leading-relaxed">
                                Sus datos se almacenan principalmente en servidores ubicados en Ecuador. En caso de
                                transferencias internacionales (ej. servicios en la nube), nos aseguramos de que existan
                                garantías adecuadas de protección de datos.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">10. Menores de Edad</h3>
                            <p className="text-sm leading-relaxed">
                                Nuestros servicios están dirigidos exclusivamente a personas mayores de 18 años.
                                No recopilamos intencionalmente información de menores. Si detectamos que hemos
                                recopilado datos de un menor, los eliminaremos inmediatamente.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">11. Cambios a esta Política</h3>
                            <p className="text-sm leading-relaxed">
                                Podemos actualizar esta política periódicamente. Los cambios significativos serán
                                notificados por correo electrónico o mediante un aviso destacado en la plataforma.
                                Le recomendamos revisar esta política regularmente.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mb-3">12. Contacto</h3>
                            <div className="space-y-2 text-sm">
                                <p className="leading-relaxed">
                                    Para consultas sobre privacidad y protección de datos:
                                </p>
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-1">
                                    <p><strong className="text-white">Email:</strong> privacidad@sobreruedas.ec</p>
                                    <p><strong className="text-white">Teléfono:</strong> +593 99 123 4567</p>
                                    <p><strong className="text-white">Dirección:</strong> Portoviejo, Manabí, Ecuador</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
                            <p className="text-sm text-blue-300">
                                <strong className="text-white">Última actualización:</strong> 25 de Octubre de 2025
                            </p>
                            <p className="text-sm text-blue-300 mt-2">
                                Esta política cumple con la Ley Orgánica de Protección de Datos Personales de Ecuador.
                            </p>
                        </section>
                    </div>
                </div>
            </DialogPopup>
        </Dialog>
    );
}
