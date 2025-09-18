export interface User {
    idUser: string;
    secuencialPersona: number;
    nombre: string;
    identificacion: string;
    codigo: string;
    correo: string;
    fechaActualizacionClave: Date;
    periodicadClave: number;
    cambiarClave: boolean;
    estaActivo: boolean;
}
