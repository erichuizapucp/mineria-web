import { Carrito } from "@/modelo/carrito";
import { ItemCarrito } from "@/modelo/itemCarrito";
import { clientes } from "./clientes";

const carritos: Carrito[] = [];
let itemsCarrito: ItemCarrito[] = [];
let itemIdCounter = 1;
let carritoIdCounter = 1;

// Crear un carrito por cliente
clientes.forEach(cliente => {
  const carrito: Carrito = {
    id: carritoIdCounter++,
    nombre: `Carrito de ${cliente.nombre}`,
    fecha: new Date(),
    cliente: cliente,
    items: []
  };

  carritos.push(carrito);
  cliente.carritos.push(carrito); // Asocia el carrito al cliente
});

export async function getCarritoPorCliente(clienteId: number): Promise<Carrito | undefined> {
  return carritos.find(c => c.cliente?.id === clienteId);
}

export async function agregarItemAlCarrito(nuevoItem: ItemCarrito) {
    let carrito = carritos.find(c => c.id === nuevoItem.carrito.id);

    if (!carrito) {
        carrito = {
            id: carritoIdCounter++,
            nombre: `Carrito-${carritoIdCounter}-${Date.now()}`,
            fecha: new Date(),
            items: []
        };
        carritos.push(carrito);
        nuevoItem.carrito.cliente?.carritos.push(carrito);
    }

    const item: ItemCarrito = {
        ...nuevoItem,
        id: itemIdCounter++,
        carrito
    };

    carrito.items = [...(carrito.items || []), item];
    itemsCarrito.push(item);

    return carrito;
}

export async function actualizarItemCarrito(id: number, nuevaCantidad: number, subTotal: number): Promise<Carrito> {
    const item = itemsCarrito.find(i => i.id === id);
    if (item) {
        item.cantidad = nuevaCantidad;
        item.subTotal = subTotal;
    }

    const carrito = carritos.find(c => c.items?.some(i => i.id === id));
    return carrito!;
}

export async function eliminarItemDelCarrito(id: number): Promise<void> {
    itemsCarrito = itemsCarrito.filter(i => i.id !== id);

    for (const carrito of carritos) {
        if (carrito.items) {
        carrito.items = carrito.items.filter(i => i.id !== id);
        }
    }
}
