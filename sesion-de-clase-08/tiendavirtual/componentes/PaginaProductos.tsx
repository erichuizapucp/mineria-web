import { Producto } from "../modelo/producto";

interface PaginaProductosProps {
    productos: Producto[];
    setProductoSeleccionado: (producto: Producto | null) => void;
    setMostrarModalProducto: (show: boolean) => void;
    quitarProducto: (id: number) => void;
    agregarAlCarrito: (producto: Producto) => void;
}

const PaginaProductos: React.FC<PaginaProductosProps> = ({ 
  productos, 
  setProductoSeleccionado, 
  setMostrarModalProducto, 
  quitarProducto, 
  agregarAlCarrito
}) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
      Productos
      <button
        onClick={() => { setProductoSeleccionado(null); setMostrarModalProducto(true); }}
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Agregar Producto
      </button>
    </h1>
    {productos.length === 0 ? (
      <p className="text-gray-600">No hay productos disponibles.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productos.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{producto.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${producto.precio.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{producto.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Agregar al Carrito
                  </button>
                  <button
                    onClick={() => { setProductoSeleccionado(producto); setMostrarModalProducto(true); }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => quitarProducto(producto.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default PaginaProductos;