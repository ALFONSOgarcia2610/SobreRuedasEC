import SidebarPage from "@/pages/comunes/sidebarPage";
import { PreciosBoletosUsuario } from "./precios-boletos";


export default function PageGestionUsuariosAdmin() {
    const breadcrumbs = [
        { label: "Sorteos", href: "/" },
        { label: "CompraUsuario", isActive: true }
    ]
    return (
        <SidebarPage breadcrumbs={breadcrumbs} >

            <div className=" bg-[#020617] relative overflow-y-auto">
                <PreciosBoletosUsuario />
            </div>
        </SidebarPage>
    );
}   