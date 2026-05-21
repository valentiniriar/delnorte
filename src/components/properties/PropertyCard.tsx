import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Bath, Maximize2, Heart, ArrowRight } from 'lucide-react'
import { formatPrice, truncate } from '@/lib/utils'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  featured?: boolean
}

const operationLabels: Record<string, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  alquiler_temporal: 'Temporal',
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl =
    property.cover_image_url ??
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85'

  const price = formatPrice(property.price_usd, property.price_ars, property.currency)
  const location = [property.neighborhood, property.city].filter(Boolean).join(', ')

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-editorial hover:shadow-editorial-lg hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="font-body text-[10px] uppercase tracking-[0.2em] font-bold bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded">
            {operationLabels[property.operation_type] ?? property.operation_type}
          </span>
        </div>
        <button
          type="button"
          aria-label="Guardar propiedad"
          onClick={(e) => {
            e.preventDefault()
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-white transition-colors cursor-pointer"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-headline text-primary font-bold text-lg leading-tight tracking-tight group-hover:text-secondary transition-colors">
            {truncate(property.title, 50)}
          </h3>
        </div>

        {location && (
          <p className="font-body text-on-surface-variant text-sm mb-5">
            {location}
          </p>
        )}

        <div className="flex items-center gap-4 text-on-surface-variant mb-5 pb-5 border-b border-outline-variant/30">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1.5 font-body text-xs">
              <BedDouble size={14} className="text-secondary" />
              {property.bedrooms} hab.
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1.5 font-body text-xs">
              <Bath size={14} className="text-secondary" />
              {property.bathrooms} baños
            </span>
          )}
          {property.total_sqm != null && (
            <span className="flex items-center gap-1.5 font-body text-xs">
              <Maximize2 size={14} className="text-secondary" />
              {property.total_sqm} m²
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-headline text-primary font-bold text-xl tracking-tight">
            {price}
          </span>
          <span className="font-body text-xs text-secondary font-bold tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
            Ver detalle
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
