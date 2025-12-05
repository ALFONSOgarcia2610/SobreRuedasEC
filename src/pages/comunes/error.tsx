import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function Error404Page() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="text-center space-y-4">
            {/* Logo */}
            <div className="flex justify-center mb-2">
              <img 
                src="/img/logoSR.png" 
                alt="Logo SobreRuedasEc" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-90"
              />
            </div>

            {/* 404 Grande */}
            <div className="relative">
              <h1 className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 animate-pulse">
                404
              </h1>
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-amber-600/20 -z-10"></div>
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                ¡Oops! Página no encontrada
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
                Parece que esta ruta no existe. La página que buscas puede haber sido movida o eliminada.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center pt-3">
              <Button
                onClick={() => navigate({ to: '/landing' })}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-5 h-9 text-sm"
              >
                <Home className="mr-2 h-3.5 w-3.5" />
                Ir al Inicio
              </Button>
              
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-700/50 px-5 h-9 text-sm"
              >
                <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                Volver Atrás
              </Button>
            </div>

            {/* Sugerencias */}
            <div className="pt-4 border-t border-slate-700 mt-4">
              <p className="text-xs text-gray-400 mb-2">
                ¿Qué te gustaría hacer?
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => navigate({ to: '/landing' })}
                  className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  Ver sorteos activos
                </button>
                <span className="text-gray-600">•</span>
                <button
                  onClick={() => navigate({ to: '/register' })}
                  className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  Crear cuenta
                </button>
                <span className="text-gray-600">•</span>
                <button
                  onClick={() => navigate({ to: '/login' })}
                  className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decoración de fondo */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
