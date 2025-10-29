import { Cliente } from "@/modelo/cliente";

interface PaginaClientesProps {
  clientes: Cliente[];
  setClienteSeleccionado: (cliente: Cliente | null) => void;
  setMostrarModalCliente: (mostrar: boolean) => void;
  eliminarCliente: (id: number) => void;
}

const ClientsPage: React.FC<PaginaClientesProps> = ({ clientes, setClienteSeleccionado, setMostrarModalCliente, eliminarCliente }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
      Clientes
      <button
        onClick={() => { setClienteSeleccionado(null); setMostrarModalCliente(true); }}
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Agregar Cliente
      </button>
    </h1>
    {clientes.length === 0 ? (
      <p className="text-gray-600">No hay clientes disponibles.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.apellidos}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.dni}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => { setClienteSeleccionado(cliente); setMostrarModalCliente(true); }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCliente(cliente.id)}
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

export default ClientsPage;