import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchProperty } from '@/lib/api'
import PropertyGallery from '@/components/property-detail/PropertyGallery'
import PropertySpecs from '@/components/property-detail/PropertySpecs'
import PropertyAmenities from '@/components/property-detail/PropertyAmenities'
import WhatsAppCta from '@/components/property-detail/WhatsAppCta'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import { formatPrice, propertyTypeLabel } from '@/lib/utils'
import { MapPin } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const { data } = await fetchProperty(id)
    return {
      title: data.title,
      description: data.description?.slice(0, 160),
      openGraph: {
        title: data.title,
        description: data.description?.slice(0, 160),
        images: data.cover_image_url ? [data.cover_image_url] : [],
      },
    }
  } catch {
    return { title: 'Propiedad no encontrada' }
  }
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params
  let property

  try {
    const { data } = await fetchProperty(id)
    property = data
  } catch {
    notFound()
  }

  const images = [
    ...(property.cover_image_url ? [property.cover_image_url] : []),
    ...(property.image_urls ?? []),
  ]
  const price = formatPrice(property.price_usd, property.price_ars, property.currency)
  const location = [property.address, property.neighborhood, property.city]
    .filter(Boolean)
    .join(', ')

  return (
    <article className="pt-20">
      <section aria-label="Galería de imágenes">
        <PropertyGallery images={images} title={property.title} />
      </section>

      <div className="container-narrow py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <div className="space-y-10">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge type={property.operation_type} />
                <span className="font-josefin text-xs text-text-muted uppercase tracking-widest">
                  {propertyTypeLabel(property.property_type)}
                </span>
              </div>

              <h1
                className="font-cinzel text-navy font-semibold leading-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                {property.title}
              </h1>

              {location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-gold shrink-0" />
                  <span className="font-josefin text-sm text-text-muted">{location}</span>
                </div>
              )}

              <p className="mt-3 font-cinzel text-2xl text-navy font-semibold">{price}</p>
            </div>

            <PropertySpecs property={property} />

            {property.description && (
              <div>
                <SectionLabel>La Propiedad</SectionLabel>
                <h2 className="font-cinzel text-navy font-semibold text-xl mb-4">Descripción</h2>
                <div
                  className="font-josefin text-text-muted text-sm leading-relaxed space-y-3"
                  style={{ borderLeft: '3px solid #C4A35A', paddingLeft: '1.5rem' }}
                >
                  {property.description.split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            <PropertyAmenities
              amenities={property.amenities ?? []}
              hasPool={property.has_pool}
              hasGarden={property.has_garden}
              hasElevator={property.has_elevator ?? false}
            />

            {property.tour_360_url && (
              <div>
                <SectionLabel>Tour Virtual</SectionLabel>
                <h2 className="font-cinzel text-navy font-semibold text-xl mb-4">Recorrido 360°</h2>
                <iframe
                  src={property.tour_360_url}
                  className="w-full aspect-video"
                  allowFullScreen
                  title="Tour virtual 360°"
                />
              </div>
            )}
          </div>

          <aside>
            <WhatsAppCta property={property} />
          </aside>
        </div>
      </div>
    </article>
  )
}
