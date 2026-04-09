'use client'

import { MessageCircle, Phone, Mail } from 'lucide-react'
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

  const price = formatPrice(property.price_usd, property.price_ars, property.currency)

  return (
    <div
      className="bg-white p-6 sticky top-24"
      style={{ boxShadow: '0 8px 40px rgba(4,22,39,0.12)' }}
    >
      <p className="font-josefin text-xs text-text-muted uppercase tracking-widest mb-1">
        Precio
      </p>
      <p className="font-cinzel text-navy font-semibold text-2xl mb-1">{price}</p>
      {property.rental_period && (
        <p className="font-josefin text-xs text-text-muted mb-4">
          {property.rental_period === 'mensual' ? 'por mes' : 'por día'}
        </p>
      )}

      <div className="w-full h-px bg-surface-2 my-5" />

      <div className="space-y-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1fb958] text-white font-josefin font-semibold text-sm py-4 tracking-wider uppercase transition-colors cursor-pointer"
        >
          <MessageCircle size={18} />
          Consultar por WhatsApp
        </a>

        {agency?.phone && (
          <a
            href={`tel:${agency.phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2.5 w-full border border-navy text-navy hover:bg-navy hover:text-white font-josefin font-semibold text-sm py-4 tracking-wider uppercase transition-colors cursor-pointer"
          >
            <Phone size={16} />
            Llamar
          </a>
        )}
      </div>

      <div className="w-full h-px bg-surface-2 my-5" />

      <p className="font-josefin text-xs text-text-muted text-center">
        Ref: <span className="font-medium text-text">{property.ref_code}</span>
      </p>

      {agency && (
        <div className="mt-4 pt-4 border-t border-surface-2">
          <p className="font-cinzel text-navy font-semibold text-sm mb-1">{agency.name}</p>
          {agency.email && (
            <a href={`mailto:${agency.email}`} className="flex items-center gap-2 mt-2">
              <Mail size={13} className="text-gold" />
              <span className="font-josefin text-xs text-text-muted hover:text-navy transition-colors">
                {agency.email}
              </span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}
