import { Carrito } from "./carrito";

export interface Cliente {
    id: number;
    dni: string;
    nombre: string;
    apellidos: string;
    carritos: Carrito[];
}
