'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Encontramos nuestra casa en Tilcara gracias al equipo de Del Norte. El proceso fue transparente y muy profesional. Los recomiendo sin dudarlo.',
    name: 'Marcela R.',
    role: 'Compradora, Tilcara',
  },
  {
    quote:
      'Alquilamos un departamento en el centro de Jujuy en menos de una semana. Atención excepcional y muy buena comunicación durante todo el proceso.',
    name: 'Carlos M.',
    role: 'Inquilino, San Salvador de Jujuy',
  },
  {
    quote:
      'Vendieron mi propiedad en la Quebrada al precio que pedí. Conocen el mercado mejor que nadie en la región. Una experiencia excelente.',
    name: 'Ana P.',
    role: 'Vendedora, Purmamarca',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.7,
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
          <SectionLabel>Testimonios</SectionLabel>
          <h2
            className="font-cinzel text-navy font-semibold"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            Lo que Dicen Nuestros Clientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role }) => (
            <div
              key={name}
              className="testimonial-card p-8 bg-surface border border-surface-2"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="font-josefin text-sm leading-relaxed text-text-muted mb-7 italic">
                &ldquo;{quote}&rdquo;
              </p>
              <div>
                <p className="font-cinzel text-navy font-semibold text-sm">{name}</p>
                <p className="font-josefin text-xs text-text-muted tracking-wide mt-1">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
