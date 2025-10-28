import { Carrito } from "./carrito";
import { ItemOrden } from "./itemOrden";

export interface Orden {
    id: number;
    numero: string;
    carrito: Carrito;
    fecha: Date;
    items?: ItemOrden[];
    subTotal: number;
    igv: number;
    total: number;
};
