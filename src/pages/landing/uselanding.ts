import { useImagenesCarros } from "../services/landing.query";



export function ImagenesCarro() {
    const ImagenesCarros = useImagenesCarros();
    return ImagenesCarros;
}