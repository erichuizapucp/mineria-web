// Evento estándar de compra para GA4 e-commerce
export function trackPurchase({
  transaction_id,
  value,
  currency,
  tax,
  items,
}: {
  transaction_id: string;
  value: number;
  currency: string;
  tax: number;
  items: Array<{ id: number; name: string; quantity: number; price: number }>;
}) {
  gaEvent({
    action: 'purchase',
    params: {
      transaction_id,
      value,
      currency,
      tax,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    },
  });
}
import { gaEvent } from './ga';

// Eventos de funnel sugeridos para tu tienda virtual
export const GA_FUNNEL_EVENTS = {
  VIEW_PRODUCTS: 'view_products',
  ADD_TO_CART: 'add_to_cart',
  VIEW_CART: 'view_cart',
  SELECT_CLIENT: 'select_client',
  START_CHECKOUT: 'start_checkout',
  PLACE_ORDER: 'place_order',
  ORDER_SUCCESS: 'order_success',
  LEAD: 'lead', // Oportunidad de venta
  SALE: 'sale', // Venta generada
  WEB_TRAFFIC: 'web_traffic', // Tráfico web
};
// Objetivo: Conocer el tráfico web
export function trackWebTraffic() {
  gaEvent({ action: GA_FUNNEL_EVENTS.WEB_TRAFFIC });
}

// Objetivo: Generar Oportunidades de Venta (Lead)
export function trackLead(cliente: { id: number; nombre: string; apellidos: string; email?: string }) {
  gaEvent({
    action: GA_FUNNEL_EVENTS.LEAD,
    params: { id: cliente.id, nombre: cliente.nombre, apellidos: cliente.apellidos, email: cliente.email },
  });
}

// Objetivo: Generar Ventas (Sale)
export function trackSale(orden: { id: number; total: number; clienteId: number }) {
  gaEvent({
    action: GA_FUNNEL_EVENTS.SALE,
    params: { id: orden.id, total: orden.total, clienteId: orden.clienteId },
  });
}

// Funciones para disparar eventos de funnel
export function trackViewProducts() {
  gaEvent({ action: GA_FUNNEL_EVENTS.VIEW_PRODUCTS });
}

export function trackAddToCart(producto: { id: number; nombre: string; precio: number }) {
  gaEvent({
    action: GA_FUNNEL_EVENTS.ADD_TO_CART,
    params: { id: producto.id, nombre: producto.nombre, precio: producto.precio },
  });
}

export function trackViewCart() {
  gaEvent({ action: GA_FUNNEL_EVENTS.VIEW_CART });
}

export function trackSelectClient(cliente: { id: number; nombre: string; apellidos: string }) {
  gaEvent({
    action: GA_FUNNEL_EVENTS.SELECT_CLIENT,
    params: { id: cliente.id, nombre: cliente.nombre, apellidos: cliente.apellidos },
  });
}

export function trackStartCheckout() {
  gaEvent({ action: GA_FUNNEL_EVENTS.START_CHECKOUT });
}

export function trackPlaceOrder(total: number) {
  gaEvent({ action: GA_FUNNEL_EVENTS.PLACE_ORDER, params: { total } });
}

export function trackOrderSuccess(orderId: number) {
  gaEvent({ action: GA_FUNNEL_EVENTS.ORDER_SUCCESS, params: { orderId } });
}
