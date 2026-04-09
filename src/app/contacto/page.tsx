import type { Metadata } from 'next'
import { fetchAgency } from '@/lib/api'
import { buildWhatsAppUrl } from '@/lib/utils'
import { MessageCircle, Mail, MapPin, Phone, Clock } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá a Inmobiliaria del Norte. Estamos en San Salvador de Jujuy, disponibles por WhatsApp, email y teléfono.',
}

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export default async function ContactPage() {
  const agencyData = await fetchAgency().catch(() => null)
  const agency = agencyData?.data

  const name = agency?.name ?? 'Inmobiliaria del Norte'
  const address = agency?.address ?? 'Av. Belgrano 500, San Salvador de Jujuy'
  const email = agency?.email ?? 'contacto@inmobiliariadelnorte.com'
  const phone = agency?.phone ?? '+54 388 123 4567'
  const whatsapp = agency?.settings?.website_whatsapp ?? '5493881234567'
  const instagram = agency?.settings?.website_instagram ?? '#'
  const facebook = agency?.settings?.website_facebook ?? '#'

  const whatsappUrl = buildWhatsAppUrl(
    whatsapp,
    'Hola, me gustaría recibir información sobre sus propiedades.',
  )

  return (
    <div className="pt-20">
      <section
        className="relative py-24 flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #041627 0%, #062d4a 100%)',
        }}
      >
        <div className="container-narrow relative z-10">
          <SectionLabel className="text-gold/80">Ponete en Contacto</SectionLabel>
          <h1
            className="font-cinzel text-white font-semibold"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Hablemos
          </h1>
          <p className="font-josefin text-white/60 text-lg mt-4 max-w-md">
            Nuestro equipo está listo para asesorarte. Respondemos en menos de 2 horas.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="container-narrow grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="font-cinzel text-navy font-semibold text-2xl mb-8">
              Nuestros Canales
            </h2>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-5 p-6 bg-white hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
              style={{ boxShadow: '0 4px 24px rgba(4,22,39,0.06)' }}
            >
              <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle size={22} className="text-white" />
              </div>
              <div>
                <p className="font-cinzel text-navy font-semibold mb-1">WhatsApp</p>
                <p className="font-josefin text-text-muted text-sm mb-1">{whatsapp}</p>
                <p className="font-josefin text-xs text-text-muted">
                  Respuesta inmediata · Lun–Sáb 8:00–20:00
                </p>
              </div>
            </a>

            <a
              href={`mailto:${email}`}
              className="group flex items-start gap-5 p-6 bg-white hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
              style={{ boxShadow: '0 4px 24px rgba(4,22,39,0.06)' }}
            >
              <div className="w-12 h-12 bg-navy flex items-center justify-center shrink-0">
                <Mail size={22} className="text-gold" />
              </div>
              <div>
                <p className="font-cinzel text-navy font-semibold mb-1">Email</p>
                <p className="font-josefin text-text-muted text-sm mb-1">{email}</p>
                <p className="font-josefin text-xs text-text-muted">
                  Respondemos en menos de 24 horas hábiles
                </p>
              </div>
            </a>

            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="group flex items-start gap-5 p-6 bg-white hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
              style={{ boxShadow: '0 4px 24px rgba(4,22,39,0.06)' }}
            >
              <div className="w-12 h-12 bg-gold flex items-center justify-center shrink-0">
                <Phone size={22} className="text-navy" />
              </div>
              <div>
                <p className="font-cinzel text-navy font-semibold mb-1">Teléfono</p>
                <p className="font-josefin text-text-muted text-sm mb-1">{phone}</p>
                <p className="font-josefin text-xs text-text-muted">
                  Llamadas y WhatsApp · Disponible hoy
                </p>
              </div>
            </a>
          </div>

          <div className="space-y-8">
            <div className="bg-navy p-8">
              <p className="font-josefin text-xs text-gold uppercase tracking-[0.3em] mb-6">
                Nuestra Oficina
              </p>
              <p className="font-cinzel text-white font-semibold text-xl mb-6">{name}</p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gold/70 mt-0.5 shrink-0" />
                  <span className="font-josefin text-white/70 text-sm">{address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gold/70 shrink-0" />
                  <span className="font-josefin text-white/70 text-sm">
                    Lunes a Viernes · 9:00 – 18:00 hs
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex gap-3">
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 border border-white/20 hover:border-gold hover:text-gold text-white/60 transition-colors"
                >
                  <IconInstagram size={16} />
                </a>
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-3 border border-white/20 hover:border-gold hover:text-gold text-white/60 transition-colors"
                >
                  <IconFacebook size={16} />
                </a>
              </div>
            </div>

            <div className="aspect-video bg-navy-900 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14386.2!2d-65.3023!3d-24.1858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0edf2de92291%3A0x4e361c48b5a64b7!2sSan%20Salvador%20de%20Jujuy!5e0!3m2!1ses!2sar"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Inmobiliaria del Norte"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
