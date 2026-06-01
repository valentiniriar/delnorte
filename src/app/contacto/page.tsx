import type { Metadata } from 'next'
import { fetchAgency } from '@/lib/api'
import { buildWhatsAppUrl } from '@/lib/utils'
import { MessageCircle, Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá a Del Norte Estudio Inmobiliario. Estamos en Jujuy, disponibles por WhatsApp, email y teléfono.',
}

/** Logo oficial de Instagram (ícono cuadrado con gradiente de marca) */
function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="ig-rg" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#ig-rg)" />
      <rect x="13" y="13" width="30" height="30" rx="7.5" stroke="white" strokeWidth="2.5" fill="none" />
      <circle cx="28" cy="28" r="7.5" stroke="white" strokeWidth="2.5" fill="none" />
      <circle cx="37.5" cy="18.5" r="2" fill="white" />
    </svg>
  )
}

/** Ícono pequeño de Instagram (solo outline, para botones de redes sociales) */
function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/** Logo oficial de WhatsApp (ícono cuadrado con fondo verde) */
function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="56" height="56" rx="13" fill="#25D366" />
      <path
        d="M28 12C19.163 12 12 19.163 12 28.04C12 30.97 12.8 33.74 14.22 36.1L12 44L20.22 41.82C22.52 43.14 25.17 43.9 28 43.9C36.837 43.9 44 36.737 44 27.9C44 19.063 36.837 12 28 12Z"
        fill="white"
      />
      <path
        d="M28 13.6C19.993 13.6 13.6 20.053 13.6 28.04C13.6 30.84 14.39 33.45 15.75 35.67L13.64 43L21.2 40.91C23.38 42.22 25.91 42.98 28.6 42.98C36.607 42.98 43 36.527 43 28.54C43 20.553 36.607 13.6 28 13.6Z"
        fill="#25D366"
      />
      <path
        d="M22.5 21.5H22.13C21.83 21.5 21.5 21.63 21.25 21.88C20.63 22.5 20 23.63 20 25.25C20 27.5 21.25 29.5 22.5 31C23.75 32.5 26.5 35.25 30.25 36.38C31.44 36.75 32.37 36.88 33.13 36.75C33.63 36.63 34.5 36.13 35.13 35.5C35.75 34.88 36 34.13 36 33.5C36 33.13 35.88 32.88 35.63 32.75L32.38 31.13C32.13 31 31.75 31.13 31.5 31.38L30.25 32.63C30 32.88 29.63 32.88 29.38 32.75C28.5 32.25 27 31.25 25.88 30C24.88 28.88 24.13 27.5 23.88 26.75C23.75 26.5 23.88 26.13 24.13 25.88L25.25 24.75C25.5 24.5 25.5 24.13 25.38 23.88L23.75 21.88C23.63 21.63 23.38 21.5 23.13 21.5H22.5Z"
        fill="white"
      />
    </svg>
  )
}

