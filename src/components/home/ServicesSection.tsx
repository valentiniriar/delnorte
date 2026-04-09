'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, Key, Calendar } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import type { LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ServiceItem {
  icon: LucideIcon
  label: string
  title: string
  description: string
  href: string
  bg: string
  color: string
  accent: string
}

const services: ServiceItem[] = [
  {
    icon: Home,
    label: 'Venta',
    title: 'Compra tu Hogar',
    description:
      'Accedé a un portfolio exclusivo de casas, departamentos y lotes en las mejores ubicaciones de Jujuy y la Quebrada.',
    href: '/propiedades?operation_type=venta',
    bg: 'bg-navy',
    color: 'text-white',
    accent: 'text-gold',
  },
  {
    icon: Key,
    label: 'Alquiler',
    title: 'Alquilá con Confianza',
    description:
      'Amplia oferta de propiedades para alquilar, con contratos claros y soporte completo durante toda tu estadía.',
    href: '/propiedades?operation_type=alquiler',
    bg: 'bg-white',
    color: 'text-navy',
    accent: 'text-gold',
  },
  {
    icon: Calendar,
    label: 'Temporal',
    title: 'Estadías Temporales',
    description:
      'Alquileres por días o semanas en destinos únicos de la Quebrada: Purmamarca, Tilcara y Maimará.',
    href: '/propiedades?operation_type=alquiler_temporal',
    bg: 'bg-surface',
    color: 'text-navy',
    accent: 'text-gold',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <SectionLabel>Nuestros Servicios</SectionLabel>
          <h2
            className="font-cinzel text-navy font-semibold"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            Todo lo que Necesitás
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, label, title, description, href, bg, color, accent }) => (
            <Link
              key={label}
              href={href}
              className={`service-card group p-8 ${bg} ${color} transition-transform duration-300 hover:-translate-y-1`}
              style={{ boxShadow: '0 4px 24px rgba(4,22,39,0.06)' }}
            >
              <span className={`font-josefin text-xs font-medium tracking-[0.3em] uppercase ${accent} mb-5 block`}>
                {label}
              </span>
              <Icon size={32} className={`mb-6 ${accent} opacity-80`} />
              <h3 className="font-cinzel text-xl font-semibold mb-3">{title}</h3>
              <p className={`font-josefin text-sm leading-relaxed ${color} opacity-70 mb-6`}>
                {description}
              </p>
              <span className={`font-josefin text-xs font-semibold tracking-widest uppercase ${accent}`}>
                Explorar →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
