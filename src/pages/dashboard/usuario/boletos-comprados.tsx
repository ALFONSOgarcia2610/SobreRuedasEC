import SidebarPage from "@/pages/comunes/sidebarPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Calendar,
    Clock,
    Ticket,
    Trophy,
    Eye,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Download
} from "lucide-react";

// Interfaz para los boletos comprados
interface BoletoComprado {
    id: string;
    numeroSorteo: string;
    fechaCompra: string;
    horaCompra: string;
    cantidadBoletos: number;
    montoTotal: number;
    numerosBoletos: string[];
    estado: 'activo' | 'usado' | 'ganador' | 'perdedor';
    fechaSorteo?: string;
    premio?: number;
}

// Datos de ejemplo
const boletosEjemplo: BoletoComprado[] = [
    {
        id: "1",
        numeroSorteo: "SOR-2025-001",
        fechaCompra: "2025-09-29",
        horaCompra: "14:30",
        cantidadBoletos: 6,
        montoTotal: 9.0,
        numerosBoletos: ["001234", "001235", "001236", "001237", "001238", "001239"],
        estado: "activo",
        fechaSorteo: "2025-10-15"
    },
    {
        id: "2",
        numeroSorteo: "SOR-2025-002",
        fechaCompra: "2025-09-28",
        horaCompra: "10:15",
        cantidadBoletos: 10,
        montoTotal: 15.0,
        numerosBoletos: ["002100", "002101", "002102", "002103", "002104", "002105", "002106", "002107", "002108", "002109"],
        estado: "perdedor",
        fechaSorteo: "2025-09-28"
    },
    {
        id: "3",
        numeroSorteo: "SOR-2025-003",
        fechaCompra: "2025-09-27",
        horaCompra: "16:45",
        cantidadBoletos: 8,
        montoTotal: 12.0,
        numerosBoletos: ["003456", "003457", "003458", "003459", "003460", "003461", "003462", "003463"],
        estado: "ganador",
        fechaSorteo: "2025-09-27",
        premio: 150
    }
];

