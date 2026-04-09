import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatPrice, truncate } from '@/lib/utils'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  featured?: boolean
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const imageUrl =
    property.cover_image_url ??
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80'

  const price = formatPrice(property.price_usd, property.price_ars, property.currency)
  const location = [property.neighborhood, property.city].filter(Boolean).join(', ')

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="group block bg-white overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(4,22,39,0.06)' }}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge type={property.operation_type} />
        </div>
        {property.ref_code && (
          <div className="absolute bottom-4 right-4">
            <span className="font-josefin text-xs text-white/80 bg-black/50 px-2 py-1 tracking-wider">
              {property.ref_code}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {location && (
          <div className="flex items-center gap-1 mb-2">
            <MapPin size={12} className="text-gold shrink-0" />
            <span className="font-josefin text-xs text-text-muted tracking-wide">{location}</span>
          </div>
        )}

        <h3 className="font-cinzel text-navy font-semibold text-base leading-snug mb-3 group-hover:text-gold transition-colors duration-200">
          {truncate(property.title, 60)}
        </h3>

        <p className="font-josefin text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {truncate(property.description, 120)}
        </p>

        <div className="flex items-center gap-4 text-text-muted mb-4">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1.5 font-josefin text-xs">
              <BedDouble size={14} />
              {property.bedrooms} hab.
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1.5 font-josefin text-xs">
              <Bath size={14} />
              {property.bathrooms} baños
            </span>
          )}
          {property.total_sqm != null && (
            <span className="flex items-center gap-1.5 font-josefin text-xs">
              <Maximize2 size={14} />
              {property.total_sqm} m²
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-surface-2 pt-4">
          <span className="font-cinzel text-navy font-semibold text-lg">{price}</span>
          <span className="font-josefin text-xs text-gold font-medium tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-200">
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  )
}
