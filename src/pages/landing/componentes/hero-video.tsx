import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";


export function HeroVideoDialogDemo() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Título y descripción del tutorial */}
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    📹 Tutorial: Cómo Comprar tu Boleto
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
                    Aprende paso a paso cómo realizar tu compra de manera fácil y segura.
                    Este video te guiará a través de todo el proceso para que puedas participar en el sorteo.
                </p>

                {/* Beneficios del tutorial */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="text-2xl mb-2">⏱️</div>
                        <div className="text-sm font-semibold text-blue-800">Proceso Rápido</div>
                        <div className="text-xs text-blue-600">Solo 3 minutos</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-2xl mb-2">🔒</div>
                        <div className="text-sm font-semibold text-green-800">100% Seguro</div>
                        <div className="text-xs text-green-600">Pagos protegidos</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <div className="text-2xl mb-2">📱</div>
                        <div className="text-sm font-semibold text-purple-800">Fácil de Seguir</div>
                        <div className="text-xs text-purple-600">Paso a paso</div>
                    </div>
                </div>
            </div>

            {/* Video Tutorial */}
            <div className="relative flex justify-center">
                <HeroVideoDialog
                    className="block dark:hidden w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto aspect-video mx-auto"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Tutorial de Compra - Modo Claro"
                />

                <HeroVideoDialog
                    className="hidden dark:block w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto aspect-video mx-auto"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Tutorial de Compra - Modo Oscuro"
                />

                {/* Badge del tutorial */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <span>🎥</span>
                    <span>TUTORIAL</span>
                </div>
            </div>

            {/* Pasos del tutorial */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                        <h4 className="font-semibold text-slate-800">Regístrate</h4>
                    </div>
                    <p className="text-sm text-slate-600">Crea tu cuenta con tus datos personales y de contacto</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                        <h4 className="font-semibold text-slate-800">Compra</h4>
                    </div>
                    <p className="text-sm text-slate-600">Realiza el pago de $10 USD por tu boleto</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-500">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                        <h4 className="font-semibold text-slate-800">Verificación</h4>
                    </div>
                    <p className="text-sm text-slate-600">Nuestro equipo verifica y confirma tu pago</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-orange-500">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                        <h4 className="font-semibold text-slate-800">Recibe Números</h4>
                    </div>
                    <p className="text-sm text-slate-600">Una vez verificado, recibes tus números del sorteo</p>
                </div>
            </div>
        </div>
    );
}
