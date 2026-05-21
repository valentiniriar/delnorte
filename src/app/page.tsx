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
    'Del Norte Estudio Inmobiliario — Propiedades en venta y alquiler en Jujuy y la Quebrada de Humahuaca.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
