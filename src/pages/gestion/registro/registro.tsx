import { Header } from "@/pages/landing/componentes/header";
import FormularioRegistro from "./componentes/formulario-registro";
import { Footer } from "@/pages/landing/componentes/footer";

export default function RegistroPage() {
    return (
        <>
            <div className="bg-slate-900">
                <Header />
            </div>
            <div className="w-full bg-slate-900 relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-5xl">
                    <FormularioRegistro />
                </div>
            </div>
            <Footer />
        </>
    )
}
