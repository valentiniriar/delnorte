'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Encontramos nuestra casa en Tilcara gracias al equipo de Del Norte. El proceso fue transparente y muy profesional.',
    name: 'Marcela R.',
    role: 'Compradora · Tilcara',
  },
  {
    quote:
      'Alquilamos un departamento en el centro de Jujuy en menos de una semana. Atención excepcional y comunicación permanente.',
    name: 'Carlos M.',
    role: 'Inquilino · San Salvador de Jujuy',
  },
  {
    quote:
      'Vendieron mi propiedad en la Quebrada al precio que pedí. Conocen el mercado mejor que nadie en la región.',
    name: 'Ana P.',
    role: 'Vendedora · Purmamarca',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-surface-container-low">
      <div className="container-wide">
        <div className="max-w-2xl mb-14 md:mb-20">
          <SectionLabel>Testimonios</SectionLabel>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
            Historias que nos
            <br />
            <span className="text-secondary">enorgullecen</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map(({ quote, name, role }) => (
            <div
              key={name}
              className="testimonial-card relative bg-white rounded-xl p-8 md:p-10 shadow-editorial hover:shadow-editorial-lg transition-shadow duration-300"
            >
              <Quote
                size={28}
                className="text-secondary-fixed absolute top-8 right-8 -scale-x-100"
                strokeWidth={1.5}
              />

              <p className="font-headline text-primary text-lg leading-relaxed mb-8 font-medium tracking-tight">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="pt-6 border-t border-outline-variant/40">
                <p className="font-headline text-primary font-bold text-sm tracking-tight">
                  {name}
                </p>
                <p className="font-body text-xs text-on-surface-variant tracking-wide mt-1">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
