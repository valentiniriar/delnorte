import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchProperty } from '@/lib/api'
import PropertyGallery from '@/components/property-detail/PropertyGallery'
import PropertySpecs from '@/components/property-detail/PropertySpecs'
import PropertyAmenities from '@/components/property-detail/PropertyAmenities'
import WhatsAppCta from '@/components/property-detail/WhatsAppCta'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import { formatPrice, propertyTypeLabel } from '@/lib/utils'
import { MapPin, ChevronRight } from 'lucide-react'

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
  const location = [property.neighborhood, property.city].filter(Boolean).join(', ')
  const fullAddress = [property.address, property.neighborhood, property.city]
    .filter(Boolean)
    .join(', ')

  return (
    <article className="pt-20 bg-background">
      {/* Breadcrumb */}
      <div className="container-wide pt-6 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-body text-xs text-on-surface-variant"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <ChevronRight size={12} />
          <Link href="/propiedades" className="hover:text-primary transition-colors">
            Propiedades
          </Link>
          <ChevronRight size={12} />
          <span className="text-primary font-medium truncate max-w-xs">{property.title}</span>
        </nav>
      </div>

      {/* Header */}
      <header className="container-wide pt-4 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge type={property.operation_type} />
              <span className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                {propertyTypeLabel(property.property_type)}
              </span>
              <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                Ref. {property.ref_code}
              </span>
            </div>

            <h1 className="font-headline text-primary font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4">
              {property.title}
            </h1>

            {location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-secondary shrink-0" />
                <span className="font-body text-sm text-on-surface-variant">{fullAddress || location}</span>
              </div>
            )}
          </div>

          <div className="lg:text-right">
            <p className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">
              Precio
            </p>
            <p className="font-headline text-primary font-bold text-3xl md:text-4xl tracking-tight leading-none">
              {price}
            </p>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section aria-label="Galería de imágenes" className="container-wide">
        <PropertyGallery images={images} title={property.title} />
      </section>

      {/* Main content */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
          <div className="space-y-16 min-w-0">
            {/* Specs */}
            <section>
              <SectionLabel>Especificaciones</SectionLabel>
              <h2 className="font-headline text-primary font-bold text-2xl md:text-3xl mb-8 tracking-tight">
                De un vistazo
              </h2>
              <PropertySpecs property={property} />
            </section>

            {/* Description */}
            {property.description && (
              <section>
                <SectionLabel>La propiedad</SectionLabel>
                <h2 className="font-headline text-primary font-bold text-2xl md:text-3xl mb-8 tracking-tight">
                  Descripción
                </h2>
                <div className="bg-white rounded-xl shadow-editorial p-8 md:p-10">
                  <div className="font-body text-on-surface-variant text-base leading-relaxed space-y-4 max-w-3xl">
                    {property.description
                      .split('\n')
                      .filter(Boolean)
                      .map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                  </div>
                </div>
              </section>
            )}

            {/* Amenities */}
            <section>
              <PropertyAmenities
                amenities={property.amenities ?? []}
                hasPool={property.has_pool}
                hasGarden={property.has_garden}
                hasElevator={property.has_elevator ?? false}
              />
            </section>

            {/* Tour */}
            {property.tour_360_url && (
              <section>
                <SectionLabel>Tour virtual</SectionLabel>
                <h2 className="font-headline text-primary font-bold text-2xl md:text-3xl mb-8 tracking-tight">
                  Recorrido 360°
                </h2>
                <div className="rounded-xl overflow-hidden shadow-editorial-lg">
                  <iframe
                    src={property.tour_360_url}
                    className="w-full aspect-video"
                    allowFullScreen
                    title="Tour virtual 360°"
                  />
                </div>
              </section>
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
