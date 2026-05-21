'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, Key, Calendar, ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import type { LucideIcon } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface ServiceItem {
  icon: LucideIcon
  label: string
  title: string
  description: string
  href: string
}

const services: ServiceItem[] = [
  {
    icon: Home,
    label: 'Venta',
    title: 'Compra tu hogar',
    description:
      'Accedé a un portfolio curado de casas, departamentos y lotes en los puntos más buscados de Jujuy y la Quebrada.',
    href: '/propiedades?operation_type=venta',
  },
  {
    icon: Key,
    label: 'Alquiler',
    title: 'Alquilá con confianza',
    description:
      'Amplia oferta de propiedades en alquiler, con contratos claros y soporte integral durante toda tu estadía.',
    href: '/propiedades?operation_type=alquiler',
  },
  {
    icon: Calendar,
    label: 'Temporal',
    title: 'Estadías temporales',
    description:
      'Alquileres por días o semanas en destinos únicos de la Quebrada: Purmamarca, Tilcara y Maimará.',
    href: '/propiedades?operation_type=alquiler_temporal',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
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
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-surface-container-low">
      <div className="container-wide">
        <div className="max-w-2xl mb-14 md:mb-20">
          <SectionLabel>Nuestros Servicios</SectionLabel>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
            Un camino para cada historia
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map(({ icon: Icon, label, title, description, href }) => (
            <Link
              key={label}
              href={href}
              className="service-card group relative flex flex-col bg-white rounded-xl p-8 md:p-10 shadow-editorial hover:shadow-editorial-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary-fixed/40 transition-colors duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
                    {label}
                  </span>
                </div>

                <h3 className="font-headline text-2xl md:text-[1.75rem] font-bold text-primary mb-4 leading-tight tracking-tight">
                  {title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8 flex-1">
                  {description}
                </p>

                <span className="inline-flex items-center gap-2 font-body text-xs font-bold tracking-[0.2em] uppercase text-secondary group-hover:gap-3 transition-all">
                  Explorar
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
