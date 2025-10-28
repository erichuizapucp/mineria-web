"use client"

import { useState } from 'react';
import * as carritosApi from '@/lib/api/carrito';
import { useMensaje } from '@/hooks/useMensaje';
import { Producto } from '@/modelo/producto';
import { Carrito } from '@/modelo/carrito';
import { ItemCarrito } from '@/modelo/itemCarrito';

export function useCarrito() {
    const [carrito, setCarrito] = useState<Carrito>({} as Carrito);
    const { mostrarMensaje } = useMensaje();

    const agregarAlCarrito = async (producto: Producto) => {
        console.log("Agregando al carrito:", producto);
      
        try {
          const existingItem = carrito.items?.find(item => item.producto.id === producto.id);
    
          if (existingItem) {
            const nuevaCantidad = existingItem.cantidad + 1;
            const subTotal = nuevaCantidad * producto.precio;
    
            const nuevoCarrito = await carritosApi.actualizarItemCarrito(existingItem.id, nuevaCantidad, subTotal);
            setCarrito(nuevoCarrito);
          } else {
            const nuevoItem: ItemCarrito = {
              id: Date.now(), // temporal, se debe reemplazar con el ID del backend
              carrito: carrito,
              producto: producto,
              cantidad: 1,
              subTotal: producto.precio
            };
    
            const carritoActualizado = await carritosApi.agregarItemAlCarrito(nuevoItem);
            setCarrito(carritoActualizado);
          }
    
          mostrarMensaje(`${producto.nombre} fue agregado al carrito!`, 'success');
        } catch (error) {
          mostrarMensaje('No se pudo agregar el producto al carrito.', 'error');
          console.error("Error al agregar al carrito:", error);
        }
      };
    
      const actualizarCantidadEnCarrito = async (productoId: number, nuevaCantidad: number) => {
        try {
          const item = carrito.items?.find(item => item.producto.id === productoId);
          if (!item) return;
    
          const cantidadFinal = Math.max(1, nuevaCantidad);
          const nuevoSubTotal = cantidadFinal * item.producto.precio;
    
          await carritosApi.actualizarItemCarrito(item.id, cantidadFinal, nuevoSubTotal);
    
          setCarrito(prevCarrito => {
            const nuevosItems = prevCarrito.items?.map(i =>
              i.producto.id === productoId
                ? { ...i, cantidad: cantidadFinal, subTotal: nuevoSubTotal }
                : i
            ) || [];
    
            return { ...prevCarrito, items: nuevosItems };
          });
        } catch (error) {
          mostrarMensaje('No se pudo actualizar la cantidad.', 'error');
          console.error("Error al actualizar la cantidad:", error);
        }
      };
    
      const eliminarDelCarrito = async (productoId: number) => {
        try {
          const item = carrito.items?.find(item => item.producto.id === productoId);
          if (!item) return;
    
          await carritosApi.eliminarItemDelCarrito(item.id);
    
          setCarrito(prevCarrito => {
            const nuevosItems = prevCarrito.items?.filter(i => i.producto.id !== productoId) || [];
            return { ...prevCarrito, items: nuevosItems };
          });
    
          mostrarMensaje('Producto eliminado del carrito!', 'success');
        } catch (error) {
          mostrarMensaje('No se pudo eliminar el producto del carrito.', 'error');
          console.error("Error al eliminar del carrito:", error);
        }
      };

    return {
        carrito,
        setCarrito,
        agregarAlCarrito,
        actualizarCantidadEnCarrito,
        eliminarDelCarrito
    }
}
