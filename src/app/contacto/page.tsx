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

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
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
  const address = agency?.address ?? 'San Salvador de Jujuy, Jujuy'
  const email = agency?.email ?? ''
  const phone = agency?.phone ?? '+54 9 388 332-1018'
  const whatsapp = agency?.settings?.website_whatsapp ?? '5493883321018'
  const instagram = agency?.settings?.website_instagram ?? 'https://www.instagram.com/delnorte_estudio/'
  const facebook = agency?.settings?.website_facebook ?? 'https://www.facebook.com/people/Del-Norte-Inmobiliaria-en-Jujuy/61583893247898/'

  const whatsappUrl = whatsapp
    ? buildWhatsAppUrl(whatsapp, 'Hola, me gustaría recibir información sobre sus propiedades.')
    : null

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(255,222,165,0.25) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(119,90,25,0.4) 0%, transparent 50%)',
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
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center shrink-0">
                    <IconInstagram size={22} />
                  </div>
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
                    <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                      <MessageCircle size={22} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-headline text-primary font-bold text-lg mb-1 tracking-tight">WhatsApp</p>
                      <p className="font-body text-on-surface-variant text-sm mb-1 break-all">{whatsapp}</p>
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
              <div className="relative overflow-hidden rounded-xl bg-primary p-8 md:p-10 shadow-editorial-lg">
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14386.2!2d-65.3023!3d-24.1858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0edf2de92291%3A0x4e361c48b5a64b7!2sSan%20Salvador%20de%20Jujuy!5e0!3m2!1ses!2sar"
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
