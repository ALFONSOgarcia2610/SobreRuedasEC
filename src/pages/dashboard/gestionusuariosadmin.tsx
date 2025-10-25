
import { AnimatedCircularProgressBarDemo } from "../comunes/CircularBar";
import SidebarPage from "../comunes/sidebarPage";


export default function PageGestionUsuariosAdmin() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Dashboard", isActive: true }
  ]
  return (
    <SidebarPage breadcrumbs={breadcrumbs} >

      <div className=" bg-slate-900 relative overflow-y-auto">
        <AnimatedCircularProgressBarDemo />
      </div>

    </SidebarPage>
  );
}   