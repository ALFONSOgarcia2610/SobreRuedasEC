import { Header } from "@/pages/landing/componentes/header";
import FormularioInicio from "./componentes/formulario-inicio";
import { Footer } from "@/pages/landing/componentes/footer";

export default function LoginPage() {
    return (
        <>
            <Header />
            <div className="bg-muted flex  flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <FormularioInicio />
                </div>
            </div>
            <Footer />
        </>
    )
}
