import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Shield, Gift, Loader2 } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { TerminosCondiciones, PoliticaPrivacidad } from "@/pages/landing/componentes/modales"
import { useRegisterUser } from "@/Services/auth.mutation"
import type { RegisterUserDto } from "@/interfaces/usuario/usuario.interface"
import { toast } from "sonner"

export default function RegistroForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const registerMutation = useRegisterUser();
    
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
    const [recibirPromociones, setRecibirPromociones] = useState(true);

    // Estado del formulario
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        identification: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        province: '',
    });

    // Manejar cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Manejar el submit del formulario
    const handleSubmit = () => {
        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no coinciden', {
                description: 'Por favor verifica que ambas contraseñas sean iguales',
            });
            return;
        }

        // Validar términos y condiciones
        if (!aceptaTerminos || !aceptaPrivacidad) {
            toast.warning('Términos y condiciones requeridos', {
                description: 'Debes aceptar los términos y condiciones para continuar',
            });
            return;
        }

        // Preparar los datos para enviar
        const userData: RegisterUserDto = {
            userStateCode: "ACTIVE", // Activo
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            province: formData.province,
            identification: formData.identification,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
            sendNotices: recibirPromociones,
        };

        // Ejecutar la mutación
        registerMutation.mutate(userData, {
            onSuccess: () => {
                // El toast se muestra automáticamente en la mutación
                // Redirigir al dashboard después de un pequeño delay
                setTimeout(() => {
                    navigate({ to: '/dashboard' });
                }, 2000);
            },
        });
    };

    return (
        <div className={cn("flex flex-col gap-4 sm:gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 max-w-6xl mx-auto bg-slate-800 border-slate-700">
                <CardContent className="p-0">
                    <form className="p-4 sm:p-6 md:p-8">
                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
                                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                                <h1 className="text-xl sm:text-2xl font-bold text-white">Crear Cuenta</h1>
                            </div>
                            <p className="text-gray-400 text-balance text-sm sm:text-base">
                                Únete a SobreRuedas y participa en nuestros sorteos
                            </p>
                        </div>

                        {/* Formulario en dos columnas */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">

                            {/* Columna Izquierda */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Datos Personales */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                                        <div className="w-1 h-3 sm:h-4 bg-amber-400 rounded-full"></div>
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                            Información Personal
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                        <div className="grid gap-1.5 sm:gap-2">
                                            <Label htmlFor="firstName" className="text-gray-300 text-xs sm:text-sm">Nombres *</Label>
                                            <Input
                                                id="firstName"
                                                type="text"
                                                placeholder="Ej: Juan Carlos"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                            />
                                        </div>
                                        <div className="grid gap-1.5 sm:gap-2">
                                            <Label htmlFor="lastName" className="text-gray-300 text-xs sm:text-sm">Apellidos *</Label>
                                            <Input
                                                id="lastName"
                                                type="text"
                                                placeholder="Ej: García López"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-1.5 sm:gap-2">
                                        <Label htmlFor="identification" className="text-gray-300 text-xs sm:text-sm">Cédula de Identidad *</Label>
                                        <Input
                                            id="identification"
                                            type="text"
                                            placeholder="Ej: 1234567890"
                                            maxLength={10}
                                            value={formData.identification}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                        />
                                        <p className="text-[10px] sm:text-xs text-gray-400">
                                            Necesaria para verificar la identidad del ganador y Facturación
                                        </p>
                                    </div>

                                    <div className="grid gap-1.5 sm:gap-2">
                                        <Label htmlFor="phoneNumber" className="text-gray-300 text-xs sm:text-sm">Teléfono/Celular *</Label>
                                        <Input
                                            id="phoneNumber"
                                            type="tel"
                                            placeholder="Ej: 0998765432"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                        />
                                    </div>
                                </div>

                                {/* Credenciales */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                                        <div className="w-1 h-3 sm:h-4 bg-purple-400 rounded-full"></div>
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                            Credenciales de Acceso
                                        </h3>
                                    </div>

                                    <div className="grid gap-1.5 sm:gap-2">
                                        <Label htmlFor="password" className="text-gray-300 text-xs sm:text-sm">Contraseña *</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Mínimo 8 caracteres"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                        />
                                    </div>

                                    <div className="grid gap-1.5 sm:gap-2">
                                        <Label htmlFor="confirmPassword" className="text-gray-300 text-xs sm:text-sm">Confirmar Contraseña *</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Repite tu contraseña"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Datos de Contacto */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                                        <div className="w-1 h-3 sm:h-4 bg-blue-400 rounded-full"></div>
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                            Información de Contacto
                                        </h3>
                                    </div>

                                    <div className="grid gap-1.5 sm:gap-2">
                                        <Label htmlFor="email" className="text-gray-300 text-xs sm:text-sm">Correo Electrónico *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="ejemplo@correo.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                        />
                                    </div>

                                    <div className="grid gap-1.5 sm:gap-2">
                                        <Label htmlFor="address" className="text-gray-300 text-xs sm:text-sm">Dirección Completa *</Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            placeholder="Ej: Av. Principal 123 y Calle Secundaria"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="grid gap-1.5 sm:gap-2">
                                            <Label htmlFor="city" className="text-gray-300 text-xs sm:text-sm">Ciudad *</Label>
                                            <Input
                                                id="city"
                                                type="text"
                                                placeholder="Ej: Quito"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                            />
                                        </div>
                                        <div className="grid gap-1.5 sm:gap-2">
                                            <Label htmlFor="province" className="text-gray-300 text-xs sm:text-sm">Provincia *</Label>
                                            <Input
                                                id="province"
                                                type="text"
                                                placeholder="Ej: Pichincha"
                                                value={formData.province}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400 text-sm h-9 sm:h-10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Términos y Condiciones - En columna derecha */}
                                <div className="space-y-3 sm:space-y-4 border-t border-slate-700 pt-4 sm:pt-6">
                                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                                        <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                            Aceptación de Términos
                                        </h3>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <Checkbox
                                                id="terminos"
                                                checked={aceptaTerminos}
                                                onCheckedChange={(checked) => setAceptaTerminos(checked as boolean)}
                                                className="mt-0.5 border-2 border-amber-400 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="terminos" className="text-xs sm:text-sm leading-relaxed cursor-pointer text-gray-300">
                                                    Acepto los{" "}
                                                    <TerminosCondiciones
                                                        trigger={
                                                            <button
                                                                type="button"
                                                                className="text-amber-400 underline hover:text-amber-300 font-medium"
                                                            >
                                                                Términos y Condiciones
                                                            </button>
                                                        }
                                                    />{" "}
                                                    del sorteo *
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <Checkbox
                                                id="privacidad"
                                                checked={aceptaPrivacidad}
                                                onCheckedChange={(checked) => setAceptaPrivacidad(checked as boolean)}
                                                className="mt-0.5 border-2 border-amber-400 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="privacidad" className="text-xs sm:text-sm leading-relaxed cursor-pointer text-gray-300">
                                                    Acepto la{" "}
                                                    <PoliticaPrivacidad
                                                        trigger={
                                                            <button
                                                                type="button"
                                                                className="text-amber-400 underline hover:text-amber-300 font-medium"
                                                            >
                                                                Política de Privacidad
                                                            </button>
                                                        }
                                                    />{" "}
                                                    y el tratamiento de mis datos *
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <Checkbox
                                                id="promociones"
                                                checked={recibirPromociones}
                                                onCheckedChange={(checked) => setRecibirPromociones(checked as boolean)}
                                                className="mt-0.5 border-2 border-amber-400 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="promociones" className="text-xs sm:text-sm leading-relaxed cursor-pointer text-gray-300">
                                                    Deseo recibir información sobre nuevos sorteos y promociones
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nota importante */}
                                    <div className="bg-amber-900/20 border border-amber-400/30 rounded-lg p-2.5 sm:p-3 mt-3 sm:mt-4">
                                        <div className="flex items-start space-x-2">
                                            <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                            <div className="text-[10px] sm:text-xs text-amber-200">
                                                <p className="font-semibold mb-1">Importante:</p>
                                                <p>
                                                    Todos los datos son verificados antes de la entrega del premio.
                                                    Asegúrate de que la información sea correcta y actualizada.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón de Registro - Ancho completo */}
                        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 sm:py-3 text-sm sm:text-base h-10 sm:h-11"
                                disabled={!aceptaTerminos || !aceptaPrivacidad || registerMutation.isPending}
                            >
                                {registerMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 animate-spin" />
                                        Registrando...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                        Crear Cuenta y Participar
                                    </>
                                )}
                            </Button>

                            {/* Link a Login */}
                            <div className="text-center text-xs sm:text-sm">
                                <span className="text-gray-400">¿Ya tienes cuenta?</span>{" "}
                                <Link to="/login" className="underline underline-offset-4 text-amber-400 hover:text-amber-300">
                                    Inicia Sesión
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
