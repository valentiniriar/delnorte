import { fetchAgency } from '@/lib/api'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import ServicesSection from '@/components/home/ServicesSection'
import WhyUsSection from '@/components/home/WhyUsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection from '@/components/home/CtaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Inmobiliaria del Norte — Tu agencia de confianza en Jujuy. Venta y alquiler de propiedades en la Quebrada de Humahuaca y el Valle.',
}

export default async function HomePage() {
  const agencyData = await fetchAgency().catch(() => null)
  const agency = agencyData?.data ?? null

  return (
    <>
      <HeroSection agency={agency} />
      <FeaturedProperties />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
