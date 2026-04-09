'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PropertyCard from '@/components/properties/PropertyCard'
import SectionLabel from '@/components/ui/SectionLabel'
import Skeleton from '@/components/ui/Skeleton'
import { useProperties } from '@/hooks/useProperties'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null)
  const { data, isLoading } = useProperties({ per_page: 6 })
  const properties = data?.data ?? []

  useEffect(() => {
    if (properties.length === 0) return
    const ctx = gsap.context(() => {
      gsap.from('.featured-card', {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [properties.length])

  return (
    <section ref={sectionRef} className="py-24 bg-surface">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <SectionLabel>Propiedades Destacadas</SectionLabel>
            <h2
              className="font-cinzel text-navy font-semibold"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              Selección Curada
            </h2>
          </div>
          <Link
            href="/propiedades"
            className="mt-4 md:mt-0 font-josefin text-sm text-navy hover:text-gold transition-colors uppercase tracking-widest border-b border-navy/30 hover:border-gold pb-1"
          >
            Ver todas las propiedades →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[16/10] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="featured-card">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
