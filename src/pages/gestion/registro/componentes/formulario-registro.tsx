import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Shield, Gift } from "lucide-react"
import { useState } from "react"
import { Link } from "@tanstack/react-router"

export default function RegistroForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
    const [recibirPromociones, setRecibirPromociones] = useState(true);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 max-w-6xl mx-auto">
                <CardContent className="p-0">
                    <form className="p-6 md:p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center space-x-2 mb-3">
                                <UserPlus className="w-6 h-6 text-green-600" />
                                <h1 className="text-2xl font-bold">Crear Cuenta</h1>
                            </div>
                            <p className="text-muted-foreground text-balance">
                                Únete a SobreRuedas y participa en nuestros sorteos
                            </p>
                        </div>

                        {/* Formulario en dos columnas */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Columna Izquierda */}
                            <div className="space-y-6">
                                {/* Datos Personales */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                            Información Personal
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="nombres">Nombres *</Label>
                                            <Input
                                                id="nombres"
                                                type="text"
                                                placeholder="Ej: Juan Carlos"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="apellidos">Apellidos *</Label>
                                            <Input
                                                id="apellidos"
                                                type="text"
                                                placeholder="Ej: García López"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="cedula">Cédula de Identidad *</Label>
                                        <Input
                                            id="cedula"
                                            type="text"
                                            placeholder="Ej: 1234567890"
                                            maxLength={10}
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Necesaria para verificar la identidad del ganador y Facturación
                                        </p>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="telefono">Teléfono/Celular *</Label>
                                        <Input
                                            id="telefono"
                                            type="tel"
                                            placeholder="Ej: 0998765432"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Credenciales */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                            Credenciales de Acceso
                                        </h3>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Contraseña *</Label>
                                        <Input 
                                            id="password" 
                                            type="password" 
                                            placeholder="Mínimo 8 caracteres"
                                            required 
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="confirmarPassword">Confirmar Contraseña *</Label>
                                        <Input 
                                            id="confirmarPassword" 
                                            type="password" 
                                            placeholder="Repite tu contraseña"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha */}
                            <div className="space-y-6">
                                {/* Datos de Contacto */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                            Información de Contacto
                                        </h3>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Correo Electrónico *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="ejemplo@correo.com"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="direccion">Dirección Completa *</Label>
                                        <Input
                                            id="direccion"
                                            type="text"
                                            placeholder="Ej: Av. Principal 123 y Calle Secundaria"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="ciudad">Ciudad *</Label>
                                            <Input
                                                id="ciudad"
                                                type="text"
                                                placeholder="Ej: Quito"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="provincia">Provincia *</Label>
                                            <Input
                                                id="provincia"
                                                type="text"
                                                placeholder="Ej: Pichincha"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Términos y Condiciones - En columna derecha */}
                                <div className="space-y-4 border-t pt-6">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                            Aceptación de Términos
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Checkbox 
                                                id="terminos"
                                                checked={aceptaTerminos}
                                                onCheckedChange={(checked) => setAceptaTerminos(checked as boolean)}
                                                className="mt-0.5 border-2 border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="terminos" className="text-sm leading-relaxed cursor-pointer text-gray-800">
                                                    Acepto los{" "}
                                                    <a href="#" className="text-green-600 underline hover:text-green-700 font-medium">
                                                        Términos y Condiciones
                                                    </a>{" "}
                                                    del sorteo *
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Checkbox 
                                                id="privacidad"
                                                checked={aceptaPrivacidad}
                                                onCheckedChange={(checked) => setAceptaPrivacidad(checked as boolean)}
                                                className="mt-0.5 border-2 border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="privacidad" className="text-sm leading-relaxed cursor-pointer text-gray-800">
                                                    Acepto la{" "}
                                                    <a href="#" className="text-green-600 underline hover:text-green-700 font-medium">
                                                        Política de Privacidad
                                                    </a>{" "}
                                                    y el tratamiento de mis datos *
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Checkbox 
                                                id="promociones"
                                                checked={recibirPromociones}
                                                onCheckedChange={(checked) => setRecibirPromociones(checked as boolean)}
                                                className="mt-0.5 border-2 border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="promociones" className="text-sm leading-relaxed cursor-pointer text-gray-800">
                                                    Deseo recibir información sobre nuevos sorteos y promociones
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nota importante */}
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                                        <div className="flex items-start space-x-2">
                                            <Gift className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <div className="text-xs text-amber-800">
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
                        <div className="mt-8 space-y-4">
                            <Button 
                                type="submit" 
                                className="w-full !bg-green-600 !hover:bg-green-700 text-white font-bold py-3"
                                disabled={!aceptaTerminos || !aceptaPrivacidad}
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Crear Cuenta y Participar
                            </Button>

                            {/* Link a Login */}
                            <div className="text-center text-sm">
                                ¿Ya tienes cuenta?{" "}
                                <Link to="/login" className="underline underline-offset-4">
                                    Inicia Sesión
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Footer Legal */}
            <div className="text-muted-foreground text-center text-xs text-balance space-y-2">
                <p>
                    Al crear tu cuenta, confirmas que tienes al menos 18 años y aceptas participar 
                    en sorteos regidos por la legislación ecuatoriana.
                </p>
                <p>
                    Todos los sorteos están supervisados y son transparentes según la normativa vigente.
                </p>
            </div>
        </div>
    )
}
