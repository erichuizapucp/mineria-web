"use client";
import { ItemOrden } from "@/modelo/itemOrden";
import { Orden } from "@/modelo/orden";

// LocalStorage-based store for demo
const STORAGE_KEY = 'ordenesMem';

function loadOrdenes(): Orden[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveOrdenes(ordenes: Orden[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ordenes));
}

function getNextId(ordenes: Orden[]): number {
  return ordenes.length > 0 ? Math.max(...ordenes.map(o => o.id)) + 1 : 1;
}

export async function realizarPedido(orden: Omit<Orden, 'id' | 'numero' | 'items'> & {
  items: Omit<ItemOrden, 'id' | 'orden'>[]
}): Promise<Orden> {
  const ordenes = loadOrdenes();
  const newOrden: Orden = {
    id: getNextId(ordenes),
    numero: `ORD-${Date.now()}`,
    carrito: orden.carrito,
    fecha: orden.fecha,
    subTotal: orden.subTotal,
    igv: orden.igv,
    total: orden.total,
    items: orden.items.map(item => ({
      ...item,
      id: Math.floor(Math.random() * 1000000),
      orden: {} as Orden
    }))
  };
  ordenes.push(newOrden);
  saveOrdenes(ordenes);
  return newOrden;
}

export async function getOrdenes(): Promise<Orden[]> {
  return loadOrdenes();
}
