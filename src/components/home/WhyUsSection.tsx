'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Users, Star, Clock } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import type { LucideIcon } from 'lucide-react'

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
    description: 'Dos décadas liderando el mercado inmobiliario de Jujuy con transparencia y profesionalismo.',
  },
  {
    icon: Users,
    title: 'Equipo certificado',
    description: 'Brokers matriculados con profundo conocimiento del mercado local y la región NOA.',
  },
  {
    icon: Star,
    title: 'Atención personalizada',
    description: 'Cada cliente recibe asesoramiento exclusivo adaptado a sus necesidades y objetivos.',
  },
  {
    icon: Clock,
    title: 'Respuesta inmediata',
    description: 'Te contactamos en menos de 2 horas. Disponibles por WhatsApp, email y teléfono.',
  },
]

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-item', {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
      gsap.from('.why-image', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden" style={{ backgroundColor: '#EEF0F2' }}>
      <div className="container-narrow grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>¿Por qué elegirnos?</SectionLabel>
          <h2
            className="font-cinzel text-navy font-semibold mb-10"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            La Diferencia Del Norte
          </h2>
          <div className="space-y-7">
            {reasons.map(({ icon: Icon, title, description }) => (
              <div key={title} className="why-item flex gap-5">
                <div className="shrink-0 w-10 h-10 bg-navy flex items-center justify-center">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-cinzel text-navy font-semibold text-base mb-1">{title}</h4>
                  <p className="font-josefin text-text-muted text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="why-image relative aspect-[4/5] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"
            alt="Propiedad en Jujuy"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-navy/90 p-5">
            <p className="font-cinzel text-gold text-2xl font-semibold">+200</p>
            <p className="font-josefin text-white/70 text-sm mt-1">
              propiedades vendidas en los últimos 5 años
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
