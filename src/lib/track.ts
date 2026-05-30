// src/lib/track.ts
// Beacon de analítica: registra interacciones del visitante con las propiedades
// en el endpoint público de SEE ADMIN (property_events). Client-side, fire-and-forget.

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export type TrackEventType =
  | 'view'
  | 'inquiry'
  | 'visit_request'
  | 'whatsapp_click'
  | 'phone_click'
  | 'favorite'
  | 'share'

const SESSION_KEY = 'see_session_id'

export interface SubmitLeadInput {
  property_id: string
  name: string
  phone?: string
  email?: string
  message?: string
  intent: 'inquiry' | 'visit'
  company?: string // honeypot
}

/**
 * Envía una consulta/visita que crea un lead automático en el CRM de la agencia.
 * Incluye el session_id para que el sistema calcule el score por comportamiento.
 */
export async function submitLead(
  input: SubmitLeadInput,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/public/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, session_id: getSessionId() }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data?.error || 'No se pudo enviar la consulta' }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Error de conexión. Intentá de nuevo.' }
  }
}

/** id de sesión anónimo, persistido en sessionStorage (dedup de vistas) */
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

/**
 * Registra un evento. No lanza errores (la analítica nunca debe romper la UI).
 * `once` evita duplicar el mismo evento+propiedad dentro de la sesión (ej. vistas).
 */
export function trackEvent(
  propertyId: string,
  type: TrackEventType,
  options?: { once?: boolean; meta?: Record<string, unknown> },
): void {
  if (typeof window === 'undefined' || !propertyId) return

  if (options?.once) {
    const guardKey = `see_evt_${type}_${propertyId}`
    if (sessionStorage.getItem(guardKey)) return
    sessionStorage.setItem(guardKey, '1')
  }

  const body = JSON.stringify({
    property_id: propertyId,
    type,
    source: 'web',
    session_id: getSessionId(),
    meta: options?.meta ?? {},
  })

  try {
    fetch(`${API_BASE}/api/public/v1/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true, // sobrevive a la navegación / cierre de pestaña
    }).catch(() => {})
  } catch {
    // silencioso
  }
}
