'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import PropertyCard from '@/components/properties/PropertyCard'
import SectionLabel from '@/components/ui/SectionLabel'
import Skeleton from '@/components/ui/Skeleton'
import { useProperties } from '@/hooks/useProperties'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null)
  const { data, isLoading } = useProperties({ per_page: 6 })
  const properties = data?.data ?? []

  useEffect(() => {
    if (properties.length === 0) return
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featured-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        },
      )
      ScrollTrigger.refresh()
    }, sectionRef)
    return () => ctx.revert()
  }, [properties.length])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Propiedades Destacadas</SectionLabel>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
              Estancias del Norte
            </h2>
          </div>
          <Link
            href="/propiedades"
            className="group flex items-center gap-2 font-body text-sm font-bold tracking-tight text-secondary hover:text-secondary-hover transition-colors pb-2 border-b-2 border-transparent hover:border-secondary"
          >
            Ver toda la colección
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
