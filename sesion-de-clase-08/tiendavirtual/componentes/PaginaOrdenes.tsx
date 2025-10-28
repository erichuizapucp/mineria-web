import { Cliente } from "@/modelo/cliente";
import { Orden } from "@/modelo/orden";

interface PaginaOrdenesProps {
  ordenes: Orden[];
  clientes: Cliente[];
}

const PaginaOrdenes: React.FC<PaginaOrdenesProps> = ({ ordenes, clientes }) => {
  console.log('PaginaOrdenes received ordenes:', ordenes);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Tus Órdenes</h1>
    {ordenes.length === 0 ? (
      <p className="text-gray-600">No hay ordenes generadas aún.</p>
    ) : (
      <div className="space-y-6">
        {ordenes.map((orden: Orden) => (
          <div key={orden.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">Id: {orden.id}</h2>
              <span className="text-sm text-gray-600">Fecha: {orden.fecha?.toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mb-2">Cliente: {clientes.find(c => c.id === orden.carrito?.cliente?.id)?.nombre || 'N/A'}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orden.items?.map((item, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{item.producto.nombre}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{item.cantidad}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">${item.producto.precio.toFixed(2)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">${(item.producto.precio * item.cantidad).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-right mt-3 text-lg font-bold text-gray-900">
              Total: ${orden.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  );
}

export default PaginaOrdenes;