import type {
  AgencyResponse,
  PropertiesResponse,
  PropertyDetailResponse,
  PropertyFilters,
} from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? ''

const TIMEOUT_MS = 5000

function fetchWithTimeout(url: string, options: RequestInit & { next?: { revalidate: number } }): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout))
}

const headers: HeadersInit = {
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json',
}

export async function fetchProperties(
  filters?: PropertyFilters,
): Promise<PropertiesResponse> {
  const url = new URL('/api/public/v1/properties', API_BASE)
  if (filters) {
    Object.entries(filters).forEach(([k, v]) => {
      if (v != null && v !== '') url.searchParams.set(k, String(v))
    })
  }
  const res = await fetchWithTimeout(url.toString(), {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`fetchProperties failed: ${res.status}`)
  return res.json()
}

export async function fetchProperty(id: string): Promise<PropertyDetailResponse> {
  const res = await fetchWithTimeout(`${API_BASE}/api/public/v1/properties/${id}`, {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`fetchProperty failed: ${res.status}`)
  return res.json()
}

export async function fetchAgency(): Promise<AgencyResponse> {
  const res = await fetchWithTimeout(`${API_BASE}/api/public/v1/agency`, {
    headers,
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`fetchAgency failed: ${res.status}`)
  return res.json()
}
