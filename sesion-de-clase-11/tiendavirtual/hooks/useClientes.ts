"use client";

import { useEffect, useState } from 'react';
import * as clientesApi from '@/lib/api/clientes';
import { Cliente } from '@/modelo/cliente';
import { useMensaje } from '@/hooks/useMensaje';

export function useClientes() {
    const [cargando, setCargando] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
    const [mostrarModalCliente, setMostrarModalCliente] = useState<boolean>(false);
    const { mostrarMensaje } = useMensaje();

    useEffect(() => {
        const cargarClientes = async () => {
            setCargando(true);
            try {
                const fetchedClientes = await clientesApi.getClientes();
                setClientes(fetchedClientes);
            } catch (error) {
                mostrarMensaje('No se pudieron cargar los clientes.', 'error');
                console.error('Error al cargar clientes:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarClientes();
    }, []);

    const registrarCliente = async (cliente: Omit<Cliente, 'id'>) => {
        setCargando(true);
        try {
            const nuevoCliente = await clientesApi.registrarCliente(cliente);
            setClientes(prevClientes => [...prevClientes, nuevoCliente]);
            mostrarMensaje('El cliente fue registrado satisfactoriamente!', 'success');
            setMostrarModalCliente(false);
        } catch (error) {
            mostrarMensaje('No se pudo registrar el cliente.', 'error');
            console.error("Hubo un error al registrar el cliente:", error);
        } finally {
            setCargando(false);
        }
    };
    
    const actualizarCliente = async (clienteActualizado: Cliente) => {
        setCargando(true);
        try {
            await clientesApi.actualizarCliente(clienteActualizado);
            setClientes(prevClientes => prevClientes.map(c => c.id === clienteActualizado.id ? clienteActualizado : c));
            mostrarMensaje('El cliente fue actualizado satisfactoriamente!', 'success');
            setClienteSeleccionado(null);
            setMostrarModalCliente(false);
        } catch (error) {
            mostrarMensaje('No se pudo actualizar el cliente.', 'error');
            console.error("Hubo un error al actualizar el cliente", error);
        } finally {
            setCargando(false);
        }
    };

    const eliminarCliente = async (id: number) => {
        setCargando(true);
        try {
            await clientesApi.eliminarCliente(id);
            setClientes(prevClientes => prevClientes.filter(c => c.id !== id));
            mostrarMensaje('El cliente fue eliminado satisfactoriamente!', 'success');
        } catch (error) {
            mostrarMensaje('No se pudo eliminar el cliente.', 'error');
            console.error("Hubo un error al eliminar el cliente:", error);
        } finally {
            setCargando(false);
        }
    };

    return {
        clientes,
        clienteSeleccionado, 
        mostrarModalCliente, 
        setClientes,
        registrarCliente,
        actualizarCliente,
        eliminarCliente,
        setMostrarModalCliente,
        setClienteSeleccionado, 
        cargando,
    }
}