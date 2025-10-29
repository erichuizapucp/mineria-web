import { Cliente } from "@/modelo/cliente";


export let clientes: Cliente[] = [
    {
        id: 1,
        dni: '12345678',
        nombre: 'Carlos',
        apellidos: 'Ramírez Gómez',
        carritos: [],
    },
    {
        id: 2,
        dni: '87654321',
        nombre: 'Lucía',
        apellidos: 'Fernández Soto',
        carritos: [],
    },
    {
        id: 3,
        dni: '11223344',
        nombre: 'José',
        apellidos: 'Pérez León',
        carritos: [],
    },
];

export async function getClientes(): Promise<Cliente[]> {
    return clientes;
}

export async function registrarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    const nuevoCliente: Cliente = {
        id: Date.now(),
        ...cliente,
        carritos: cliente.carritos || [],
    };
    clientes.push(nuevoCliente);
    
    return nuevoCliente;
}

export async function actualizarCliente(clienteActualizado: Cliente): Promise<Cliente> {
    clientes = clientes.map(c =>
        c.id === clienteActualizado.id ? clienteActualizado : c
    );
    return clienteActualizado;
}

export async function eliminarCliente(id: number): Promise<void> {
    clientes = clientes.filter(c => c.id !== id);
}
