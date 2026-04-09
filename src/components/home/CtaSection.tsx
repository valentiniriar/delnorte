'use client'

import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import { useAgency } from '@/hooks/useAgency'

export default function CtaSection() {
  const { data } = useAgency()
  const whatsapp = data?.data?.settings?.website_whatsapp ?? '5493881234567'
  const url = buildWhatsAppUrl(whatsapp, 'Hola, me gustaría consultar sobre sus propiedades disponibles.')

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #041627 0%, #062d4a 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(196,163,90,0.4) 48px, rgba(196,163,90,0.4) 49px)',
        }}
      />

      <div className="container-narrow text-center relative z-10">
        <p className="font-josefin text-gold text-xs font-medium tracking-[0.4em] uppercase mb-6">
          ¿Listo para comenzar?
        </p>
        <h2
          className="font-cinzel text-white font-semibold mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Encontrá tu Propiedad Ideal
        </h2>
        <p className="font-josefin text-white/60 text-lg max-w-xl mx-auto mb-10">
          Hablá directamente con nuestro equipo. Te asesoramos sin compromiso y con toda la información que necesitás.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-navy font-josefin font-semibold text-sm px-10 py-4 tracking-widest uppercase transition-colors duration-200"
        >
          <MessageCircle size={18} />
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  )
}
