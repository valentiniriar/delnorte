import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/providers/QueryProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-headline',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Del Norte Estudio Inmobiliario — Jujuy',
    template: '%s | Del Norte Estudio Inmobiliario',
  },
  description:
    'Encontrá tu próxima propiedad en Jujuy. Venta y alquiler de casas, departamentos y lotes en la Quebrada de Humahuaca y San Salvador de Jujuy.',
  keywords: ['inmobiliaria jujuy', 'propiedades jujuy', 'casas en venta jujuy', 'alquiler jujuy', 'del norte estudio'],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Del Norte Estudio Inmobiliario',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