const BoletosCompradosContent = () => {
    const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'ganador' | 'perdedor'>('todos');

    const boletosFiltrados = filtroEstado === 'todos'
        ? boletosEjemplo
        : boletosEjemplo.filter(boleto => boleto.estado === filtroEstado);

    const getEstadoIcon = (estado: BoletoComprado['estado']) => {
        switch (estado) {
            case 'activo':
                return <AlertCircle className="h-4 w-4 text-blue-400" />;
            case 'ganador':
                return <CheckCircle2 className="h-4 w-4 text-green-400" />;
            case 'perdedor':
                return <XCircle className="h-4 w-4 text-red-400" />;
            default:
                return <Clock className="h-4 w-4 text-gray-400" />;
        }
    };

    const getEstadoColor = (estado: BoletoComprado['estado']) => {
        switch (estado) {
            case 'activo':
                return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'ganador':
                return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'perdedor':
                return 'text-red-400 bg-red-400/10 border-red-400/20';
            default:
                return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    const getEstadoLabel = (estado: BoletoComprado['estado']) => {
        switch (estado) {
            case 'activo':
                return 'Pendiente';
            case 'ganador':
                return 'Ganador';
            case 'perdedor':
                return 'No Ganó';
            default:
                return 'Desconocido';
        }
    };


    return (
        <div className="w-full bg-[#020617] min-h-screen p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Mis Boletos Comprados</h1>
                <p className="text-gray-400">Revisa el historial y estado de todos tus boletos</p>
            </div>
            {/* Filtros */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={filtroEstado === 'todos' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFiltroEstado('todos')}
                        className={`${filtroEstado === 'todos'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800'
                            }`}
                    >
                        Todos
                    </Button>
                    <Button
                        variant={filtroEstado === 'activo' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFiltroEstado('activo')}
                        className={`${filtroEstado === 'activo'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800'
                            }`}
                    >
                        Pendientes
                    </Button>
                    <Button
                        variant={filtroEstado === 'ganador' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFiltroEstado('ganador')}
                        className={`${filtroEstado === 'ganador'
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800'
                            }`}
                    >
                        Ganadores
                    </Button>
                    <Button
                        variant={filtroEstado === 'perdedor' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFiltroEstado('perdedor')}
                        className={`${filtroEstado === 'perdedor'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800'
                            }`}
                    >
                        No Ganaron
                    </Button>
                </div>
            </div>

            {/* Lista de Boletos */}
            <div className="space-y-4">
                {boletosFiltrados.map((boleto) => (
                    <Card key={boleto.id} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-200">
                        <div className="p-6">
                            {/* Header del boleto */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        Sorteo {boleto.numeroSorteo}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {boleto.fechaCompra}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {boleto.horaCompra}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getEstadoColor(boleto.estado)}`}>
                                        {getEstadoIcon(boleto.estado)}
                                        <span className="text-sm font-medium">{getEstadoLabel(boleto.estado)}</span>
                                    </div>
                                    {boleto.estado === 'ganador' && boleto.premio && (
                                        <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                                            <span className="text-yellow-400 font-bold text-sm">
                                                Premio: ${boleto.premio}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contenido del boleto */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Información de la compra */}
                                <div className="space-y-3">
                                    <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                                        Detalles de Compra
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400 text-sm">Cantidad:</span>
                                            <span className="text-white font-medium">{boleto.cantidadBoletos} boletos</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400 text-sm">Total pagado:</span>
                                            <span className="text-white font-medium">${boleto.montoTotal}</span>
                                        </div>
                                        {boleto.fechaSorteo && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400 text-sm">Fecha sorteo:</span>
                                                <span className="text-white font-medium">{boleto.fechaSorteo}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Números de boletos */}
                                <div className="lg:col-span-2 space-y-3">
                                    <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                                        Números de Boletos
                                    </h4>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                                        {boleto.numerosBoletos.map((numero, index) => (
                                            <div
                                                key={index}
                                                className="px-3 py-2 bg-slate-700/70 border border-slate-600/50 rounded-lg text-center"
                                            >
                                                <span className="text-white font-mono text-sm font-medium">
                                                    {numero}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-700/50">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent border-slate-600 text-gray-400 hover:bg-slate-700 hover:text-white hover:border-slate-500"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver Detalles
                                </Button>

                                {boleto.estado === 'activo' && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                                    >
                                        <AlertCircle className="h-4 w-4 mr-2" />
                                        Revisar Sorteo
                                    </Button>
                                )}

                                {boleto.estado === 'ganador' && (
                                    <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                                    >
                                        <Trophy className="h-4 w-4 mr-2" />
                                        Reclamar Premio
                                    </Button>
                                )}

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent border-slate-600 text-gray-400 hover:bg-slate-700 hover:text-white hover:border-slate-500"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Descargar
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Estado vacío */}
            {boletosFiltrados.length === 0 && (
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                    <div className="p-12 text-center">
                        <Ticket className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {filtroEstado === 'todos' ? 'No tienes boletos comprados' : `No hay boletos ${getEstadoLabel(filtroEstado)}`}
                        </h3>
                        <p className="text-gray-400 mb-6">
                            {filtroEstado === 'todos'
                                ? '¡Empieza a jugar y compra tu primer boleto!'
                                : 'Intenta con otro filtro para ver más boletos.'
                            }
                        </p>
                        {filtroEstado === 'todos' && (
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Ticket className="h-4 w-4 mr-2" />
                                Comprar Boletos
                            </Button>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default function BoletosComprados() {
    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Boletos Comprados", isActive: true }
    ];

    return (
        <SidebarPage breadcrumbs={breadcrumbs}>
            <BoletosCompradosContent />
        </SidebarPage>
    );
}