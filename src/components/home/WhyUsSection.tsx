'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Users, Star, Clock } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import type { LucideIcon } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface Reason {
  icon: LucideIcon
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: '+20 años de experiencia',
    description:
      'Dos décadas liderando el mercado inmobiliario de Jujuy con transparencia y profesionalismo.',
  },
  {
    icon: Users,
    title: 'Equipo certificado',
    description:
      'Brokers matriculados con profundo conocimiento del mercado local y la región NOA.',
  },
  {
    icon: Star,
    title: 'Atención personalizada',
    description:
      'Asesoramiento exclusivo adaptado a las necesidades y objetivos de cada cliente.',
  },
  {
    icon: Clock,
    title: 'Respuesta inmediata',
    description:
      'Te contactamos en menos de 2 horas. Disponibles por WhatsApp, email y teléfono.',
  },
]

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )
      gsap.fromTo(
        '.why-image',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )
      ScrollTrigger.refresh()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="why-image relative aspect-[4/5] rounded-xl overflow-hidden shadow-editorial-lg order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=85"
            alt="Propiedad en Jujuy"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-editorial">
            <p className="font-headline text-secondary text-4xl font-bold tracking-tight">+200</p>
            <p className="font-body text-on-surface-variant text-sm mt-1">
              propiedades vendidas en los últimos 5 años
            </p>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <SectionLabel>¿Por qué elegirnos?</SectionLabel>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight mb-10 md:mb-12">
            La diferencia
            <br />
            <span className="text-secondary">Del Norte</span>
          </h2>
          <div className="space-y-8">
            {reasons.map(({ icon: Icon, title, description }) => (
              <div key={title} className="why-item flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-headline text-primary font-bold text-lg mb-1.5 tracking-tight">
                    {title}
                  </h4>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
