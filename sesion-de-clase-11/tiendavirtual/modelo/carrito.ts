import { Cliente } from "./cliente";
import { ItemCarrito } from "./itemCarrito";

export interface Carrito {
    id: number;
    nombre: string;
    fecha: Date;
    cliente?: Cliente;
    items?: ItemCarrito[];
};
