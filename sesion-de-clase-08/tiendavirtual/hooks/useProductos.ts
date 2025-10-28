"use client"

import { useEffect, useState } from 'react';
import * as productosApi from '@/lib/api/productos';
import { Producto } from '@/modelo/producto';
import { useMensaje } from '@/hooks/useMensaje';

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(false);
    const [mostrarModalProducto, setMostrarProductoModal] 
    = useState<boolean>(false);
    const [productoSeleccionado, setProductoSeleccionado] 
    = useState<Producto | null>(null);
    const { mostrarMensaje } = useMensaje();

    useEffect(() => {
        const cargarProductos = async () => {
            setCargando(true);
            try {
                const fetchedProductos 
                = await productosApi.getProductos();
                setProductos(fetchedProductos);
            } catch (error) {
                mostrarMensaje('No se pudieron cargar los productos.', 'error');
                console.error('Error al cargar productos:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarProductos();
    }, []);

    const agregarProducto = async (producto: Omit<Producto, 'id'>) => {
        setCargando(true);

        try {
            const nuevoProducto = await productosApi.agregarProducto(producto);
            setProductos(prevProductos => [...prevProductos, nuevoProducto]);
            mostrarMensaje('Producto agregado satisfactoriamente!', 'success');
            setMostrarProductoModal(false);
        } catch (error) {
            mostrarMensaje('No se pudo agregar el producto.', 'error');
            console.error("Hubo un error al agregar el producto:", error);
        } finally {
            setCargando(false);
        }
    };
  
    const actualizarProducto = async (productoActualizado: Producto) => {
        setCargando(true);
        try {
            await productosApi.actualizarProducto(productoActualizado);
            setProductos(prevProductos => prevProductos.map(p => p.id === productoActualizado.id ? productoActualizado : p));
            mostrarMensaje('Producto actualizado satisfactoriamente!', 'success');
            setProductoSeleccionado(null);
            setMostrarProductoModal(false);
        } catch (error) {
            mostrarMensaje('No se pudo actualizar el producto.', 'error');
            console.error("Hubo un error al actualizar el producto:", error);
        } finally {
            setCargando(false);
        }
    };
  
    const eliminarProducto = async (id: number) => {
      setCargando(true);
      try {
        await productosApi.eliminarProducto(id);
        setProductos(prevProductos => prevProductos.filter(p => p.id !== id));
        mostrarMensaje('El producto fue eliminado satisfactoriamente!', 'success');
      } catch (error) {
        mostrarMensaje('No se pudo eliminar el producto.', 'error');
        console.error("Hubo un error al eliminar el producto:", error);
      } finally {
        setCargando(false);
      }
    };

    return { 
        productos, 
        agregarProducto, 
        actualizarProducto, 
        eliminarProducto,
        setMostrarProductoModal,
        setProductoSeleccionado,
        productoSeleccionado, 
        mostrarModalProducto, 
        cargando 
    };
}
