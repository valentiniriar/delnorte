'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/track'

/**
 * Registra una vista de propiedad al montar (una sola vez por sesión y propiedad).
 * Se renderiza dentro de la ficha de propiedad (Server Component) sin afectar el SSR.
 */
export default function TrackView({ propertyId }: { propertyId: string }) {
  useEffect(() => {
    trackEvent(propertyId, 'view', { once: true })
  }, [propertyId])

  return null
}
