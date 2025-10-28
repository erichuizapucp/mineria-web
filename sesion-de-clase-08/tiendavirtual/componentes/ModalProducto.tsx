"use client";

import { useState } from "react";
import { Producto } from "@/modelo/producto";

interface ModalProductoProps {
  producto: Producto | null;
  cerrar: () => void;
  grabar: (producto: Producto | Omit<Producto, 'id'>) => Promise<void>;
}

const ModalProducto: React.FC<ModalProductoProps> = ({ producto, cerrar, grabar }) => {
  const [nombre, setNombre] = useState<string>(producto ? producto.nombre : '');
  const [precio, setPrecio] = useState<number | string>(producto ? producto.precio : '');
  const [stock, setStock] = useState<number | string>(producto ? producto.stock : '');

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && precio !== '' && stock !== '') {
      grabar({ ...producto, nombre, precio: parseFloat(precio as string), stock: parseInt(stock as string) } as Producto);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{producto ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
        <form onSubmit={enviarFormulario} className="space-y-4">
          <div>
            <label htmlFor="nombreProducto" className="block text-sm font-medium text-gray-700">Nombre Producto</label>
            <input
              type="text"
              id="nombreProducto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="precioProducto" className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              id="precioProducto"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              step="0.01"
              required
            />
          </div>
          <div>
            <label htmlFor="stockProducto" className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              id="stockProducto"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={cerrar}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Grabar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProducto;