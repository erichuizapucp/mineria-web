import { Carrito } from "@/modelo/carrito";
import { useClientes } from "@/hooks/useClientes";
import { useState } from "react";
import { useCarrito } from "@/hooks/useCarrito";


interface PaginaCarritoProps {
    carrito: Carrito;
    setCarrito: (carrito: Carrito) => void;
    actualizarCantidadProducto: (idProducto: number, cantidad: number) => void;
    quitarProducto: (idProducto: number) => void;
    crearOrden: () => Promise<void>;
    onSelectClient?: (cliente: { id: number; nombre: string; apellidos: string }) => void;
}

const CartsPage: React.FC<PaginaCarritoProps> = ({ carrito, setCarrito, actualizarCantidadProducto, quitarProducto, crearOrden, onSelectClient }) => {
    const { clientes, cargando } = useClientes();
    const [selectedClienteId, setSelectedClienteId] = useState<number | undefined>(carrito?.cliente?.id);

    // Handler to update the selected client in the Carrito
    const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(e.target.value);
        setSelectedClienteId(id);
        if (carrito && clientes) {
            const cliente = clientes.find(c => c.id === id);
            if (cliente) {
                setCarrito({ ...carrito, cliente });
                if (onSelectClient) {
                    onSelectClient({ id: cliente.id, nombre: cliente.nombre, apellidos: cliente.apellidos });
                }
            }
        }
    };

    // Handler to ensure client is set before creating order
    const handleCrearOrden = async () => {
        console.log('handleCrearOrden called');
        if (selectedClienteId && clientes) {
            const cliente = clientes.find(c => c.id === selectedClienteId);
            if (cliente) {
                setCarrito({ ...carrito, cliente });
                console.log('setCarrito called with client:', cliente);
            }
        }
        if (typeof crearOrden === 'function') {
            console.log('Calling crearOrden');
            await crearOrden();
            console.log('crearOrden finished');
        } else {
            console.log('crearOrden is not a function:', crearOrden);
        }
    };

    if (!carrito) {
        carrito = {
            id: 0,
            nombre: '',
            fecha: new Date(),
            cliente: {
                id: 0,
                nombre: '',
                apellidos: '',
                dni: '',
                carritos: [],
            },
            items: [],
        }; // Llamar a crear carrito si no existe, llamar al API.
    }

    const totalCarrito = carrito.items?.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tu Carrito</h1>

        {/* Dropdown for selecting client */}
        <div className="mb-6">
            <label htmlFor="cliente-select" className="block text-gray-700 font-medium mb-2">Selecciona un cliente:</label>
            <select
                id="cliente-select"
                value={selectedClienteId ?? ''}
                onChange={handleClienteChange}
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={cargando}
            >
                <option value="">-- Selecciona un cliente --</option>
                {clientes && clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre} {cliente.apellidos} ({cliente.dni})
                    </option>
                ))}
            </select>
        </div>

        {carrito.items?.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío. Agrega algunos productos!</p>
        ) : (
            <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {carrito.items?.map((item) => (
                    <tr key={item.producto.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.producto.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.producto.precio.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => actualizarCantidadProducto(item.producto.id, parseInt(e.target.value))}
                            className="w-20 border border-gray-300 rounded-md p-1 text-center"
                        />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item.producto.precio * item.cantidad).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                            onClick={() => quitarProducto(item.producto.id)}
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
            <div className="flex justify-end items-center mt-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-xl font-bold text-gray-800 mr-4">Total: ${totalCarrito?.toFixed(2) ?? 0.00}</span>
                <button
                onClick={handleCrearOrden}
                className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                Place Order
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default CartsPage;