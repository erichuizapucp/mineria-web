import { Carrito } from "./carrito";
import { Producto } from "./producto";

export interface ItemCarrito {
  id: number;
  carrito: Carrito;
  producto: Producto;
  cantidad: number;
  subTotal: number;
};
