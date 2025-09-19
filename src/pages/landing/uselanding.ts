import { useImagenesCarros, useSorteoCarros } from "../services/landing.query";

export function ImagenesCarro() {
    const ImagenesCarros = useImagenesCarros();
    const DatosSorteo = useSorteoCarros();
    return {
        ImagenesCarros,
        DatosSorteo
    };
}