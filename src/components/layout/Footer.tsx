'use client'

import Link from 'next/link'
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'
import { useAgency } from '@/hooks/useAgency'

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

export default function Footer() {
  const { data: agencyData } = useAgency()
  const agency = agencyData?.data ?? null
  const name = agency?.name ?? 'Del Norte Estudio Inmobiliario'
  const address = agency?.address ?? 'San Salvador de Jujuy, Jujuy'
  const email = agency?.email ?? 'delnorte.estudio@gmail.com'
  const phone = agency?.phone ?? '+54 9 388 332-1018'
  const instagram = agency?.settings?.website_instagram ?? 'https://www.instagram.com/delnorte_estudio/'
  const facebook = agency?.settings?.website_facebook ?? 'https://www.facebook.com/people/Del-Norte-Inmobiliaria-en-Jujuy/61583893247898/'

  return (
    <footer className="bg-primary text-white">
      <div className="container-wide pt-20 pb-10">
        {/* Big heading */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-secondary-fixed mb-6">
            Hablemos
          </p>
          <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
            Encontremos juntos
            <br />
            <span className="text-secondary-fixed">tu próximo hogar.</span>
          </h2>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 mt-10 font-body text-sm font-bold tracking-tight text-white hover:text-secondary-fixed transition-colors border-b-2 border-white/20 hover:border-secondary-fixed pb-2"
          >
            Iniciar conversación
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-5">
            <div>
              <p className="font-headline text-white text-2xl font-bold tracking-tight">
                Del<span className="text-secondary-fixed">Norte</span>
              </p>
              <p className="font-body text-white/50 text-[10px] tracking-[0.25em] uppercase mt-1">
                Estudio Inmobiliario · Jujuy
              </p>
            </div>
            <p className="font-body text-sm leading-relaxed text-white/60 max-w-xs">
              Curaduría de propiedades en el NOA. Más de dos décadas acompañando decisiones que cambian vidas.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary-fixed mb-6 font-bold">
              Navegar
            </p>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/propiedades', label: 'Propiedades' },
                { href: '/propiedades?operation_type=venta', label: 'Venta' },
                { href: '/propiedades?operation_type=alquiler', label: 'Alquiler' },
                { href: '/contacto', label: 'Contacto' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-white/70 hover:text-secondary-fixed transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary-fixed mb-6 font-bold">
              Contacto
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-secondary-fixed/70" />
                <span className="font-body text-sm text-white/70 leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0 text-secondary-fixed/70" />
                <a
                  href={`mailto:${email}`}
                  className="font-body text-sm text-white/70 hover:text-secondary-fixed transition-colors break-all"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0 text-secondary-fixed/70" />
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-body text-sm text-white/70 hover:text-secondary-fixed transition-colors"
                >
                  {phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary-fixed mb-6 font-bold">
              Seguinos
            </p>
            <div className="flex gap-3">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-secondary-fixed hover:bg-secondary-fixed hover:text-primary text-white/70 flex items-center justify-center transition-colors"
              >
                <IconInstagram size={15} />
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-secondary-fixed hover:bg-secondary-fixed hover:text-primary text-white/70 flex items-center justify-center transition-colors"
              >
                <IconFacebook size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {name}. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-white/30 tracking-wide">Powered by SEE ADMIN</p>
        </div>
      </div>
    </footer>
  )
}
