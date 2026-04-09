import Link from 'next/link'
import { MapPin, Mail, Phone } from 'lucide-react'
import type { Agency } from '@/types'

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

interface FooterProps {
  agency: Agency | null
}

export default function Footer({ agency }: FooterProps) {
  const name = agency?.name ?? 'Inmobiliaria del Norte'
  const address = agency?.address ?? 'Av. Belgrano 500, San Salvador de Jujuy'
  const email = agency?.email ?? 'contacto@inmobiliariadelnorte.com'
  const phone = agency?.phone ?? '+54 388 123 4567'
  const instagram = agency?.settings?.website_instagram ?? '#'
  const facebook = agency?.settings?.website_facebook ?? '#'

  return (
    <footer className="bg-navy-900 text-white/80">
      <div className="container-narrow py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div>
            <p className="font-cinzel text-gold text-xl font-semibold tracking-widest uppercase">Del Norte</p>
            <p className="font-josefin text-white/50 text-xs tracking-[0.3em] uppercase">Inmobiliaria</p>
          </div>
          <p className="font-josefin text-sm leading-relaxed text-white/60 max-w-xs">
            Tu agencia de confianza en Jujuy. Más de dos décadas conectando personas con su hogar ideal en la Quebrada y el Valle.
          </p>
          <div className="flex gap-3">
            <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="p-2 border border-white/20 hover:border-gold hover:text-gold transition-colors">
              <IconInstagram size={16} />
            </a>
            <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
               className="p-2 border border-white/20 hover:border-gold hover:text-gold transition-colors">
              <IconFacebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-josefin text-xs uppercase tracking-[0.2em] text-gold mb-6 font-medium">Navegación</p>
          <ul className="space-y-3">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/propiedades', label: 'Propiedades' },
              { href: '/propiedades?operation_type=venta', label: 'Venta' },
              { href: '/propiedades?operation_type=alquiler', label: 'Alquiler' },
              { href: '/contacto', label: 'Contacto' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="font-josefin text-sm text-white/60 hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-josefin text-xs uppercase tracking-[0.2em] text-gold mb-6 font-medium">Contacto</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold/60" />
              <span className="font-josefin text-sm text-white/60">{address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold/60" />
              <a href={`mailto:${email}`} className="font-josefin text-sm text-white/60 hover:text-gold transition-colors">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold/60" />
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-josefin text-sm text-white/60 hover:text-gold transition-colors">
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-narrow py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-josefin text-xs text-white/40">
            © {new Date().getFullYear()} {name}. Todos los derechos reservados.
          </p>
          <p className="font-josefin text-xs text-white/30">
            Powered by SEE ADMIN
          </p>
        </div>
      </div>
    </footer>
  )
}
