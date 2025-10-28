"use client"

import { useState } from 'react';

type TipoMensaje = 'success' | 'error' | '';

export function useMensaje() {
  const [mensaje, setMensaje] = useState<{ text: string; type: TipoMensaje }>({ text: '', type: '' });

  const mostrarMensaje = (text: string, type: 'success' | 'error') => {
    setMensaje({ text, type });
    setTimeout(() => setMensaje({ text: '', type: '' }), 3000);
  };

  return { mensaje, mostrarMensaje };
}