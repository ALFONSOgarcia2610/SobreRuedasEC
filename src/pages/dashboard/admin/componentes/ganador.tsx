import { useState } from "react";
import { Ganador } from "./CreateProduct";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Tickets } from "lucide-react";

export function TicketGanadorInput() {
    const [numero, setNumero] = useState<number | "">("");
    const [consultar, setConsultar] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            <input
                type="number"
                min={1}
                placeholder="Número de ticket"
                value={numero}
                onChange={e => setNumero(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-2 rounded bg-slate-900 text-white border border-slate-700 focus:border-blue-500 focus:outline-none"
            />
            <ShinyButton
                className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-amber-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-amber-500/60 hover:scale-105 border-2 border-yellow-500/70 relative overflow-hidden"
                onClick={() => setConsultar(typeof numero === "number" && numero > 0 ? numero : null)}
            >
                <div className="flex items-center space-x-2 relative z-10">
                    <Tickets size={16} className="text-amber-900 animate-pulse drop-shadow-sm" />
                    <span className="text-amber-900 font-bold drop-shadow-sm">¡Descubre Ahora!</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30"></div>
            </ShinyButton>
            {typeof consultar === "number" && consultar > 0 && (
                <Ganador numeroTicket={consultar} />
            )}
        </div>
    );
}