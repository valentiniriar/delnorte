'use client'

import { MessageCircle, Phone, Mail, Calendar } from 'lucide-react'
import { buildWhatsAppUrl, formatPrice } from '@/lib/utils'
import { useAgency } from '@/hooks/useAgency'
import type { PropertyDetail } from '@/types'

interface WhatsAppCtaProps {
  property: PropertyDetail
}

export default function WhatsAppCta({ property }: WhatsAppCtaProps) {
  const { data } = useAgency()
  const agency = data?.data
  const phone = agency?.settings?.website_whatsapp ?? '5493881234567'

  const message = `Hola, me interesa la propiedad: "${property.title}" (${property.ref_code}). ¿Podría darme más información?`
  const whatsappUrl = buildWhatsAppUrl(phone, message)
  const visitMessage = `Hola, me gustaría agendar una visita para ver: "${property.title}" (${property.ref_code}).`
  const visitUrl = buildWhatsAppUrl(phone, visitMessage)

  const price = formatPrice(property.price_usd, property.price_ars, property.currency)

  return (
    <div className="bg-white rounded-xl p-7 shadow-editorial-lg lg:sticky lg:top-28">
      <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold mb-2">
        Precio de referencia
      </p>
      <p className="font-headline text-primary font-bold text-3xl leading-none tracking-tight">
        {price}
      </p>
      {property.rental_period && (
        <p className="font-body text-xs text-on-surface-variant mt-2">
          {property.rental_period === 'mensual' ? 'Valor mensual' : 'Valor por día'}
        </p>
      )}

      <div className="w-full h-px bg-outline-variant/40 my-6" />

      <div className="space-y-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full bg-primary hover:bg-primary-800 text-white font-body font-bold text-sm py-4 rounded-lg tracking-tight transition-colors"
        >
          <MessageCircle size={17} />
          Consultar ahora
        </a>

        <a
          href={visitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full bg-secondary-fixed hover:bg-secondary-dim text-primary font-body font-bold text-sm py-4 rounded-lg tracking-tight transition-colors"
        >
          <Calendar size={17} />
          Agendar visita
        </a>

        {agency?.phone && (
          <a
            href={`tel:${agency.phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2.5 w-full border border-outline-variant hover:border-primary hover:bg-primary hover:text-white text-primary font-body font-bold text-sm py-4 rounded-lg tracking-tight transition-colors"
          >
            <Phone size={16} />
            Llamar
          </a>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-outline-variant/40 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-body text-xs text-on-surface-variant">Referencia</span>
          <span className="font-body text-xs font-bold text-primary tracking-wider">
            {property.ref_code}
          </span>
        </div>

        {agency && (
          <div className="pt-2">
            <p className="font-headline text-primary font-bold text-sm tracking-tight mb-2">
              {agency.name}
            </p>
            {agency.email && (
              <a
                href={`mailto:${agency.email}`}
                className="flex items-center gap-2 group"
              >
                <Mail size={13} className="text-secondary" />
                <span className="font-body text-xs text-on-surface-variant group-hover:text-primary transition-colors break-all">
                  {agency.email}
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
