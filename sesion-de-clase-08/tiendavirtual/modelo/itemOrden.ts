import { Orden } from "./orden";
import { Producto } from "./producto";

export interface ItemOrden {
    id: number;
    orden: Orden;
    producto: Producto;
    cantidad: number;
    subTotal: number;
};