function formatWhatsAppDisplay(raw: string): string {
  if (/^549\d{10}$/.test(raw)) {
    return `+54 9 ${raw.slice(3, 6)} ${raw.slice(6, 9)}-${raw.slice(9)}`
  }
  return raw
}

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export default async function ContactPage() {
  const agencyData = await fetchAgency().catch(() => null)
  const agency = agencyData?.data

  const name = agency?.name ?? 'Del Norte Estudio Inmobiliario'
  const address = agency?.address ?? 'Belgrano esq. Otero, San Salvador de Jujuy, Jujuy'
  const email = agency?.email ?? ''
  const phone = agency?.phone ?? '+54 9 388 332-1018'
  const whatsappRaw = agency?.settings?.website_whatsapp ?? ''
  const whatsapp = /^\d{10,15}$/.test(whatsappRaw) ? whatsappRaw : '5493883321018'
  const instagram = agency?.settings?.website_instagram ?? 'https://www.instagram.com/delnorte_estudio/'
  const facebook = agency?.settings?.website_facebook ?? 'https://www.facebook.com/people/Del-Norte-Inmobiliaria-en-Jujuy/61583893247898/'

  const whatsappUrl = whatsapp
    ? buildWhatsAppUrl(whatsapp, 'Hola, me gustaría recibir información sobre sus propiedades.')
    : null

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(216,182,153,0.35) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(20,30,45,0.6) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="container-wide relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <SectionLabel className="text-secondary-fixed">Hablemos</SectionLabel>
            <h1 className="font-headline text-white font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
              Estamos acá
              <br />
              <span className="text-secondary-fixed">para ayudarte.</span>
            </h1>
            <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
              Nuestro equipo está listo para asesorarte. Respondemos en menos de 2 horas en horario
              comercial — sin compromiso y con toda la información que necesitás.
            </p>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Channels */}
            <div>
              <SectionLabel>Canales disponibles</SectionLabel>
              <h2 className="font-headline text-primary font-bold text-3xl md:text-4xl leading-tight tracking-tight mb-10">
                Elegí cómo prefieres hablar
              </h2>

              <div className="space-y-4">
                {/* Instagram — siempre visible */}
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-5 p-6 bg-white rounded-xl shadow-editorial hover:shadow-editorial-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <InstagramLogo className="w-14 h-14 shrink-0 rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <p className="font-headline text-primary font-bold text-lg mb-1 tracking-tight">Instagram</p>
                    <p className="font-body text-on-surface-variant text-sm mb-1">@delnorte_estudio</p>
                    <p className="font-body text-xs text-on-surface-variant">Seguinos para ver las últimas propiedades</p>
                  </div>
                  <ArrowRight size={18} className="text-secondary shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* WhatsApp — solo si está configurado */}
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-5 p-6 bg-white rounded-xl shadow-editorial hover:shadow-editorial-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <WhatsAppLogo className="w-14 h-14 shrink-0 rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <p className="font-headline text-primary font-bold text-lg mb-1 tracking-tight">WhatsApp</p>
                      <p className="font-body text-on-surface-variant text-sm mb-1">{formatWhatsAppDisplay(whatsapp)}</p>
                      <p className="font-body text-xs text-on-surface-variant">Respuesta inmediata · Lun–Sáb 8:00–20:00</p>
                    </div>
                    <ArrowRight size={18} className="text-secondary shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}

                {/* Email — solo si está configurado */}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-start gap-5 p-6 bg-white rounded-xl shadow-editorial hover:shadow-editorial-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Mail size={22} className="text-secondary-fixed" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-headline text-primary font-bold text-lg mb-1 tracking-tight">Email</p>
                      <p className="font-body text-on-surface-variant text-sm mb-1 break-all">{email}</p>
                      <p className="font-body text-xs text-on-surface-variant">Respondemos en menos de 24 horas hábiles</p>
                    </div>
                    <ArrowRight size={18} className="text-secondary shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}

                {/* Teléfono — solo si está configurado */}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="group flex items-start gap-5 p-6 bg-white rounded-xl shadow-editorial hover:shadow-editorial-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                      <Phone size={22} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-headline text-primary font-bold text-lg mb-1 tracking-tight">Teléfono</p>
                      <p className="font-body text-on-surface-variant text-sm mb-1">{phone}</p>
                      <p className="font-body text-xs text-on-surface-variant">Llamadas · Disponible hoy</p>
                    </div>
                    <ArrowRight size={18} className="text-secondary shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Office card + map */}
            <div className="space-y-6 lg:sticky lg:top-28 self-start">
              <div className="relative overflow-hidden rounded-xl bg-primary-900 p-8 md:p-10 shadow-editorial-lg">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />

                <div className="relative z-10">
                  <p className="font-body text-[10px] text-secondary-fixed uppercase tracking-[0.25em] font-bold mb-4">
                    Nuestra oficina
                  </p>
                  <p className="font-headline text-white font-bold text-2xl md:text-3xl tracking-tight mb-8">
                    {name}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={16}
                        className="text-secondary-fixed mt-0.5 shrink-0"
                      />
                      <span className="font-body text-white/80 text-sm leading-relaxed">
                        {address}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="text-secondary-fixed mt-0.5 shrink-0" />
                      <span className="font-body text-white/80 text-sm leading-relaxed">
                        Lunes a Viernes · 9:00 – 18:00 hs
                        <br />
                        Sábados · 10:00 – 14:00 hs
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="font-body text-[10px] text-secondary-fixed uppercase tracking-[0.25em] font-bold mb-4">
                      Seguinos
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="w-11 h-11 rounded-full border border-white/20 hover:border-secondary-fixed hover:bg-secondary-fixed hover:text-primary text-white/80 flex items-center justify-center transition-colors"
                      >
                        <IconInstagram size={16} />
                      </a>
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="w-11 h-11 rounded-full border border-white/20 hover:border-secondary-fixed hover:bg-secondary-fixed hover:text-primary text-white/80 flex items-center justify-center transition-colors"
                      >
                        <IconFacebook size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-editorial">
                <iframe
                  src="https://maps.google.com/maps?q=Belgrano+y+Otero,+San+Salvador+de+Jujuy,+Jujuy,+Argentina&hl=es&z=17&output=embed"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Del Norte Estudio Inmobiliario"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
