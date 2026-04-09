// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { OperationType, PropertyType } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  priceUsd: number | null,
  priceArs: number | null,
  currency: 'USD' | 'ARS',
): string {
  if (currency === 'USD' && priceUsd != null) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(priceUsd)
  }
  if (priceArs != null) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(priceArs)
  }
  return 'Consultar precio'
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '')
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`
}

export function operationTypeLabel(type: OperationType): string {
  const labels: Record<OperationType, string> = {
    venta: 'Venta',
    alquiler: 'Alquiler',
    alquiler_temporal: 'Alquiler Temporal',
  }
  return labels[type]
}

export function propertyTypeLabel(type: PropertyType): string {
  const labels: Record<PropertyType, string> = {
    casa: 'Casa',
    departamento: 'Departamento',
    lote: 'Lote',
    local_comercial: 'Local Comercial',
    oficina: 'Oficina',
    campo: 'Campo',
    cochera: 'Cochera',
    otro: 'Otro',
  }
  return labels[type]
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '\u2026'
}
