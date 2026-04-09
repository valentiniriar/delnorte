'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { Search, MapPin } from 'lucide-react'
import type { Agency } from '@/types'

interface HeroSectionProps {
  agency: Agency | null
}

export default function HeroSection({ agency }: HeroSectionProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headlineRef.current, subRef.current, searchRef.current], {
        opacity: 0,
        y: 40,
      })
      gsap.set(overlayRef.current, { opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(overlayRef.current, { opacity: 1, duration: 1.2 })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to(searchRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    })
    return () => ctx.revert()
  }, [])

  const headline = agency?.settings?.website_headline ?? 'Tu Hogar en el Norte'
  const subheadline =
    agency?.settings?.website_subheadline ??
    'Propiedades únicas en la Quebrada de Humahuaca y el Valle de Jujuy'

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')",
        }}
      />

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(4,22,39,0.92) 0%, rgba(4,22,39,0.75) 50%, rgba(4,22,39,0.45) 100%)',
        }}
      />

      <div className="container-narrow relative z-10 pt-32 pb-20">
        <div className="max-w-2xl">
          <p className="font-josefin text-gold text-xs font-medium tracking-[0.4em] uppercase mb-6">
            <MapPin size={12} className="inline mr-2" />
            San Salvador de Jujuy, Argentina
          </p>

          <h1
            ref={headlineRef}
            className="font-cinzel text-white font-semibold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {headline}
          </h1>

          <p
            ref={subRef}
            className="font-josefin text-white/70 text-lg leading-relaxed mb-10 max-w-lg"
          >
            {subheadline}
          </p>

          <div ref={searchRef}>
            <form
              action="/propiedades"
              method="GET"
              className="flex flex-col sm:flex-row gap-0 bg-white shadow-2xl"
            >
              <div className="flex items-center gap-3 flex-1 px-5 py-4 border-b sm:border-b-0 sm:border-r border-surface-2">
                <Search size={18} className="text-text-muted shrink-0" />
                <input
                  type="text"
                  name="search"
                  placeholder="Barrio, ciudad o dirección..."
                  className="font-josefin text-sm w-full outline-none text-text placeholder:text-text-muted bg-transparent"
                  aria-label="Buscar propiedades"
                />
              </div>
              <select
                name="operation_type"
                className="font-josefin text-sm px-5 py-4 bg-white text-text border-b sm:border-b-0 sm:border-r border-surface-2 outline-none cursor-pointer"
                aria-label="Tipo de operación"
              >
                <option value="">Operación</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
                <option value="alquiler_temporal">Temporal</option>
              </select>
              <select
                name="property_type"
                className="font-josefin text-sm px-5 py-4 bg-white text-text border-b sm:border-b-0 sm:border-r border-surface-2 outline-none cursor-pointer"
                aria-label="Tipo de propiedad"
              >
                <option value="">Tipo</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="lote">Lote</option>
                <option value="local_comercial">Local</option>
              </select>
              <button
                type="submit"
                className="bg-navy hover:bg-navy-800 text-white font-josefin text-sm font-semibold px-8 py-4 tracking-widest uppercase transition-colors cursor-pointer"
              >
                Buscar
              </button>
            </form>
            <p className="font-josefin text-white/40 text-xs mt-3">
              Más de 50 propiedades disponibles en Jujuy
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: 'Venta en Jujuy', href: '/propiedades?operation_type=venta' },
              { label: 'Alquiler', href: '/propiedades?operation_type=alquiler' },
              { label: 'Quebrada', href: '/propiedades?search=quebrada' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-josefin text-xs text-white/60 hover:text-gold border border-white/20 hover:border-gold px-4 py-2 transition-all duration-200 tracking-wider"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        <span className="font-josefin text-xs text-white/40 tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  )
}
