import type { Metadata } from 'next'
import { Cinzel, Josefin_Sans } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/providers/QueryProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { fetchAgency } from '@/lib/api'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-josefin',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Inmobiliaria del Norte — Jujuy',
    template: '%s | Inmobiliaria del Norte',
  },
  description:
    'Encontrá tu próxima propiedad en Jujuy. Venta y alquiler de casas, departamentos y lotes en la Quebrada de Humahuaca y San Salvador de Jujuy.',
  keywords: ['inmobiliaria jujuy', 'propiedades jujuy', 'casas en venta jujuy', 'alquiler jujuy'],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Inmobiliaria del Norte',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const agencyData = await fetchAgency().catch(() => null)
  const agency = agencyData?.data ?? null

  return (
    <html lang="es" className={`${cinzel.variable} ${josefin.variable}`}>
      <body>
        <QueryProvider>
          <Navbar agency={agency} />
          <main>{children}</main>
          <Footer agency={agency} />
        </QueryProvider>
      </body>
    </html>
  )
}
