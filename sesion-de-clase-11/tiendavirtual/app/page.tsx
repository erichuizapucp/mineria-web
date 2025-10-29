"use client"

"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/ga';
import {
  trackViewProducts,
  trackAddToCart,
  trackViewCart,
  trackSelectClient,
  trackStartCheckout,
  trackPlaceOrder,
  trackOrderSuccess,
  trackWebTraffic,
  trackLead,
  trackSale,
  trackPurchase,
} from '@/lib/ga-funnel';
import PaginaProductos from '@/componentes/PaginaProductos';
import PaginaClientes from '@/componentes/PaginaClientes';
import PaginaCarrito from '@/componentes/PaginaCarrito';
import PaginaOrdenes from '@/componentes/PaginaOrdenes';
import ModalProducto from '@/componentes/ModalProducto';
import ModalCliente from '@/componentes/ModalCliente';
import { useCarrito } from '@/hooks/useCarrito';
import { useClientes } from '@/hooks/useClientes';
import { Orden } from '@/modelo/orden';
import { useProductos } from '@/hooks/useProductos';
import { useMensaje } from '@/hooks/useMensaje';
import { Producto } from '@/modelo/producto';
import { Cliente } from '@/modelo/cliente';


export default function Home() {
  const pathname = usePathname();
  const [paginaActual, setPaginaActual] = useState<'productos' | 'clientes' | 'carrito' | 'ordenes'>('productos');

  const { mensaje } = useMensaje();
  const productosHook = useProductos();
  const clientesHook = useClientes();
  const carritoHook = useCarrito();
  const [ordenes, setOrdenes] = useState<Orden[]>([]);

  const cargando = productosHook.cargando || clientesHook.cargando;
  const carrito = carritoHook.carrito;

  // Track page views on route change
  useEffect(() => {
    pageview(pathname);
    trackWebTraffic(); // Objetivo: tráfico web
    // Funnel: track main page types
    if (pathname === '/' || pathname === '/productos') trackViewProducts();
    if (pathname === '/carrito') trackViewCart();
    if (pathname === '/ordenes') trackOrderSuccess(0); // 0 = generic view
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">      
      {mensaje.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50
          ${mensaje.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {mensaje.text}
        </div>
      )}

      {cargando && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-white text-lg">Cargando...</p>
        </div>
      )}

      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold rounded-lg">Mi Tienda Virtual</div>
          <div className="flex space-x-6">
            <button
              onClick={() => setPaginaActual('productos')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'productos' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Productos
            </button>
            <button
              onClick={() => setPaginaActual('clientes')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'clientes' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Clientes
            </button>
            <button
              onClick={() => setPaginaActual('carrito')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out relative
                ${paginaActual === 'carrito' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Carrito
              {carrito?.items && carrito.items.length > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carrito.items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setPaginaActual('ordenes')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'ordenes' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Órdenes
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {paginaActual === 'productos' && (
          <PaginaProductos
            productos={productosHook.productos}
            agregarAlCarrito={(producto) => {
              trackAddToCart(producto);
              carritoHook.agregarAlCarrito(producto);
            }}
            quitarProducto={productosHook.eliminarProducto}
            setMostrarModalProducto={productosHook.setMostrarProductoModal}
            setProductoSeleccionado={productosHook.setProductoSeleccionado}
          />
        )}

        {paginaActual === 'clientes' && (
          <PaginaClientes
            clientes={clientesHook.clientes}
            setClienteSeleccionado={clientesHook.setClienteSeleccionado}
            setMostrarModalCliente={clientesHook.setMostrarModalCliente}
            eliminarCliente={clientesHook.eliminarCliente}
          />
        )}

        {paginaActual === 'carrito' && (
          <PaginaCarrito
            carrito={carritoHook.carrito}
            setCarrito={carritoHook.setCarrito}
            actualizarCantidadProducto={carritoHook.actualizarCantidadEnCarrito}
            quitarProducto={carritoHook.eliminarDelCarrito}
            crearOrden={async () => {
              const carrito = carritoHook.carrito;
              if (!carrito.items || carrito.items.length === 0) return;
              trackStartCheckout();
              const subTotal = carrito.items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
              const igv = subTotal * 0.18;
              const total = subTotal + igv;
              const newOrden: Orden = {
                id: Date.now(),
                numero: `ORD-${Date.now()}`,
                carrito: { ...carrito },
                fecha: new Date(),
                subTotal,
                igv,
                total,
                items: carrito.items.map(item => ({
                  ...item,
                  id: Math.floor(Math.random() * 1000000),
                  orden: {} as Orden
                }))
              };
              setOrdenes(prev => [...prev, newOrden]);
              carritoHook.setCarrito({ ...carrito, items: [] });
              trackPlaceOrder(total);
              trackSale({ id: newOrden.id, total: newOrden.total, clienteId: newOrden.carrito.cliente?.id ?? 0 }); // Objetivo: venta
              // Evento estándar de compra para GA4 e-commerce
              trackPurchase({
                transaction_id: newOrden.numero,
                value: newOrden.total,
                currency: 'PEN',
                tax: newOrden.igv,
                items: (newOrden.items ?? []).map(item => ({
                  id: item.producto.id,
                  name: item.producto.nombre,
                  quantity: item.cantidad,
                  price: item.producto.precio,
                })),
              });
              setPaginaActual('ordenes');
              trackOrderSuccess(newOrden.id);
            }}
            onSelectClient={(cliente) => {
              trackSelectClient(cliente);
              trackLead(cliente); // Objetivo: oportunidad de venta
            }}
          />
        )}

        {paginaActual === 'ordenes' && (
          <PaginaOrdenes
            ordenes={ordenes}
            clientes={clientesHook.clientes}
          />
        )}
      </main>

      {productosHook.mostrarModalProducto && (
        <ModalProducto
          producto={productosHook.productoSeleccionado}
          cerrar={() => {
            productosHook.setMostrarProductoModal(false);
            productosHook.setProductoSeleccionado(null);
          }}
          grabar={(producto) =>
            productosHook.productoSeleccionado
              ? productosHook.actualizarProducto(producto as Producto)
              : productosHook.agregarProducto(producto as Omit<Producto, 'id'>)
          }
        />
      )}

      {clientesHook.mostrarModalCliente && (
        <ModalCliente
          cliente={clientesHook.clienteSeleccionado}
          cerrar={() => {
            clientesHook.setMostrarModalCliente(false);
            clientesHook.setClienteSeleccionado(null);
          }}
          grabar={(cliente) =>
            clientesHook.clienteSeleccionado
              ? clientesHook.actualizarCliente(cliente as Cliente)
              : clientesHook.registrarCliente(cliente as Omit<Cliente, 'id'>)
          }
        />
      )}
    </div>
  );
};
