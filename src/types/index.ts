// src/types/index.ts
export type OperationType = 'venta' | 'alquiler' | 'alquiler_temporal'
export type PropertyType =
  | 'casa'
  | 'departamento'
  | 'lote'
  | 'local_comercial'
  | 'oficina'
  | 'campo'
  | 'cochera'
  | 'otro'

export interface Property {
  id: string
  title: string
  description: string
  operation_type: OperationType
  property_type: PropertyType
  price_usd: number | null
  price_ars: number | null
  currency: 'USD' | 'ARS'
  rental_period: 'mensual' | 'diario' | null
  address: string
  neighborhood: string
  city: string
  province: string
  total_sqm: number | null
  covered_sqm: number | null
  bedrooms: number | null
  bathrooms: number | null
  garages: number | null
  has_pool: boolean
  has_garden: boolean
  has_elevator?: boolean
  cover_image_url: string | null
  image_urls: string[]
  tour_360_url: string | null
  ref_code: string
  lat: number | null
  lng: number | null
}

export interface PropertyDetail extends Property {
  floors: number | null
  year_built: number | null
  amenities: string[]
  video_url: string | null
}

export interface PropertiesMeta {
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface PropertiesResponse {
  data: Property[]
  meta: PropertiesMeta
}

export interface PropertyDetailResponse {
  data: PropertyDetail
}

export interface AgencySettings {
  website_headline: string
  website_subheadline: string
  website_about: string
  website_whatsapp: string
  website_instagram: string
  website_facebook: string
}

export interface Agency {
  name: string
  slug: string
  logo_url: string | null
  phone: string
  email: string
  address: string
  city: string
  province: string
  settings: AgencySettings
}

export interface AgencyResponse {
  data: Agency
}

export interface PropertyFilters {
  page?: number
  per_page?: number
  operation_type?: OperationType
  property_type?: PropertyType
  city?: string
  bedrooms?: number
  min_price?: number
  max_price?: number
  search?: string
  lat_min?: number
  lat_max?: number
  lng_min?: number
  lng_max?: number
}

export interface MapBounds {
  lat_min: number
  lat_max: number
  lng_min: number
  lng_max: number
}
