import { AnimatedCircularProgressBarDemo } from "../comunes/CircularBar";
import SidebarPage from "../comunes/sidebarPage";


export default function PageGestionUsuariosAdmin() {
     const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Dashboard", isActive: true }
  ]
  return (
   <SidebarPage breadcrumbs={breadcrumbs} >
        <AnimatedCircularProgressBarDemo />
  </SidebarPage>
  );
}   