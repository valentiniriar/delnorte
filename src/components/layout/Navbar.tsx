'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import type { Agency } from '@/types'

interface NavbarProps {
  agency: Agency | null
}

export default function Navbar({ agency }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappUrl = agency?.settings?.website_whatsapp
    ? buildWhatsAppUrl(
        agency.settings.website_whatsapp,
        'Hola, me gustaría recibir más información sobre sus propiedades.',
      )
    : 'https://wa.me/5493881234567'

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-navy shadow-lg py-3'
          : 'bg-transparent py-5',
      ].join(' ')}
    >
      <div className="container-narrow flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-cinzel text-gold text-xl font-semibold tracking-widest uppercase">
            Del Norte
          </span>
          <span className="font-josefin text-white/60 text-xs tracking-[0.3em] uppercase">
            Inmobiliaria
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/', label: 'Inicio' },
            { href: '/propiedades', label: 'Propiedades' },
            { href: '/contacto', label: 'Contacto' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-josefin text-sm font-medium tracking-wider text-white/80 hover:text-gold transition-colors duration-200 uppercase"
            >
              {label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-josefin text-sm font-semibold px-5 py-2.5 transition-colors duration-200"
        >
          <Phone size={14} />
          Contactar
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 cursor-pointer"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-navy-900 border-t border-white/10">
          <nav className="container-narrow py-6 flex flex-col gap-4">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/propiedades', label: 'Propiedades' },
              { href: '/contacto', label: 'Contacto' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="font-josefin text-white/80 text-base uppercase tracking-widest hover:text-gold transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-gold text-navy font-josefin font-semibold text-sm px-5 py-3 text-center tracking-wider"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
