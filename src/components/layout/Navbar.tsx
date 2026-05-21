'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import { useAgency } from '@/hooks/useAgency'

const DEFAULT_WHATSAPP = '5493883321018'

const NAV_LINKS = [
  { href: '/propiedades', label: 'Propiedades' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: agencyData } = useAgency()
  const agency = agencyData?.data ?? null

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const whatsappRaw = agency?.settings?.website_whatsapp ?? DEFAULT_WHATSAPP

  const publishUrl = buildWhatsAppUrl(
    whatsappRaw,
    'Hola! Me gustaría publicar una propiedad con Del Norte Estudio Inmobiliario.',
  )

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300',
        'h-20 glass-nav',
        isScrolled ? 'shadow-navbar' : '',
      ].join(' ')}
    >
      <div className="container-wide h-full flex items-center justify-between gap-6">

        {/* ── Logo (left) ── */}
        <Link
          href="/"
          className="shrink-0 group"
          aria-label="Del Norte Estudio Inmobiliario — Inicio"
        >
          <img
            src="/logo_dn03.svg"
            alt="Del Norte Estudio Inmobiliario"
            className="h-9 w-auto group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* ── Center nav (desktop) ── */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'font-body text-sm font-medium tracking-wide transition-all duration-200',
                  isActive
                    ? 'text-secondary border-b-2 border-secondary pb-1'
                    : 'text-on-surface-variant hover:text-primary',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}

          <a
            href={publishUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium text-on-surface-variant hover:text-primary transition-colors tracking-wide"
          >
            Publicá tu propiedad
          </a>
        </nav>

        {/* ── Right: contact button (desktop) ── */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md font-body text-sm font-semibold hover:bg-primary-800 active:scale-[0.98] transition-all"
          >
            <MessageCircle size={15} />
            Contactar
          </Link>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary p-2 -mr-2 cursor-pointer"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-outline-variant/30 shadow-editorial">
          <nav className="container-wide py-4 flex flex-col" aria-label="Navegación móvil">
            {[{ href: '/', label: 'Inicio' }, ...NAV_LINKS].map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'font-body text-base py-4 border-b border-outline-variant/20 transition-colors',
                    isActive ? 'text-secondary font-semibold' : 'text-on-surface-variant hover:text-primary',
                  ].join(' ')}
                >
                  {label}
                </Link>
              )
            })}

            <a
              href={publishUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-base py-4 border-b border-outline-variant/20 text-on-surface-variant hover:text-primary transition-colors"
            >
              Publicá tu propiedad
            </a>

            <div className="pt-4">
              <Link
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary text-white rounded-md py-3.5 font-body text-sm font-semibold hover:bg-primary-800 transition-colors"
              >
                <MessageCircle size={15} />
                Contactar
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
