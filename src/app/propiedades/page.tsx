import type { Metadata } from 'next'
import PropertiesClient from './PropertiesClient'

export const metadata: Metadata = {
  title: 'Propiedades',
  description:
    'Explora todas las propiedades disponibles en Jujuy. Filtra por tipo, precio y ubicacion. Mapa interactivo de la Quebrada y el Valle.',
}

export default function PropertiesPage() {
  return <PropertiesClient />
}
