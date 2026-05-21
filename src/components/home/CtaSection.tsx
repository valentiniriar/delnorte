'use client'

import { MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { buildWhatsAppUrl } from '@/lib/utils'
import { useAgency } from '@/hooks/useAgency'

export default function CtaSection() {
  const { data } = useAgency()
  const whatsapp = data?.data?.settings?.website_whatsapp ?? '5493881234567'
  const url = buildWhatsAppUrl(
    whatsapp,
    'Hola, me gustaría consultar sobre sus propiedades disponibles.',
  )

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-xl bg-primary-900 px-8 py-16 md:px-16 md:py-24 shadow-editorial-lg">
          {/* Decorative gradient */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(circle at 85% 20%, rgba(216,182,153,0.22) 0%, transparent 45%), radial-gradient(circle at 15% 90%, rgba(20,30,45,0.5) 0%, transparent 40%)',
            }}
          />

          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-secondary-fixed mb-6">
              ¿Listo para comenzar?
            </p>
            <h2 className="font-headline text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6">
              Encontrá tu próxima
              <br />
              <span className="text-secondary-fixed">propiedad ideal.</span>
            </h2>
            <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-10">
              Hablá directamente con nuestro equipo. Te asesoramos sin compromiso y con toda la
              información que necesitás para decidir con confianza.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-secondary-fixed hover:bg-secondary-dim text-primary font-body font-bold text-sm px-8 py-4 rounded-lg tracking-tight transition-colors"
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>
              <Link
                href="/propiedades"
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-secondary-fixed hover:text-secondary-fixed text-white font-body font-bold text-sm px-8 py-4 rounded-lg tracking-tight transition-colors"
              >
                Ver propiedades
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
