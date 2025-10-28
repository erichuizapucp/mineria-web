import { Producto } from "@/modelo/producto";

let productos: Producto[] = [
  {
    id: 1,
    codigo: 'P001',
    nombre: 'Laptop HP 14',
    descripcion: 'Laptop ligera y potente con 16GB RAM y SSD de 512GB',
    precio: 2500,
    stock: 15,
  },
  {
    id: 2,
    codigo: 'P002',
    nombre: 'Mouse Logitech',
    descripcion: 'Mouse inalámbrico ergonómico',
    precio: 80,
    stock: 100,
  },
  {
    id: 3,
    codigo: 'P003',
    nombre: 'Monitor LG 24"',
    descripcion: 'Monitor IPS Full HD 24 pulgadas',
    precio: 750,
    stock: 20,
  },
];

export async function getProductos(): Promise<Producto[]> {
  return productos;
}

export async function agregarProducto(producto: Omit<Producto, 'id'>): Promise<Producto> {
    const nuevoProducto: Producto = {
        id: Date.now(),
        ...producto,
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
}

export async function actualizarProducto(productoActualizado: Producto): Promise<Producto> {
    productos = productos.map(p =>
        p.id === productoActualizado.id ? productoActualizado : p
    );
    return productoActualizado;
}

export async function eliminarProducto(id: number): Promise<void> {
    productos = productos.filter(p => p.id !== id);
}
