"use client"

import { useState } from "react";
import { Cliente } from "@/modelo/cliente";

interface ClientModalProps {
  cliente: Cliente | null;
  cerrar: () => void;
  grabar: (cliente: Cliente | Omit<Cliente, 'id'>) => Promise<void>;
}

const ModalCliente: React.FC<ClientModalProps> = ({ cliente, cerrar, grabar }) => {
    const [dni, setDni] = useState<string>(cliente ? cliente.dni : '');
    const [nombre, setNombre] = useState<string>(cliente ? cliente.nombre : '');
    const [apellidos, setApellidos] = useState<string>(cliente ? cliente.apellidos || '' : '');

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    if (dni && nombre) {
      grabar({ ...cliente, dni, nombre, apellidos } as Cliente);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{cliente ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}</h2>
        <form onSubmit={enviarFormulario} className="space-y-4">
            <div>
                <label htmlFor="dniCliente" className="block text-sm font-medium text-gray-700">DNI</label>
                <input
                type="text"
                id="dniCliente"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
          <div>
            <label htmlFor="nombreCliente" className="block text-sm font-medium text-gray-700">Nombre Cliente</label>
            <input
              type="text"
              id="nombreCliente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="apellidosCliente" className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input
              type="text"
              id="apellidosCliente"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
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
              Grabar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCliente;