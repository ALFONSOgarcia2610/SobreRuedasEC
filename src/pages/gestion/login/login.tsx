import { Header } from "@/pages/landing/componentes/header";
import FormularioInicio from "./componentes/formulario-inicio";
import { Footer } from "@/pages/landing/componentes/footer";

export default function LoginPage() {
    return (
        <>
        <div className=" bg-[#020617]">
            <Header />
        </div>
            
        <div className="w-full bg-[#020617] relative flex  flex-col items-center justify-center p-6 md:p-10">
            
                <div className="w-full max-w-sm md:max-w-4xl">
                    <FormularioInicio />
                </div>
            </div>
            <Footer />
        </>
    )
}
